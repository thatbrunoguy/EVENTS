import React from "react";
import { SolidButton, TransparentButton } from "../buttons/button";

type Iprops = {
  nextHandler: () => void;
  backHandler: () => void;
};
const MainFooter = ({
  nextHandler = () => {},
  backHandler = () => {},
}: Iprops) => {
  return (
    <footer className="h-[70px] fixed bottom-0 left-0 bg-white shadow-lg right-0 px-2 pr-9 flex justify-center md:justify-end space-x-6 items-center border-t-[.8px] border-gray-300">
      <TransparentButton
        onClickHandler={backHandler}
        title="Back"
        styles={{
          borderColor: "#7431B8",
          color: "#7431B8",
          width: "160px",
          height: "41px",
        }}
      />
      <SolidButton
        onClickHandler={nextHandler}
        title="Next"
        styles={{ width: "160px", height: "41px" }}
      />
    </footer>
  );
};

export default MainFooter;
