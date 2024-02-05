"use client";

import React, { useState } from "react";

const TabsComponent = ({ tablist, setTablist }) => {
  const handleClick = (index) => {
    setTablist((prevTablist) => {
      const updatedTablist = prevTablist.map((item, idx) => {
        if (idx === index) {
          return { ...item, isActive: true };
        } else {
          return { ...item, isActive: false };
        }
      });
      return updatedTablist;
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between md:justify-start md:space-x-4 px-4 md:px-8 border-b">
        {tablist.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`${
              item.isActive
                ? "border-b-[2px] border-primaryPurple  text-primaryPurple"
                : "border-none text-lightText"
            } cursor-pointer md:px-4 py-4 transition-all duration-300 ease-in-out text-sm md:text-base`}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export const TabsComponent2 = ({ tablist, setTablist }) => {
  const handleClick = (index) => {
    setTablist((prevTablist) => {
      const updatedTablist = prevTablist.map((item, idx) => {
        if (idx === index) {
          return { ...item, isActive: true };
        } else {
          return { ...item, isActive: false };
        }
      });
      return updatedTablist;
    });
  };

  return (
    <div>
      <div className="flex items-center text-center border-b">
        {tablist.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`${
              item.isActive
                ? "border-b-[2px] border-primaryPurple  text-primaryPurple"
                : "border-none text-lightText"
            } cursor-pointer md:px-4 py-4 transition-all basis-1/2 duration-300 ease-in-out text-xs md:text-base `}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabsComponent;
