/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "../../elements/button";
import { Input } from "../../elements/input";
import { loginService } from "../../services/login";
import log from "../../assets/icon/logEmpresa.png";

export const SignIn = ({ login, setState }) => {

  const auth = loginService();
  const [form, setForm] = useState({
    email: "ivansolarte69@gmail.com",
    pass: "123456",
  });
  const [alert, setAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    auth.post(form)
      .then(({ status, data,token }) => {
        if (!status) {
          return;
        }
        localStorage.setItem("login", JSON.stringify(data));
        localStorage.setItem("token", JSON.stringify(token));

        login(prevState => !prevState);
        setAlert(false);
      })
      .catch((err) => {
        console.log(err);
        setAlert(true);
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <img className="mx-auto h-10 w-auto" src={log} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Inicia session
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
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
              <div className="flex items-center justify-between">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Contraseña
                </label>
              </div>
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
              <Button
                type="error"
                onclick={(e) => handleLogin(e)}
                text={"Enviar"}
              />
            </div>
          </form>
          <div className="text-lx  mt-10 text-center">
            <p
              className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
              onClick={() => setState((state) => !state)}
            >
              ¿No tienes tu cuenta? Regístrate.
            </p>
          </div>
          {alert && (
            <div className="p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              <span className="font-medium">No se pudo iniciar session! </span> 
              Verifique si el Correo electronico o la Contraseña son correctas
            </div>
          )}
        </div>
      </div>
    </>
  );
};
