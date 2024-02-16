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
import GlobalTable from "@/app/components/table/GlobalTable";

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
  const [selectedEvent, setSelectedEvent] = useState({
    name: "",
    ticketId: "",
  });
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

  const salesColumns = [
    { key: "name", name: "Ticket name" },
    { key: "quantity", name: "Total Tickets sold" },
    { key: "revenue", name: "Total Sales revenue" },
    { key: "fees", name: "Fees" },
    { key: "net", name: "Net sales revenue" },
  ];

  const salesRows = tickets.map((ticket: any, index: number) => ({
    id: index,
    ...ticket,
  }));

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
        <Header
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
        <h3 className="font-semibold text-2xl ml-4 sm:ml-6 xl:ml-12 mt-6">
          Dashboard
        </h3>
        <div className="flex flex-col xl:flex-row justify-between w-[92%] mx-auto">
          <div className="w-full md:w-[60%]">
            <h3 className="text-lg mt-8 mb-5 font-medium">Overview</h3>

            <div className="flex w-full overflow-x-scroll pb-4  md:overflow-x-hidden scrollbar-hide items-center space-x-2 justify-between">
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

                  <p className="font-medium md:font-semibold text-2xl my-2">
                    {item.value}
                  </p>
                  <p className="text-sm text-lightText">{item.title}</p>
                </div>
              ))}
            </div>

            <div className=" my-5 md:my-7 flex flex-col md:flex-row items-center gap-4">
              <div className=" w-full md:basis-1/2 ">
                <p className="text-lg font-medium">Payouts</p>

                <div className="flex items-center mt-3 md:mt-5">
                  <div className=" bg-white h-[122px] w-full border-[.6px] shadow-lg p-4 rounded-md">
                    <div className="flex space-x-4">
                      <div className="basis-1/2 border-r border-dashed">
                        <h3 className="font-medium md:font-semibold text-2xl mb-2">
                          ₦0.00
                        </h3>
                        <p className="text-sm text-lightText">Paid</p>
                      </div>

                      <div>
                        <h3 className="font-medium md:font-semibold text-2xl mb-2">
                          ₦0.00
                        </h3>
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

              <div className="w-full lg:basis-1/2">
                <p className="text-lg font-medium">Share</p>

                <div className="mt-3 md:mt-5 rounded-md bg-white h-[122px] shadow-lg p-4 border-[.6px]">
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
          <div className="w-full  xl:w-[30%]">
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
        <div className="flex items-center justify-between mt-4 md:mt-10 mb-8  w-[92%] mx-auto">
          <h2 className="font-medium md:font-semibold text-xl md:text-2xl">
            Sales
          </h2>

          <Link href="/dashboard/sales">
            <p className="text-primaryPurple text-xs md:text-sm">View all</p>
          </Link>
        </div>

        <div className="w-[95%] mx-auto">
          <div className="mb-6">
            <GlobalTable columns={salesColumns} rows={salesRows} />
          </div>
        </div>
      </main>
    </section>
  );
}
