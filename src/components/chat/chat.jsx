import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Input } from "../../elements/input";
import { UsersService } from "../../services/users.service";
import send from "../../assets/icon/send.png";

export const Chat = ({ setShowChat }) => {
    const containerRef = useRef(null);
  const usersService = UsersService();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [nick, setNick] = useState("");
  const [list, setList] = useState(false);
  const [userList, setUserList] = useState([]);
  const [receiverChat, setReceiverChat] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() && socket) {
      const message = {
        sender: nick,
        receiver: receiverChat, // Cambiar según el receptor, puedes tener un parámetro dinámico aquí
        content: newMessage,
      };
      // Enviar mensaje al servidor
      socket.emit("mensaje", message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: nick, text: newMessage },
      ]);
      setNewMessage(""); // Limpiar el input
    }
  };

  const getUsersArray = () => {
    const userName = JSON.parse(localStorage.getItem("login"));
    usersService.getUsers().then((resp) => {
      const newArray = resp.filter(
        (elem) => elem.nickName != userName.nickName
      );
      setUserList(newArray);
    });
    if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
  };

  const handleList = (payload) => {
    setReceiverChat(payload.nickName);
    setMessages([]); // Opcional: limpiar mensajes antes de cargar los nuevos
    if (socket) {
      socket.emit("historicoMensajes", {
        sender: nick,
        receiver: payload.nickName,
      });
    }
    setList((state) => !state);
  };

  useEffect(() => {

    const userName = JSON.parse(localStorage.getItem("login"));
    setNick(userName.nickName); // Obtén el nombre del usuario
    getUsersArray();

    // Configuración del socket
    const socket = io("http://localhost:3000", {
      transports: ["websocket"], // Asegura que las cookies/autenticación funcionen
    });

    setSocket(socket);
    socket.on("mensajeserver", (data) => {
      setMessages((prevMessages) => {
        const messagesToAdd = Array.isArray(data)
          ? data.map((message) => ({
              sender: message.sender,
              text: message.content,
            }))
          : [
              {
                sender: data.sender,
                text: data.content,
              },
            ];
        return [...prevMessages, ...messagesToAdd];
      });
    });

    return () => {
      socket.disconnect();
      console.log("Chat destruido");
    };
  }, []);

  return (
    <>
      {!list ? (
        <div className="border w-full bg-slate-200 rounded-lg">
          <div className="h-[280px] w-[230px] border-red-400 p-2">
            <div className="flex justify-end items-center mb-1">
              <p className="text-lg font-semibold mr-5">Chat</p>
              <div className="text-center mt-1 mr-1 cursor-pointer">
                <p
                  className="border border-slate-500 bottom-1 w-8 rounded-3xl"
                  onClick={() => setShowChat(false)}
                >
                  X
                </p>
              </div>
            </div>
            <div className=" border w-full h-[230px] bg-slate-50 px-2 flex justify-end items-end">
              <ul className="text-end">
                {userList.map((item, index) => (
                  <li
                    key={index}
                    className="font-bold uppercase cursor-pointer hover:text-blue-200 ttransform transition"
                    onClick={() => handleList(item)}
                  >
                    {item.nickName}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full bg-slate-100 border rounded-xl">
          <div className="border border-slate-400 rounded-lg h-[280px] w-[230px] grid grid-cols-1 place-content-between px-1">
            <div className="justify-self-end">
              <div className="text-center mt-1 mr-1 cursor-pointer">
                <p
                  className="border border-slate-500 bottom-1 w-8 rounded-3xl "
                  onClick={() => setList((state) => !state)}
                >
                  X
                </p>
              </div>
            </div>
            <div className="flex items-center ">
              Chatando con{" "}
              <p className="ml-2 text-lg font-semibold">{receiverChat}</p>
            </div>
            <div
              className="rounded-xl border bg-slate-300"
              id="chat"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div
                ref={containerRef}
                className="grid justify-items-stretch h-36 overflow-auto scroll-smooth  "
                style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`justify-self-${
                      msg.sender === nick ? "end" : "start"
                    } px-2 `}
                  >
                    <p className="font-semibold">{msg.sender}</p>
                    <small className="text-xs">{msg.text}</small>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center pb-1">
              <div className="pr-3">
                <Input
                  value={newMessage}
                  onchange={(e) => setNewMessage(e.target.value)}
                />
              </div>
              <div className="w-16  ">
                <div className="border bg-green-400  h-11 w-16 flex justify-center rounded-lg cursor-pointer hover:bg-green-200">
                    <img src={send} alt="" className="text-white h-10 w-10" onClick={handleSendMessage}  />

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
