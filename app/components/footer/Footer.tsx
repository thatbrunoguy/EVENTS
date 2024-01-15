import React from "react";
import { SolidButton, TransparentButton } from "../buttons/button";

const Footer = () => {
  return (
    <footer className="h-[80px] bg-white shadow-md w-screen px-2 flex justify-end space-x-6 items-center border-t-[.8px] border-gray-300">
      <TransparentButton
        title="Cancel "
        styles={{
          borderColor: "#7431B8",
          color: "#7431B8",
          width: "160px",
          height: "41px",
        }}
      />
      <SolidButton title="Next" styles={{ width: "160px", height: "41px" }} />
    </footer>
  );
};

export default Footer;
