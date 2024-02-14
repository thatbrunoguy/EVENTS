"use client";

import React from "react";
import { DotLoader } from "react-spinners";
const PrimaryLoading = () => {
  return (
    <div className="fixed bg-black bg-opacity-50 z-[99999999999] backdrop-blur-sm left-0 right-0 top-0 bottom-0 flex items-center justify-center">
      <DotLoader size={160} color="#7431B8" />
    </div>
  );
};

export const PrimaryLoading2 = () => {
  return (
    <div className="absolute  z-[99999999999] left-0 right-0 top-0 bottom-0 flex items-center justify-center">
      <DotLoader size={140} color="#7431B8" />
    </div>
  );
};

export default PrimaryLoading;
