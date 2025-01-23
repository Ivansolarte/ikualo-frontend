/* eslint-disable react/prop-types */
import log from "../assets/icon/logEmpresa.png";
export const Header = ({login}) => {
  const close = () => {
    localStorage.removeItem('login')
    login(state=>!state)
  };

  return (
    <>
      <header className="bg-slate-100">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a  className="-m-1.5 p-1.5">
              <img
                className="h-8 w-auto"
                src={log}
                alt=""
              />
            </a>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <p
              onClick={close}
              className="text-sm/6 text-lg font-semibold text-gray-900 cursor-pointer text-blue-700"
            >
              Cerrar session<span aria-hidden="true">&rarr;</span>
            </p>
          </div>
        </nav>
      </header>
    </>
  );
};
