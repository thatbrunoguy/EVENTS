"use client";

import React, { useState } from "react";
import { GoInfo } from "react-icons/go";
import { FaMoneyBills } from "react-icons/fa6";
import Image from "next/image";
import { HiOutlinePlusSm } from "react-icons/hi";
import Link from "next/link";
import { IoIosMore } from "react-icons/io";

const emailCampaign = [
  {
    title: "Revenue",
    value: "₦0",
    icon: <FaMoneyBills color="#D90BD9" />,
    background: "#FCEDFC",
  },
  {
    title: "Ticket Sales",
    value: "4",
    icon: <FaMoneyBills color="#106BD5" />,
    background: "#EDF4FC",
  },
  {
    title: "Delivered",
    value: "60",
    icon: <FaMoneyBills color="#CB1C6F" />,
    background: "#FCEDF6",
  },
  {
    title: "Opens",
    value: "65%",
    icon: <FaMoneyBills color="#FF5602" />,
    background: "#FCEFE8",
  },
  {
    title: "Clicks",
    value: "10%",
    icon: <FaMoneyBills color="#199FFF" />,
    background: "#F0F7FC",
  },
  {
    title: "Unsubscribed",
    value: "0%",
    icon: <FaMoneyBills color="#B61C9D" />,
    background: "#FCF0FA",
  },
  {
    title: "Bounced",
    value: "1.7%",
    icon: <FaMoneyBills color="#7431B8" />,
    background: "#F5EDFC",
  },
];

const EmailCampaign = () => {
  const [options, setOptions] = useState<any>([
    {
      title: " Eko convections centre",
      opened: "14/20",
      clicked: "10%",
      status: "sent",
    },
    {
      title: " Eko convections centre",
      opened: "14/20",
      clicked: "10%",
      status: "sent",
    },
    {
      title: " Eko convections centre",
      opened: "14/20",
      clicked: "10%",
      status: "sent",
    },
    {
      title: " Eko convections centre",
      opened: "14/20",
      clicked: "10%",
      status: "sent",
    },
    {
      title: " Eko convections centre",
      opened: "14/20",
      clicked: "10%",
      status: "sent",
    },
    {
      title: " Eko convections centre",
      opened: "14/20",
      clicked: "10%",
      status: "sent",
    },
    {
      title: " Eko convections centre",
      opened: "14/20",
      clicked: "10%",
      status: "sent",
    },
    {
      title: " Eko convections centre",
      opened: "14/20",
      clicked: "10%",
      status: "sent",
    },
  ]);

  return (
    <div className="w-[90%] mx-auto mt-14">
      <header className="flex items-center justify-between">
        {emailCampaign.map((item, i) => (
          <div
            key={i}
            className="w-[122px] relative p-4 h-[140px] bg-white shadow-lg rounded-e-md  border-[.4px] border-gray-300"
          >
            <div className="absolute cursor-pointer top-4 right-4 text-sm">
              <GoInfo />
            </div>
            <div
              style={{ backgroundColor: item.background }}
              className="h-11 w-11 text-xl rounded-full grid place-content-center"
            >
              {item.icon}
            </div>

            <p className="font-semibold text-2xl my-2">{item.value}</p>
            <p className="text-sm text-lightText">{item.title}</p>
          </div>
        ))}
      </header>

      {/* TABLE */}

      <div className="w-full mt-10">
        <div className="flex items-center justify-end w-full ">
          {/* <h2 className="font-semibold text-2xl">Events</h2> */}

          <Link
            href="/campaigns/create/email"
            className="bg-purple-700 mb-10 ml-auto py-[10px] px-5 w-auto h-[41px] text-white text-sm rounded-lg flex items-center space-x-[4px]"
          >
            <div>
              <HiOutlinePlusSm />
            </div>
            <p>New Campaign</p>
          </Link>
        </div>
        <div className="">
          <header className="w-full text-sm flex items-center py-3 px-4 bg-[#FBFAFC]">
            <p className="w-[500px]">Campaigns</p>
            <p className="w-[400px]">Opened</p>
            <p className="w-[400px]">Clicked</p>
            <p className="w-[400px]">Status</p>
          </header>
          {options.map((item: any, index: number) => (
            <div
              key={index}
              className="flex w-full border-b items-center justify-between"
            >
              <div className="flex items-center space-x-5 p-3 ">
                <div className="h-[48px] w-[48px] relative rounded overflow-hidden">
                  <Image
                    fill
                    src="/assets/event.jpeg"
                    alt={item.title}
                    className="object-cover"
                  />
                </div>
                <div className="w-[30%] text-sm">
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                </div>
                <div className="w-[360px]">{item.opened}</div>
                <div className="w-[310px]">{item.clicked}</div>
                <div className={`w-[310px] flex items-center`}>
                  <div
                    className={`px-[10px] rounded-[30px] w-auto ${
                      item.status === "sent"
                        ? "text-[#228056] bg-[#EDFCF6]"
                        : "text-red-500 bg-red-200"
                    }`}
                  >
                    {item.status}
                  </div>
                </div>
                <div className="text-2xl text-gray-500 cursor-pointer">
                  <IoIosMore />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailCampaign;
