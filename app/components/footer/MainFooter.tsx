import React from "react";
import { SolidButton, TransparentButton } from "../buttons/button";

type Iprops = {
  nextHandler: () => void;
  backHandler: () => void;
  isComplete?: boolean;
  title?: string;
};
const MainFooter = ({
  nextHandler = () => {},
  backHandler = () => {},
  isComplete = true,
  title = "Next",
}: Iprops) => {
  return (
    <footer className="h-[70px] fixed bottom-0 left-0 bg-white shadow-lg right-0 px-2 md:pr-9 flex justify-center md:justify-end space-x-6 items-center border-t-[.8px] border-gray-300">
      <div className="w-1/2 md:w-[160px]">
        <TransparentButton
          onClickHandler={backHandler}
          title="Back"
          styles={{
            borderColor: "#7431B8",
            color: "#7431B8",
            // width: "160px",
            height: "41px",
          }}
        />
      </div>

      <div className="w-1/2 md:w-[160px]">
        <SolidButton
          isComplete={isComplete}
          onClickHandler={nextHandler}
          title={title}
          styles={{ height: "41px" }}
        />
      </div>
    </footer>
  );
};

export default MainFooter;
