"use client";
import React, { useState } from "react";
import { GrDown } from "react-icons/gr";
import { Card, cards } from "./Events";
const options = [
  { title: "All" },
  { title: "Free" },
  { title: "Paid" },
  { title: "Virtual" },
  { title: "Popular" },
];

const VirtualEvents = () => {
  return (
    <div className="w-[94%] md:w-[90%] mx-auto pt-12 md:pt-[84px]">
      <div className="">
        <p className="font-semibold text-xl md:text-3xl">
          Virtual Events you may like
        </p>
      </div>
      <div className="mt-7">
        <div className=" grid-cols-1 grid md:grid-cols-2   lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cards.map((card, i) => (
            <Card key={i} event={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualEvents;
