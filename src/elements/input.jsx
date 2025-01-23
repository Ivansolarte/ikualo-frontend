import React from "react";

export const Input = ({ value, onchange, name, type = "text", placeholder, clas}) => {
  return (
    <>
      <input
        className={`border px-2 py-2 rounded-lg border-slate-500 w-full my-1 ${clas}`}
        type={type}
        value={value}
        onChange={onchange}
        name={name}
        placeholder={placeholder}
      />
    </>
  );
};
