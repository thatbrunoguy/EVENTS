"use client";

import Image from "next/image";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import { HiOutlinePlusSm } from "react-icons/hi";
import Link from "next/link";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { GoInfo } from "react-icons/go";
import { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMoneyBills,
  FaXTwitter,
} from "react-icons/fa6";
import { PiShareLight } from "react-icons/pi";
import MobileFooter from "../../components/footer/MobileFooter";
import { useQuery } from "@tanstack/react-query";
import { authFunctions } from "../../utils/endpoints";
import { addToLocalStorage } from "../../utils/localstorage";
import { EVENTSPARROT_USER } from "../../constants";

const emailCampaign = [
  {
    title: "Net Sales",
    value: "₦0.00",
    icon: <FaMoneyBills color="#D90BD9" />,
    background: "#FCEDFC",
  },
  {
    title: "Ticket sold",
    value: "0/30",
    icon: <FaMoneyBills color="#106BD5" />,
    background: "#EDF4FC",
  },

  {
    title: "Page views",
    value: "16",
    icon: <FaMoneyBills color="#FF5602" />,
    background: "#FCEFE8",
  },
];

export default function Dashboard() {
  const [tickets, setTickets] = useState<any>([
    {
      name: " Diamond Pass",
      quantity: 127,
      revenue: "₦77,500.00",
      fees: "₦15,500.00",
      net: "₦70,000.00",
    },
    {
      name: " Diamond Pass",
      quantity: 127,
      revenue: "₦77,500.00",
      fees: "₦15,500.00",
      net: "₦70,000.00",
    },
    {
      name: " Diamond Pass",
      quantity: 127,
      revenue: "₦77,500.00",
      fees: "₦15,500.00",
      net: "₦70,000.00",
    },
    {
      name: " Diamond Pass",
      quantity: 127,
      revenue: "₦77,500.00",
      fees: "₦15,500.00",
      net: "₦70,000.00",
    },
    {
      name: " Diamond Pass",
      quantity: 127,
      revenue: "₦77,500.00",
      fees: "₦15,500.00",
      net: "₦70,000.00",
    },
    {
      name: " Diamond Pass",
      quantity: 127,
      revenue: "₦77,500.00",
      fees: "₦15,500.00",
      net: "₦70,000.00",
    },
    {
      name: " Diamond Pass",
      quantity: 127,
      revenue: "₦77,500.00",
      fees: "₦15,500.00",
      net: "₦70,000.00",
    },
    {
      name: " Diamond Pass",
      quantity: 127,
      revenue: "₦77,500.00",
      fees: "₦15,500.00",
      net: "₦70,000.00",
    },
    {
      name: " Diamond Pass",
      quantity: 127,
      revenue: "₦77,500.00",
      fees: "₦15,500.00",
      net: "₦70,000.00",
    },
    {
      name: " Diamond Pass",
      quantity: 127,
      revenue: "₦77,500.00",
      fees: "₦15,500.00",
      net: "₦70,000.00",
    },
    {
      name: " Diamond Pass",
      quantity: 127,
      revenue: "₦77,500.00",
      fees: "₦15,500.00",
      net: "₦70,000.00",
    },
    {
      name: " Diamond Pass",
      quantity: 127,
      revenue: "₦77,500.00",
      fees: "₦15,500.00",
      net: "₦70,000.00",
    },
  ]);

  const recommended = [
    "Send announcements to your registrants ",
    "Send announcements to your registrants ",
    "Send announcements to your registrants ",
    "Send announcements to your registrants ",
    "Send announcements to your registrants ",
    "Send announcements to your registrants ",
    "Send announcements to your registrants ",
  ];

  const {
    data: userAccount,
    isError,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["user-account"],
    queryFn: authFunctions.getUserAccount,
    staleTime: Infinity,
  });

  if (status === "success") {
    console.log("userAccount", userAccount[0]);
    addToLocalStorage(EVENTSPARROT_USER, "account", userAccount[0]);
  }

  return (
    <section className="flex ">
      <Sidebar />
      <MobileFooter />
      <main className="h-screen pb-24 md:pb-0 overflow-y-scroll flex-1">
        <Header />
        <h3 className="font-semibold text-2xl ml-12 mt-12">Dashboard</h3>
        <div className="flex justify-between w-[92%] mx-auto">
          <div className="w-full md:w-[60%]">
            <h3 className="text-lg mt-4 mb-5 font-medium">Overview</h3>

            <div className="flex items-center space-x-2 justify-between">
              {emailCampaign.map((item, i) => (
                <div
                  key={i}
                  className=" min-w-[140px] w-[221px] relative p-4 h-[140px] bg-white shadow-lg rounded-e-md  border-[.4px] border-gray-300"
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
            </div>

            <div className="my-8 flex items-center space-x-4">
              <div className="basis-1/2 ">
                <p className="text-lg font-medium">Payouts</p>

                <div className="flex items-center mt-5">
                  <div className=" bg-white h-[122px] w-full border-[.6px] shadow-lg p-4 rounded-md">
                    <div className="flex space-x-4">
                      <div className="basis-1/2 border-r border-dashed">
                        <h3 className="font-semibold text-2xl mb-2">₦0.00</h3>
                        <p className="text-sm text-lightText">Paid</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-2xl mb-2">₦0.00</h3>
                        <p className="text-sm text-lightText">Remaining</p>
                      </div>
                    </div>
                    <p className="text-primaryPurple text-sm py-3">
                      Add account
                    </p>
                  </div>
                </div>
              </div>

              {/* SHARE */}

              <div className="w-[95%] lg:basis-1/2">
                <p className="text-lg font-medium">Share</p>

                <div className="mt-5 rounded-md bg-white h-[122px] shadow-lg p-4 border-[.6px]">
                  <p className="text-xs text-lightText mb-1">Event Url</p>
                  <div className="">
                    <div className="w-[90%]  overflow-x-hidden">
                      <p className="text-sm">
                        Https://eventparrot6789loistmnr49okrfjorj4iejeioej3uhuh
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 ">
                    <p className="text-xs text-lightText mb-1">Share on</p>
                    <div className="flex items-center space-x-6 text-2xl text-gray-500">
                      <FaFacebook />
                      <FaXTwitter />
                      <FaLinkedin />
                      <FaInstagram />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-[30%] hidden xl:block">
            <h3 className="text-lg mt-4 mb-5 font-medium">Recommended</h3>

            <div>
              {recommended.map((item, i) => (
                <div key={i} className="flex space-x-3  mb-5 items-center">
                  <div className="text-3xl">
                    <div className="text-sm text-primaryPurple">
                      <HiOutlineSpeakerWave />
                    </div>
                  </div>
                  <p className="text-sm w-[80%]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-10 mb-8  w-[92%] mx-auto">
          <h2 className="font-semibold text-2xl">Sales</h2>

          <p className="text-primaryPurple text-sm">View all</p>
        </div>

        <div className="w-[95%] mx-auto">
          <header className="w-full bg-[#FBFAFC] text-sm grid grid-flow-col  py-3 px-4 ">
            <p className="col-span-1">Ticket name</p>
            <p className="">Total Tickets sold</p>
            <p className="">Total Sales revenue </p>
            <p className="">Fees</p>
            <p className="">Net sales revenue</p>
            {/* <p className="w-1/6"></p> */}
          </header>
          {tickets.map((item: any, index: number) => (
            <div
              key={index}
              className="w-full border-b grid grid-flow-col  p-3 py-4 text-sm"
            >
              <h4 className="font-semibold">{item.name}</h4>
              <p className="">{item.quantity}</p>
              <p className=" ml-16">{item.revenue}</p>
              <div className="">{item.fees}</div>
              <div className="">{item.net}</div>
            </div>
          ))}
        </div>
      </main>
    </section>
  );
}
