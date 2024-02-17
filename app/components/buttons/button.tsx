"use client";

import React from "react";

export const TransparentButton = ({
  title = "Button",
  styles = {},
  onClickHandler = () => {},
}) => {
  return (
    <button
      onClick={onClickHandler}
      style={styles}
      className=" w-full hover:bg-lightPurple transition-all duration-300 ease-in-out h-12 border rounded-lg border-lightText text-lightText bg-transparent flex items-center justify-center"
    >
      {title}
    </button>
  );
};

export const SolidButton = ({
  title = "Button",
  styles = {},
  isComplete = true,
  onClickHandler = () => {},
}) => {
  return (
    <button
      onClick={onClickHandler}
      style={styles}
      disabled={!isComplete}
      className={` ${
        isComplete
          ? "bg-primaryPurple"
          : "bg-primaryPurple bg-opacity-20 cursor-wait"
      } w-full h-12 text-white rounded-lg hover:bg-opacity-70 transition-all duration-300 ease-in-out  flex items-center justify-center`}
    >
      {title}
    </button>
  );
};
