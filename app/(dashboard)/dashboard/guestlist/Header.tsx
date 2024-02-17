"use client";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import React from "react";
import { Carousel, ScrollingCarousel } from "@trendyol-js/react-carousel";

type ListItem = {
  title: string;
  total: number;
};

const Left = () => {
  return (
    <div className="w-8 h-8 absolute top-[50%] -translate-y-[50%] left-2 rounded-full grid place-content-center text-2xl hover:cursor-pointer hover:bg-opacity-50 text-[#FF8548] bg-[#FCEFE8]">
      <MdOutlineKeyboardArrowLeft />
    </div>
  );
};
const Right = () => {
  return (
    <div className="w-8 h-8 rounded-full absolute right-2 top-[50%] -translate-y-[50%] grid place-content-center text-2xl hover:cursor-pointer hover:bg-opacity-50 text-[#FF8548] bg-[#FCEFE8]">
      <MdOutlineKeyboardArrowRight />
    </div>
  );
};

const DashHeader = ({ stat }: any) => {
  const list: ListItem[] = [
    { title: "Diamond pass", total: 300 },
    { title: "Diamond pass", total: 300 },
    { title: "Diamond pass", total: 300 },
    { title: "Diamond pass", total: 300 },
    { title: "Diamond pass", total: 300 },
    { title: "Diamond pass", total: 300 },
    { title: "Diamond pass", total: 300 },
    { title: "Diamond pass", total: 300 },
    { title: "Diamond pass", total: 300 },
    { title: "Diamond pass", total: 300 },
    { title: "Diamond pass", total: 300 },
    { title: "Diamond pass", total: 300 },
  ];
  return (
    <ScrollingCarousel
      rightIcon={<Left />}
      leftIcon={<Right />}
      className="w-full max-h-[120px] overflow-y-clip border-t-[3px]  gap-16 border-[#FF8548] p-4 py-8 shadow-lg rounded bg-white"
    >
      {stat?.map((item: any, i: number) => (
        <div key={i} className="mx-10">
          <h1 className="font-semibold text-4xl text-center">{item.count}</h1>
          <p className="text-lightText">{item.ticketName}</p>
        </div>
      ))}
    </ScrollingCarousel>
  );
};

export default DashHeader;
