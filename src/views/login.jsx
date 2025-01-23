import { useState } from "react";

import { SignIn } from "../components/login/signIn";
import { LogIn } from "../components/login/logIn";

export const Login = ({ login }) => {

 const [state, setState] = useState(false)
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        {!state? <SignIn login={login} setState={setState} /> : <LogIn setState={setState} />}
      </div>
    </>
  );
};
