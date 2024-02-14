"use client";

import React, { useState } from "react";

const Tabs = () => {
  const [tabs, setTabs] = useState([
    {
      title: "All",
      isActive: true,
    },
    {
      title: "Free",
      isActive: false,
    },
    {
      title: "Paid",
      isActive: false,
    },
  ]);

  const switchTab = (tabTitle: string) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => ({
        ...tab,
        isActive: tab.title === tabTitle,
      }))
    );
  };

  return (
    <div className="flex mb-6 cursor-pointer w-[229px] space-x-2 h-12 py-1 px-1 bg-[#FBFAFC]">
      {tabs.map((tab, i) => (
        <div
          key={i}
          onClick={() => switchTab(tab.title)}
          className={`w-[75px] grid place-content-center text-sm ${
            tab.isActive ? "bg-white border-[.5px] rounded-md shadow-2xl" : ""
          }`}
        >
          <p>{tab.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
