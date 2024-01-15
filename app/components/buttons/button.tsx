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
      className="w-[202px] hover:bg-lightPurple transition-all duration-300 ease-in-out h-12 border rounded-lg border-lightText text-lightText bg-transparent flex items-center justify-center"
    >
      {title}
    </button>
  );
};

export const SolidButton = ({
  title = "Button",
  styles = {},
  onClickHandler = () => {},
}) => {
  return (
    <button
      onClick={onClickHandler}
      style={styles}
      className="w-[202px] h-12 text-white rounded-lg  bg-primaryPurple flex items-center justify-center"
    >
      {title}
    </button>
  );
};
