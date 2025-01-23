import { useState, useEffect } from "react";
import { Home } from "./views/home";
import { Login } from "./views/login";

function App() {
  const [stateLogin, setStateLogin] = useState(false);
  const [state, setState] = useState(false);

  useEffect(() => { 
    if (localStorage.getItem("login")) {
      setState(true);
    } else {
      setState(false);
    }
    return () => {};
  }, [stateLogin]);

  return (
    <>
      {!state ? (
        <Login login={setStateLogin} />
      ) : (
        <Home login={setStateLogin} />
      )}
    </>
  );
}

export default App;
