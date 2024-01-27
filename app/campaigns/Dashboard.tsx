"use client";

import Image from "next/image";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import { HiOutlinePlusSm } from "react-icons/hi";
import Link from "next/link";
import TabsComponent from "../components/tabs/Tabs";
import { PiSpeakerHighLight } from "react-icons/pi";
import { useState } from "react";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { IoChevronDown } from "react-icons/io5";

export default function Dashboard() {
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
  return (
    <section className="flex justify-between">
      {/* LEFT */}
      <div className="px-9 mt-[60px] border-r pr-12">
        <div className="pb-5 border-b">
          <h3 className="font-semibold text-2xl">
            Your next event is in 83 days
          </h3>
          <p>Use this tool to sell more tickets when promoting your event</p>
        </div>

        <div className="mt-9 border-[0.5px] p-5 rounded-md">
          <Menu
            className="w-full"
            direction="bottom"
            // arrow
            align="start"
            menuButton={
              <MenuButton style={{ background: "transparent" }}>
                <div className="border px-3 py-3 flex items-center  h-[104px] justify-between shadow-lg rounded-lg w-[624px] bg-white">
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
                  <div className="flex items-center w-[575px] space-x-5 p-3 ">
                    <div className="h-[72px] w-[72px] relative rounded overflow-hidden">
                      <Image
                        fill
                        src="/assets/event.jpeg"
                        alt={item.title}
                        objectFit="cover"
                      />
                    </div>
                    <div>
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

        <div className="mt-24">
          <div className="w-full p-4 bg-purple-50 mb-3 py-6 flex items-center space-x-3">
            <input
              type="checkbox"
              className="block accent-primaryPurple w-5 h-5"
            />
            <div className="text-sm">
              <p className="text-primaryPurple">Share on social</p>
              <p>Add your event to Facebook directly from Eventsparrot</p>
            </div>
          </div>
          <div className="w-full p-4 py-6 bg-purple-50 mb-3 flex items-center space-x-3">
            <input
              type="checkbox"
              className="block accent-primaryPurple w-5 h-5"
            />
            <div className="text-sm">
              <p className="text-primaryPurple">Send an event announcement</p>
              <p>Email subscribers about your event</p>
            </div>
          </div>
          <div className="w-full p-4 py-6 bg-purple-50 mb-3 flex items-center space-x-3">
            <input
              type="checkbox"
              className="block accent-primaryPurple w-5 h-5"
            />
            <div className="text-sm">
              <p className="text-primaryPurple">
                Promote your event on Eventsparrot
              </p>
              <p>Give your event top placement on our most popular surfaces</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}

      <div className="mt-[60px] w-[38%] text-lg mr-9 rounded-lg border shadow-lg relative overflow-hidden">
        <div className="py-9 px-9 bg-[#FCEFE8] relative">
          <h3 className="uppercase w-[300px] text-xl font-semibold">
            Sell out your events quickly with our{" "}
            <span className="text-[#FF5602]">social media ads campaigns</span>
          </h3>

          <div className="absolute bottom-0 right-10 ">
            <Image
              src="/assets/fly.svg"
              alt="Fly"
              width={148}
              height={128}
              priority
            />
          </div>
        </div>

        <div className="flex flex-col items-center mt-16">
          <h3 className="font-medium text-xl">Get better placement</h3>
          <p className="mt-3 w-[300px] text-sm text-center">
            We&apos;ll show your ad on our most - visited areas across
            Eventsparrot, like search results, IOS app, and homeopage
          </p>

          <button
            // onClick={() => setIsProgressed(true)}
            className="bg-primaryPurple w-[230px] mt-16 h-14 hover:bg-opacity-70 rounded-md text-sm text-white"
          >
            <p>Advertise using social ads</p>
          </button>
        </div>
        <div className=" absolute -right-[98px] -bottom-[13px] w-[202px] h-[92px] bg-[#FCEFE8] rounded-full " />
        <div className=" absolute -right-40 bottom-12 w-[202px] rotate-[-8.8deg] h-[92px] bg-[#803C19] rounded-full " />
      </div>
    </section>
  );
}
