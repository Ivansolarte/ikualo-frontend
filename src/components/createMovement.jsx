import { useState } from "react";
import { Modal } from "../elements/modal";
import { Button } from "../elements/button";
import { Input } from "../elements/input";
import { MovementsService } from "../services/movements.service";
import { ModalLoad } from "./modals/modalLoad";

export const CreateMovement = ({ setAddModal, load }) => {

  const movementsService = MovementsService();
  const resp = JSON.parse(localStorage.getItem("login"));

  const [form, setForm] = useState({
    registrationDate: new Date().toLocaleString(),
    typeMovement: "1",
    movementValue: "",
    movementDescription: "",
    userId: resp._id,
  });
  const [showload, setShowload] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleChangeNum = (e) => {
    const { name, value } = e.target;

    // Permitir solo números y limitar a 10 caracteres
    if (/^\d*$/.test(value) && value.length <= 10) {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const onsubmit = () => {
      if (form.movementValue!=""&&form.movementDescription!="") {
        setShowload(true)
        movementsService.postMovement(form).then((resp) => {
          load();
          setAddModal(false);
          setShowload(false);
        });        
    }
  };

  return (
    <>
      <Modal>
        <div className="h-[550px]">
          <div className="p-12 flex h-full flex-col text-center">
            <div className="h-[10%] flex justify-end">
              <p
                className=" border border-black w-7 text-center font-medium cursor-pointer  border-[2px] rounded-full"
                onClick={() => setAddModal(false)}
              >
                X
              </p>
            </div>
            <div className="h-[35%] font-bold text-2xl mt-2">
              Añadir Movimiento
            </div>
            <div className="flex justify-center mb-7">
              <div
                onClick={() =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    ["typeMovement"]: "1",
                  }))
                }
                className={`border text-white w-[30%] h-10 flex items-center justify-center 
                    ${
                      form.typeMovement === "1" ? "bg-blue-800" : "bg-blue-200"
                    } 
                    hover:bg-blue-400 cursor-pointer rounded-l-xl`}
              >
                <p>Ingreso</p>
              </div>
              <div
                onClick={() =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    ["typeMovement"]: "2",
                  }))
                }
                className={`border text-white w-[30%] h-10 flex items-center justify-center 
                    ${form.typeMovement === "2" ? "bg-red-800" : "bg-red-200"} 
                    hover:bg-red-400 cursor-pointer rounded-r-xl`}
              >
                <p>Egreso</p>
              </div>
            </div>
            <div className="h-[35%] font-bold text-xl mt-2">
              <Input
                placeholder={"Valor del Movimiento"}
                value={form.movementValue}
                onchange={handleChangeNum}
                name={"movementValue"}
              />
            </div>
            <div className="h-[35%] font-bold  mt-2 ">
              <textarea
                placeholder="Descripción"
                value={form.movementDescription}
                className="border h-full w-full rounded-lg border-2 border-slate-500 px-2"
                onChange={handleChange}
                name="movementDescription"
              />
            </div>
            <div className="h-[20%] mt-10">
              <Button type="success" text={"Crear"} onclick={onsubmit} />
            </div>
          </div>
        </div>
        {showload&&<ModalLoad/>}
      </Modal>
    </>
  );
};
