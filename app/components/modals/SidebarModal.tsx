"use client";

import Image from "next/image";
import React from "react";
import { RxDashboard } from "react-icons/rx";
import {
  MdCalendarToday,
  MdOutlineCampaign,
  MdOutlineSavings,
} from "react-icons/md";
import { PiUsersThreeLight } from "react-icons/pi";
import { AiOutlineSetting } from "react-icons/ai";
import { IoMdClose, IoMdWallet } from "react-icons/io";
import { TbCalendarTime } from "react-icons/tb";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    title: "Dashboard",
    icon: <RxDashboard />,
    path: "",
  },
  {
    title: "Event",
    icon: <MdCalendarToday />,
    path: "event",
  },
  {
    title: "Campaigns",
    icon: <MdOutlineCampaign />,
    path: "campaigns",
  },
  {
    title: "Guestlist",
    icon: <PiUsersThreeLight />,
    path: "guestlist",
  },
  {
    title: "Sales",
    icon: <MdOutlineSavings />,
    path: "sales",
  },
  {
    title: "Wallet History",
    icon: <IoMdWallet />,
    path: "wallet",
  },
  {
    title: "Settings",
    icon: <AiOutlineSetting />,
    path: "settings",
  },
  {
    title: "Event Check ins",
    icon: <TbCalendarTime />,
    path: "event/check-ins",
  },
];

type Iprops = {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarModal = ({ setIsSidebarOpen }: Iprops) => {
  const path = usePathname().split("/");
  console.log("path", path);
  return (
    <>
      <div
        onClick={() => setIsSidebarOpen(false)}
        className="bg-black backdrop-blur-[2.5px] bg-opacity-50 fixed top-0 left-0 right-0 bottom-0"
        aria-label="backdrop"
      />
      <div className="h-screen fixed right-0 top-0 bg-white  min-w-[291px] w-[75%] z-[9999999] pt-[9%] py-[25px] border-r">
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="absolute -left-14 top-2 hover:bg-purple-50 text-xl h-12 w-12 bg-white rounded-full shadow-lg grid place-content-center"
        >
          <IoMdClose />
        </div>
        <div className="pl-6">
          <Image
            src="/assets/eventparrot-logo.svg"
            alt="Eventparrot logo"
            width={152}
            height={32}
            priority
          />
        </div>

        <div className="px-6  flex-col gap-2 space-y-2 justify-center mt-12 ">
          {routes.map((item) => (
            <Link
              className={`flex items-center space-x-3 text-base px-4 py-3 text-gray-500 rounded-2xl hover:bg-lightPurple hover:text-primaryPurple hover:font-semibold ${
                path.length > 2
                  ? `${path[1]}/${path[2]}` === item.path &&
                    "bg-lightPurple text-primaryPurple font-semibold"
                  : path[1] === item.path &&
                    "bg-lightPurple text-primaryPurple font-semibold"
              }`}
              key={item.title}
              href={`/${item.path}`}
            >
              <div className="text-2xl">{item.icon}</div>
              <p>{item.title}</p>
            </Link>
          ))}
        </div>

        <div className="flex space-x-3 py-6 pl-4 border-t absolute bottom-0 left-0 right-0">
          <div className="relative w-[47px] h-[47px] rounded-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D"
              alt="profile pic"
              className="object-cover"
              // width={47}
              // height={47}
              // style={{ borderRadius: "50%", objectFit: "cover" }}
            />
          </div>
          <div>
            <p>Christian Peters</p>
            <p className="text-sm text-gray-500">Role: Marketer</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarModal;
