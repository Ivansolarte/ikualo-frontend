import React from "react";
import not_img from "../assets/img/not_img.jpg";

export const Card = ({user, sum, imgUrl}) => {
  return (
    <>
      <div className=" flex justify-center">
        <img
          src={imgUrl||not_img}
          alt=""
          className="rounded-full p-0 m-0 bg-slate-50 w-[340px] h-[300px]  "
        />
        <div className=" flex justify-center flex-col ml-2">
          <p className="text-xl font-bold uppercase">Capital actual</p>
          <p className="text-xl font-bold uppercase"> $ {sum}</p>
        </div>
      </div>
      <div className=" text-center text-2xl font-semibold uppercase">
        {user?.fullName}
      </div>
    </>
  );
};
