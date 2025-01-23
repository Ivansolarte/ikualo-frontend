import React from "react";
import { Modal } from "../../elements/modal";
import { Button } from "../../elements/button";

export const ModalAction = ({setShowModal,confirmDelete}) => {
  return (
    <>
      <Modal>
        <div className="h-96">
          <div className="p-12 flex h-full flex-col text-center">
            <div className="h-[10%] flex justify-end">
              <p 
              className=" border border-black w-7 text-center font-medium cursor-pointer  border-[2px] rounded-full"
              onClick={()=>setShowModal(false)}
              >X</p>
            </div>
            <div className="h-[35%] font-bold text-2xl mt-2">Eliminar movimiento</div>
            <div className="h-[35%] text-xl">Quieres eliminar el movimiento</div>
            <div className="h-[20%]">
              <Button type="error" text={"Eliminar"} onclick={confirmDelete} />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
