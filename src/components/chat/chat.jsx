import { useState, useEffect } from "react";
import icoChat from "../../assets/icon/chat.png";
import { Button } from "../../elements/button";
import { io } from "socket.io-client";
import { Input } from "../../elements/input";

export const Chat = () => {
  const [stateChat, setStateChat] = useState(false); 
  const [newMessage, setNewMessage] = useState("");

//   const socket = io("http://localhost:3000/chatWS");



  useEffect(() => {
    // socket.on("men", (message) => {
    //   console.log(message);
      
    // });
    return () => {
    //   socket.off("message");
    };
  }, []);

  return (
    <>
      {!stateChat ? (
        <div className=" w-16 ">
          <img onClick={() => setStateChat(true)} src={icoChat} alt="" />
        </div>
      ) : (
        <div className=" w-full bg-slate-100 border rounded-xl ">
          <div className="border border-slate-400 rounded-lg h-[280px] w-[230px] grid grid-cols-1 place-content-between px-1 ">
            <div className=" justify-self-end  ">
              <div className=" text-center mt-1 mr-1 cursor-pointer">
                <p
                  className="border border-slate-500 bottom-1 w-8 rounded-3xl "
                  onClick={() => setStateChat(false)}
                >
                  X
                </p>
              </div>
            </div>
            {/* <hr className="p-0 m-0"/> */}
            <div>chatando con IVan</div>
            <div
              className=" rounded-xl overflow-auto border  bg-slate-300 "
              id="chat"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div className=" h-36 grid justify-items-stretch ">
                <div className="justify-self-start ">
                  <p className="font-semibold">tu</p>
                  <small className="text-xs">hola</small>
                </div>
                <div className="justify-self-end">
                  <p className="font-semibold">cliente</p>
                  <small className=" text-xs">hola</small>
                </div>
                <div className="justify-self-start ">
                  <p className="font-semibold">tu</p>
                  <small className="text-xs">hola2</small>
                </div>
                <div className="justify-self-start ">
                  <p className="font-semibold">tu</p>
                  <small className="text-xs">hola2</small>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center pb-1">
              <div className="px-3">
                <Input 
                value={newMessage}
                onchange={(e) => setNewMessage(e.target.value)}
                />
              </div>
              <div className="w-16  w-full ">
                <Button text={"enviar"} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
