import React, { useContext } from "react";
import { UserContext } from "../../App";

const MyProfile = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="container mx-auto">
        <div className=" bg-slate-300 rounded p-4 text-center py-[12] mx-auto md:w-[45%] lg:w-[33%]">
          <h1 className="text-2xl">Name: {user?.name}</h1>
          <h3 className="text-2xl">Email: {user?.email}</h3>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
