import React from "react";

export const Button = ({ text, onclick, type = "success" }) => {
  return (
    <>
        <button 
            className={`
                border
                rounded-lg py-2 
                px-1 w-full text-white
                hover:bg-blue-800 
                ${type=="success"?" bg-blue-500 hover:bg-blue-800":"border bg-red-500 hover:bg-red-800"}
                ${type=="success"?"":""}
                `}
            type='button'
            onClick={onclick}
        >
        {text}
        </button>
    </>
  );
};
