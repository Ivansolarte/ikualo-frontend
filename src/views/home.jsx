import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { Card } from "../components/card";
import { Button } from "../elements/button";
import { Table } from "../components/table";
import { MovementsService } from "../services/movements.service";
import { ModalAction } from "../components/modals/modalAction";
import { ModalLoad } from "../components/modals/modalLoad";
import { CreateMovement } from "../components/createMovement";
import icoChat from "../assets/icon/chat.png";
import { Chat } from "../components/chat/chat";

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
  const [showChat, setShowChat] = useState(false)

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
    movementsService
      .getMovementsById(resp._id)
      .then((resp) => {
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
      })
      .catch((err) => {
        // document.body.style.pointerEvents = "none";
        console.log(err);
        setModalLoad(false);
        setTimerActive(true);
        // alert("caduco el token ");
      });
  };

  useEffect(() => {
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
        const getToken = localStorage.getItem("token");
        const token = atob(JSON.parse(getToken));
        const jsonToken = JSON.parse(token); ///token en json
        const fecha = new Date();
        const numberOfMlSeconds = fecha.getTime();
        const addMlSeconds = 15 * 1000; // cambia el => 15 para cambiar el tiempo en segundos
        const newDate = new Date(numberOfMlSeconds + addMlSeconds);
        jsonToken.fecha = newDate;
        const jsonString = JSON.stringify(jsonToken);
        const encrypToken = JSON.stringify(btoa(jsonString));
        localStorage.removeItem("token");
        localStorage.setItem("token", encrypToken);
        /// que no hagan efectos los click de el mouse
        clearTimeout(timerId);
      }
      startTimer();
    };
    let timerId;
    const startTimer = () => {
      timerId = setTimeout(() => {
        // setTimerActive(true);
        localStorage.removeItem("token");
        localStorage.removeItem("login");
        setTimerActive(true);
        login((state) => !state);
      }, 1200 * 1000 + 1); // 60000 ms = 1 minuto
      // }, 900000); // 60000 ms = 1 minuto
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
      <div className="h-screen  relative w-full  flex flex-col">
        <div className="relative ">
          <Header login={login} />
        </div>

        <div className="relative  w-full flex-1 overflow-auto">
          <div className="h-full flex flex-col">
            {/* Contenido 1 (expandido) */}
            <div className="flex-grow p-10">
              <div
                className={`"bg-slate-50 h-full rounded-3xl border ${
                  timerActive ? "pointer-events-none" : ""
                }`}
              >
                {timerActive && (
                  <div className=" text-sm text-yellow-800 text-center rounded-lg rounded-t-3xl border-red-400 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300">
                    <span className="font-medium text-3xl animate-ping">
                      ¡Tu sesión ha caducado!
                    </span>{" "}
                    Por favor inicia sesión de nuevo.
                  </div>
                )}

                <div className="h-full">
                  <div className="h-[50%] flex justify-center flex-col">
                    <Card user={user} sum={suma} imgUrl={user.imgUrl} />
                  </div>
                  <div className="h-[8%] flex items-center justify-between text-nowrap">
                    <p className="ml-2 text-lg font-medium">Mis movimientos</p>
                    <div className="w-28 mr-6">
                      <Button
                        text={"Añadir"}
                        onclick={() => setAddModal(true)}
                      />
                    </div>
                  </div>
                  <div className="h-[42%] flex justify-center">
                    <Table title={titles} datos={arrayData} />
                  </div>
                </div>
              </div>
            </div>

            {/* Contenido 2 (en la parte inferior derecha) */}
            <div className="p-4 absolute bottom-0 right-0">
              {/* Contenido que puede cambiar de tamaño */}
              {!showChat ? (
                <div className=" w-16 ">
                  <img
                    onClick={() => setShowChat(!showChat)}
                    src={icoChat}
                    alt=""
                  />
                </div>
              ) : (
                <Chat setShowChat={setShowChat} />
              )}
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
