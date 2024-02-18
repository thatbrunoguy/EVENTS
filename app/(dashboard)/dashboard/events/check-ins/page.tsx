"use client";

import Header from "@/app/components/header/Header";
import Sidebar from "@/app/components/sidebar/Sidebar";
import React, { useState } from "react";
import Tabs from "./Tabs";
import Image from "next/image";
import { HiOutlinePlusSm } from "react-icons/hi";
import CheckInModal from "./CheckInModal";
import MobileFooter from "@/app/components/footer/MobileFooter";
import { useMutation } from "@tanstack/react-query";
import { eventsManagamentFunctions } from "@/app/utils/endpoints";

const CheckIns = () => {
  const [options, setOptions] = useState<any>([
    {
      team: "Timilehin Adegbulugbe",
      status: "Free Ticket",
    },
    {
      team: "Timilehin Adegbulugbe",
      status: "Free Ticket",
    },
    {
      team: "Timilehin Adegbulugbe",
      status: "Paid Ticket",
    },
    {
      team: "Timilehin Adegbulugbe",
      status: "Free Ticket",
    },
    {
      team: "Timilehin Adegbulugbe",
      status: "Free Ticket",
    },
    {
      team: "Timilehin Adegbulugbe",
      status: "Paid Ticket",
    },
    {
      team: "Timilehin Adegbulugbe",
      status: "Free Ticket",
    },
    {
      team: "Timilehin Adegbulugbe",
      status: "Paid Ticket",
    },
    {
      team: "Timilehin Adegbulugbe",
      status: "Free Ticket",
    },
    {
      team: "Timilehin Adegbulugbe",
      status: "Paid Ticket",
    },
    {
      team: "Timilehin Adegbulugbe",
      status: "Free Ticket",
    },
    {
      team: "Timilehin Adegbulugbe",
      status: "Paid Ticket",
    },
    {
      team: "Timilehin Adegbulugbe",
      status: "Free Ticket",
    },
    {
      team: "Timilehin Adegbulugbe",
      status: "Paid Ticket",
    },
    {
      team: "Timilehin Adegbulugbe",
      status: "Free Ticket",
    },
    {
      team: "Timilehin Adegbulugbe",
      status: "Paid Ticket",
    },
    {
      team: "Timilehin Adegbulugbe",
      status: "Free Ticket",
    },
    {
      team: "Timilehin Adegbulugbe",
      status: "Paid Ticket",
    },
  ]);

  const [customerId, setCustomerId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({
    name: "",
    ticketId: "",
  });

  const checkInAttendee = useMutation({
    mutationFn: eventsManagamentFunctions.checkInAttendee,
    onError: async (error, variables, context) => {},
    onSuccess: async (data, variables, context) => {
      console.log("checkin-attendee", data);
    },
  });

  return (
    <div className="flex pb-20 md:pb-0">
      <Sidebar />
      <MobileFooter />

      <main className="w-full h-screen overflow-y-scroll">
        <Header
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
        {isModalOpen && <CheckInModal setIsModalOpen={setIsModalOpen} />}

        {!options.length ? (
          <div className="w-[351px] mx-auto flex flex-col items-center mt-[15%]">
            <Image
              src="/assets/check.svg"
              alt="Eventparrot logo"
              width={165}
              height={153}
              priority
            />
            <p className="py-5 text-center">
              Add attendees to keep everyone in the loop and make this event a
              blast.
            </p>
            <button
              //  onClick={() => setIsModalOpen(true)}
              className="bg-purple-700 py-[10px] hover:bg-opacity-70 px-5 w-auto h-[41px] text-white text-sm rounded-lg flex items-center space-x-[4px]"
            >
              <div>
                <HiOutlinePlusSm />
              </div>
              <p>Check in attendee</p>
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row justify-between px-3 md:px-7">
            <div className="w-full md:w-[398px] mt-[10%] h-[244px] bg-white rounded-md border-[.6px] shadow-md p-6">
              <h3 className="text">Check in attendee</h3>

              <div className="my-6">
                <label
                  className="text-sm mb-2 block text-gray-800"
                  htmlFor="organizerName"
                >
                  Customer ID <span className="text-red-500">*</span>
                </label>
                <input
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  type="text"
                  className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
                />
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  checkInAttendee.mutate({
                    id: customerId,
                    eventId: selectedEvent.ticketId,
                  });
                }}
                className="w-full h-12 grid place-content-center bg-primaryPurple text-sm text-white rounded-md hover:bg-opacity-70 "
              >
                <p>Add</p>
              </button>
            </div>

            {/* RIGHT */}

            <div className="mt-[6%] w-full lg:w-[45%]">
              <div className="flex justify-end">
                <Tabs />
              </div>
              <header className="w-full text-sm flex items-center py-3 px-4 bg-[#FBFAFC]">
                <p className="basis-1/2">Attendees</p>
                <p className="basis-1/2">Ticket type</p>
              </header>
              {options.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex w-full border-b items-center justify-between"
                >
                  <div className="flex flex-1 items-center space-x-5 p-3 ">
                    <div className="basis-1/2 text-gray-700">{item.team}</div>
                    <div className="basis-1/2 flex">
                      <div
                        className={`p-2 rounded-sm  ${
                          item.status.includes("Free")
                            ? "bg-lightPurple "
                            : "bg-[#EDF4FC] "
                        }`}
                      >
                        <p
                          className={`text-xs  ${
                            item.status.includes("Free")
                              ? "text-primaryPurple"
                              : "text-[#106BD5] "
                          }`}
                        >
                          {item.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CheckIns;
