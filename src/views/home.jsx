import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { Card } from "../components/card";
import { Button } from "../elements/button";
import { Table } from "../components/table";
import { MovementsService } from "../services/movements.service";
import { ModalAction } from "../components/modals/modalAction";
import { ModalLoad } from "../components/modals/modalLoad";
import { CreateMovement } from "../components/createMovement";
import { decryptData } from "../utils/encrypted";

export const Home = ({ login }) => {
  const resp = JSON.parse(localStorage.getItem("login"));
  const movementsService = MovementsService();
  const titles = ["Fecha", "Tipo", "Valor", "Descripción"];

  const [arrayData, setArrayData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [user, setUser] = useState({ fullName: "" });
  const [modalLoad, setModalLoad] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [suma, setSuma] = useState("");
  const [clicked, setClicked] = useState(false); ///movimiento
  const [timerActive, setTimerActive] = useState(false);

  const deleteMovement = (payload) => {
    setShowModal(true);
    setDeleteId(payload._id);
  };

  const confirmDelete = () => {
    setModalLoad(true);
    movementsService.deleteMovement(deleteId).then(() => {
      setShowModal(false);
      setModalLoad(false);
      getMovements();
    });
  };

  const getMovements = () => {
    setModalLoad(true);
    movementsService.getMovementsById(resp._id).then((resp) => {
      const result = resp.reduce((total, item) => {
        const value = parseFloat(item.movementValue);
        if (item.typeMovement === "1") {
          return total + value;
        } else if (item.typeMovement === "2") {
          return total - value;
        }
        return total;
      }, 0);

      setSuma(result);

      const dataTable = resp.map((item, index) => [
        item.registrationDate,
        item.typeMovement == "1" ? "Ingreso" : "Egreso",
        item.movementValue,
        item.movementDescription,
        <div key={index}>
          <Button
            onclick={() => deleteMovement(item)}
            type="error"
            text={"Eliminar"}
          />
        </div>,
      ]);

      setArrayData(dataTable);
      setModalLoad(false);
    });
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const decryp = decryptData(token);
    // console.log(decryp.fecha);

    getMovements();
    if (resp) {
      setUser(resp);
    }
    return () => {};
  }, []);

  useEffect(() => {
    const handleClick = () => {
      setClicked(true);
      console.log("Mouse clicked!");
      if (timerId) {
        clearTimeout(timerId);
      }
      startTimer();
    };
    let timerId;
    const startTimer = () => {
      timerId = setTimeout(() => {
        setTimerActive(true);
        //  "Timer activated: No click detected for 1 minute."
        localStorage.removeItem("token");
        localStorage.removeItem("login");
        login((state) => !state);
      }, 900000); // 60000 ms = 1 minuto
    };
    window.addEventListener("click", handleClick);
    startTimer();
    return () => {
      window.removeEventListener("click", handleClick);
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, []); //

  return (
    <>
      <div className="h-screen  flex flex-col">
        <div className="w-full">
          <Header login={login} />
        </div>
        <div
          className={`flex-grow px-20 py-9 border border-purple-600 ${
            timerActive ? "pointer-events-none" : ""
          }`}
        >
          <div className="bg-slate-50 h-full rounded-3xl border border-red-400 ">
            <div className=" h-full ">
              <div className=" h-[50%]  flex justify-center flex-col">
                <Card user={user} sum={suma} imgUrl={user.imgUrl} />
              </div>
              <div className="h-[8%] flex items-center justify-between text-nowrap">
                <p className=" ml-2 text-lg font-medium">Mis movimientos</p>
                <div className="w-28 mr-6">
                  <Button text={"Añadir"} onclick={() => setAddModal(true)} />
                </div>
              </div>
              <div className="h-[42%]  flex justify-center">
                <Table title={titles} datos={arrayData} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <ModalAction
          setShowModal={setShowModal}
          confirmDelete={confirmDelete}
        />
      )}
      {modalLoad && <ModalLoad />}
      {addModal && (
        <CreateMovement setAddModal={setAddModal} load={getMovements} />
      )}
    </>
  );
};
