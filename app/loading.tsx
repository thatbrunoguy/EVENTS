"use client";
import { DotLoader } from "react-spinners";

import React from "react";

const loading = () => {
  return (
    <div className="h-screen w-screen bg-white  z-[99999999999]   flex items-center justify-center">
      <DotLoader size={160} color="#7431B8" />
    </div>
  );
};

export default loading;
