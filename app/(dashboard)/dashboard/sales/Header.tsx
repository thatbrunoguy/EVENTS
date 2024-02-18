"use client";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import React from "react";
import { Carousel, ScrollingCarousel } from "@trendyol-js/react-carousel";

type ListItem = {
  title: string;
  total: number | string;
};

const Left = () => {
  return (
    <div className="w-8 h-8 absolute top[50%] -translate-y-[50%] left-4 rounded-full grid place-content-center text-2xl hover:cursor-pointer hover:bg-opacity-50 text-[#FF8548] bg-[#FCEFE8]">
      <MdOutlineKeyboardArrowLeft />
    </div>
  );
};
const Right = () => {
  return (
    <div className="w-8 h-8 rounded-full absolute right-4 top[50%] -translate-y-[50%] grid place-content-center text-2xl hover:cursor-pointer hover:bg-opacity-50 text-[#FF8548] bg-[#FCEFE8]">
      <MdOutlineKeyboardArrowRight />
    </div>
  );
};

const DashHeader = ({ data }: any) => {
  const list: ListItem[] = [
    { title: "Tickets sold", total: 704 },
    { title: "Sales revenue", total: "₦1,377,900.00" },
    { title: "Available for Payout", total: " ₦300,500.00" },
  ];
  return (
    <div
      //   rightIcon={<Left />}
      //   leftIcon={<Right />}
      className="w-full h-auto  md:min-h-[120px] overflow-y-clip border-t-[3px] flex flex-wrap items-center justify-center gap-10 md:gap-16 border-[#4C9FFF] p-4 py-6 shadow-lg rounded bg-white"
    >
      {list.map((item: ListItem, i) => (
        <React.Fragment key={i}>
          <div className="md:mx-10">
            <h1 className="font-semibold text-2xl md:text-4xl text-center">
              {i === 0
                ? data?.totalTicket || 0
                : i === 1
                ? `₦${data?.totalRevenue || 0}`
                : `₦${data?.totalRevenue || 0}`}
            </h1>
            <p className="text-lightText text-center">{item.title}</p>
          </div>
          {i === 2 && (
            <button className="py-[10px] hover:bg-opacity-50 px-3 md:px-5 rounded-md text-sm text-white h-10 bg-primaryPurple grid place-content-center">
              Payout Now
            </button>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default DashHeader;
