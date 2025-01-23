import { useState } from "react";
import { loginService } from "../../services/login";
import { Input } from "../../elements/input";
import { Button } from "../../elements/button";
import log from "../../assets/icon/logEmpresa.png";

export const LogIn = ({ setState }) => {
  const loginSer = loginService();

  const [form, setForm] = useState({
    fullName: "",
    nickName: "",
    email: "",
    pass: "",
    imgUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prevForm) => ({
          ...prevForm,
          imgUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loginSer.postUser(form).then((status) => {
      if (!status) {
        return;
      }
      localStorage.setItem("login", JSON.stringify(status));
      setState((prevState) => !prevState);
    });
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <img className="mx-auto h-10 w-auto" src={log} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Regístrate
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Nombre completo
              </label>
              <div className="mt-2">
                <Input
                  name="fullName"
                  value={form.fullName}
                  onchange={(e) => handleChange(e)}
                  placeholder={"Nombre completo.."}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Usuario/Apodo
              </label>
              <div className="mt-2">
                <Input
                  name="nickName"
                  value={form.nickName}
                  onchange={(e) => handleChange(e)}
                  placeholder={"Nombre de usuario"}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Correo electronico
              </label>
              <div className="mt-2">
                <Input
                  name="email"
                  value={form.email}
                  onchange={(e) => handleChange(e)}
                  placeholder={"prueaba"}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Contraseña
              </label>
              <div className="mt-2">
                <Input
                  name="pass"
                  value={form.pass}
                  onchange={(e) => handleChange(e)}
                  placeholder={"prueaba"}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Sube una foto
              </label>
              <div className="mt-2 flex justify-between border">
                <input
                  className="w-[78%]"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {form.imgUrl && (
                  <img
                    src={form.imgUrl}
                    alt="Preview"
                    className="w-28 h-24 w-[20%] border"
                  />
                )}
              </div>
            </div>
            <div>
              <Button
                type="success"
                onclick={(e) => handleLogin(e)}
                text={"Enviar"}
              />
            </div>
          </form>
          <div className="text-lg  mt-10 text-center">
            <p
              className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer "
              onClick={() => setState((state) => !state)}
            >
              Inicia session..
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
