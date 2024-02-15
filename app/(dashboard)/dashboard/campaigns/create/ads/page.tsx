"use client";

import { BsPersonCheck } from "react-icons/bs";
import { MdAdsClick } from "react-icons/md";
import { PiSpeakerHigh } from "react-icons/pi";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import Image from "next/image";
import React, { useState } from "react";
import { IoChevronDown, IoClose } from "react-icons/io5";
import { MdInfo } from "react-icons/md";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { Value } from "@/app/(dashboard)/dashboard/create/basic-info/page";
import ReactSelectOptions from "@/app/components/select/ReactSelect";
import Faq from "../Faq";
import { FaMinus, FaPlus } from "react-icons/fa6";
import BuyTokenModal from "./BuyTokenModal";

const CreateAdsCampaign = () => {
  const [selectedOption, setSelectedOption] = useState({});
  const [options, setOptions] = useState([
    {
      title: " Eko convections centre",
      desc: "Lekki paradise estate 3, chevron drive",
      date: "Saturday, October 22, 2023 | 7:30pm",
    },
    {
      title: " Eko convections centre",
      desc: "Lekki paradise estate 3, chevron drive",
      date: "Saturday, October 22, 2023 | 7:30pm",
    },
    {
      title: " Eko convections centre",
      desc: "Lekki paradise estate 3, chevron drive",
      date: "Saturday, October 22, 2023 | 7:30pm",
    },
    {
      title: " Eko convections centre",
      desc: "Lekki paradise estate 3, chevron drive",
      date: "Saturday, October 22, 2023 | 7:30pm",
    },
  ]);
  const [startDate, setStartDate] = useState<Value>(new Date());
  const [startTime, setStartTime] = useState<any>("10:00");
  const [tokens, setTokens] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="w-full min-h-screen flex">
      {isModalOpen && <BuyTokenModal setIsModalOpen={setIsModalOpen} />}

      <div className="p-2 py-4 md:p-12 bg-white w-full md:basis-[55%]">
        <h3 className="font-semibold text-xl mb-2">📢 Eventparrot Ads</h3>
        <p className="text-sm">
          You&apos;re on the verge of promoting on our worldwide marketplace,
          where millions actively seek exciting activities! Benefit from premium
          event placement and enhance your ticket sales.
        </p>

        <div className="mt-9 border-[0.5px] p-2 md:p-5 rounded-md">
          <h3 className="">Select an Event</h3>
          <Menu
            className="w-full"
            direction="bottom"
            // arrow
            align="start"
            menuButton={
              <MenuButton style={{ background: "transparent" }}>
                <div className="border px-3 py-3 flex items-center mt-6 md:h-[104px] justify-between shadow-lg rounded-lg w-full md:w-[624px] bg-white">
                  <div className="flex items-center space-x-5 p-3 ">
                    <div className="h-[72px] w-[72px] relative rounded overflow-hidden">
                      <Image
                        fill
                        src="/assets/event.jpeg"
                        alt={options[0].title}
                        objectFit="cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{options[0].title}</h4>
                      <p className="text-lightText">{options[0].desc}</p>
                      <p className="text-lightText">{options[0].date}</p>
                    </div>
                  </div>
                  <div className="text-xl">
                    <IoChevronDown />
                  </div>
                </div>
              </MenuButton>
            }
            transition
          >
            <div className="shadow-xl mt-6  bg-white">
              {options.map((item, index) => (
                <MenuItem
                  className="hover:bg-gray-100 hover:border-b cursor-pointer"
                  key={index}
                >
                  <div className="flex items-center w-full md:w-[575px] space-x-3 md:space-x-5 md:p-3 ">
                    <div className="h-[42px] md:h-[72px] w-[42px] md:w-[72px] relative rounded overflow-hidden">
                      <Image
                        fill
                        src="/assets/event.jpeg"
                        alt={item.title}
                        objectFit="cover"
                      />
                    </div>
                    <div className="w-full">
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-lightText">{item.desc}</p>
                      <p className="text-lightText">{item.date}</p>
                    </div>
                  </div>
                </MenuItem>
              ))}
            </div>
          </Menu>
        </div>

        <div className="w-full mt-9 h-auto border rounded-md p-5">
          <h4 className="text-lg">Set an Objective</h4>

          {/* --- */}
          <div className="mt-6 flex items-center justify-between py-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="text-primaryPurple">
                <BsPersonCheck />
              </div>
              <p>Get Registrations</p>
            </div>
            <div>
              <input
                type="radio"
                className="block w-5 h-5 cursor-pointer accent-primaryPurple"
              />
            </div>
          </div>

          {/* --- */}
          <div className="mt-6 flex items-center justify-between py-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="text-primaryPurple">
                <MdAdsClick />
              </div>
              <p>Drive traffic</p>
            </div>
            <div>
              <input
                type="radio"
                className="block w-5 h-5 cursor-pointer accent-primaryPurple"
              />
            </div>
          </div>

          {/* --- */}
          <div className="mt-6 flex items-center justify-between py-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="text-primaryPurple">
                <PiSpeakerHigh />
              </div>
              <p>Increase awareness</p>
            </div>
            <div>
              <input
                type="radio"
                className="block w-5 h-5 cursor-pointer accent-primaryPurple"
              />
            </div>
          </div>
        </div>

        {/* ----- */}

        <div className="w-full mt-9 h-auto border rounded-md p-5">
          <h4 className="text-lg">Build your ad</h4>
          <div className="flex items-center w-full space-x-6 mt-6">
            <div className="basis-1/2">
              <label
                className="text-sm block mb-2 text-gray-800"
                htmlFor="organizerName"
              >
                Event start date <span className="text-red-500">*</span>
              </label>
              <div>
                <DatePicker onChange={setStartDate} value={startDate} />
              </div>
            </div>
            <div className="basis-1/2">
              <label
                className="text-sm block mb-2 text-gray-800"
                htmlFor="organizerName"
              >
                Event end time <span className="text-red-500">*</span>
              </label>
              <div>
                <TimePicker onChange={setStartTime} value={startTime} />
              </div>
            </div>
          </div>
        </div>

        {/* ----- */}

        <div className="w-full mt-9 h-auto border rounded-md p-5">
          <h4 className="text-lg">Target Location</h4>

          <div className="flex items-center w-full space-x-6 mt-2">
            <div className="my-6 basis-1/2">
              <label
                className="text-sm mb-2 block text-gray-800"
                htmlFor="organizerName"
              >
                Location <span className="text-red-500">*</span>
              </label>

              <ReactSelectOptions
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                options={[]}
              />
            </div>
            <div className="my-6 basis-1/2">
              <label
                className="text-sm mb-2 block text-gray-800"
                htmlFor="organizerName"
              >
                City <span className="text-red-500">*</span>
              </label>

              <ReactSelectOptions
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                options={[]}
              />
            </div>
          </div>
        </div>

        {/* -----BUY TOKEN---- */}

        <div className="w-full relative mt-9 h-auto border rounded-md p-5">
          <div className=" w-full hover:bg-[#FF5602] group flex items-center justify-between  rounded-md px-4 hover:text-white bg-[#FCEFE8] text-xs h-9 ">
            <div className="flex items-center space-x-2">
              <div className="text-xl text-[#FF5602] group-hover:text-white">
                <MdInfo />
              </div>
              <p>You have free 5 Tokens</p>
            </div>
            <IoClose className="text-xl cursor-pointer" />
          </div>
          <div className="my-6">
            <h4 className="text-lg">Tokens</h4>
            <p className="text-lightText text-sm">Buy some token</p>
          </div>

          <div className="flex items-center w-full space-x-6 my-6">
            <div className="bg-[#F8F8F8] flex items-center justify-between px-7 h-14 flex-1">
              <p>{tokens}</p>
              <p>Tokens</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setTokens((prev) => (prev += 1))}
                className="w-14 h-14 bg-lightPurple hover:bg-primaryPurple hover:text-white text-primaryPurple rounded-md grid place-content-center"
              >
                <p>
                  <FaPlus />
                </p>
              </button>
              <button
                onClick={() => setTokens((prev) => (prev -= 1))}
                className="w-14 h-14 bg-lightPurple hover:bg-primaryPurple hover:text-white text-primaryPurple rounded-md grid place-content-center"
              >
                <p>
                  <FaMinus />
                </p>
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="text-primaryPurple w-full bg-lightPurple grid place-content-center h-10 rounded-md hover:bg-primaryPurple hover:text-white"
          >
            <p>Buy</p>
          </button>
        </div>
      </div>

      {/* RIGHT */}

      <div className="basis-[45%] hidden md:block min-h-screen p-12 bg-gray-100">
        <div>
          <h4 className="text-xl w-full font-semibold">Preview</h4>

          <div className="flex items-center bg-white w-full mt-6 mb-12 border-[.4px] rounded-md space-x-6 shadow-xl p-5 ">
            <div className="h-[72px] w-[72px] relative rounded overflow-hidden">
              <Image
                fill
                src="/assets/event.jpeg"
                alt={options[0].title}
                objectFit="cover"
              />
            </div>
            <div>
              <h4 className="font-semibold mb-1">{options[0].title}</h4>
              <p className="text-lightText">{options[0].desc}</p>
              <p className="text-lightText">{options[0].date}</p>
            </div>
          </div>

          {/* FAQS */}

          <div>
            <h4 className=" text-xl w-full font-semibold">Faqs</h4>
            <div>
              <Faq />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateAdsCampaign;
