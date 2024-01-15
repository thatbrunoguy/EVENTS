"use client";

import React, { useState } from "react";

const tablist_ = [
  {
    title: "Dashboard",
    isActive: false,
  },
  {
    title: "Email Campaign",
    isActive: false,
  },
  {
    title: "Ads Campaign",
    isActive: true,
  },
];

const TabsComponent = () => {
  const [tablist, setTablist] = useState([...tablist_]);

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
      <div className="flex items-center space-x-4 border-b">
        {tablist.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`${
              item.isActive
                ? "border-b-[2px] border-primaryPurple  text-primaryPurple"
                : "border-none text-lightText"
            } cursor-pointer px-4 py-4 transition-all duration-300 ease-in-out `}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabsComponent;
