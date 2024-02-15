"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RxDashboard } from "react-icons/rx";
import {
  MdCalendarToday,
  MdOutlineCampaign,
  MdOutlineSavings,
} from "react-icons/md";
import { PiUsersThreeLight } from "react-icons/pi";
import { AiOutlineSetting } from "react-icons/ai";
import { IoMdWallet } from "react-icons/io";
import { TbCalendarTime } from "react-icons/tb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

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
    path: "events/check-ins",
  },
];
const Sidebar = () => {
  const path = usePathname().split("/");
  const { data: session, status } = useSession();
  const handleSignOutClick = async () => {
    try {
      await signOut({ callbackUrl: "/auth/login" });
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  // if(status === "authenticated"){
  //   storeData(EVENTSPARROT_USER, session.user);

  // }

  console.log("path", path);
  return (
    <div className="h-screen min-w-[284px] w-[284px] hidden md:block py-[25px] border-r relative">
      <div className="pl-6">
        <Link href="/">
          <Image
            src="/assets/eventparrot-logo.svg"
            alt="Eventparrot logo"
            width={152}
            height={32}
            priority
          />
        </Link>
      </div>

      <div className="px-6  flex-col gap-2 space-y-2 justify-center mt-12 ">
        {routes.map((item) => (
          <Link
            // className={`flex items-center space-x-3 text-base px-4 py-3 text-gray-500 rounded-2xl hover:bg-lightPurple hover:text-primaryPurple hover:font-semibold ${
            //   path.length > 3
            //     ? `${path[2]}/${path[3]}` === item.path &&
            //       "bg-lightPurple text-primaryPurple font-semibold"
            //     : path[2] === item.path &&
            //       "bg-lightPurple text-primaryPurple font-semibold"
            // }`}
            className={`flex items-center space-x-3 text-base px-4 py-3 text-gray-500 rounded-2xl hover:bg-lightPurple hover:text-primaryPurple hover:font-semibold ${
              (path.length < 3 && item.path === "") ||
              (path.length > 2 &&
                path[2] === "dashboard" &&
                item.path === "") ||
              (path.length > 2 &&
                path[2] !== "dashboard" &&
                path[2] === item.path.split("/")[0])
                ? "bg-lightPurple text-primaryPurple font-semibold"
                : path.length > 3 &&
                  `${path[2]}/${path[3]}` === item.path &&
                  "bg-lightPurple text-primaryPurple font-semibold"
            }`}
            key={item.title}
            href={`/dashboard/${item.path}`}
          >
            <div className="text-2xl">{item.icon}</div>
            <p>{item.title}</p>
          </Link>
        ))}
      </div>

      {session?.user && (
        <div className="flex space-x-3 py-6 pl-4 border-t absolute bottom-0 left-0 right-0">
          <div
            onClick={handleSignOutClick}
            className="relative w-[47px] h-[47px] grid place-content-center bg-lightPurple rounded-full overflow-hidden"
          >
            <p className="text-2xl text-primaryPurple font-medium">
              {/* @ts-ignore */}
              {session?.user?.user?.first_name.charAt(0).toUpperCase()}
            </p>
          </div>
          <div>
            {/* @ts-ignore */}
            <p>{`${session?.user?.user?.first_name} ${session?.user?.user?.last_name}`}</p>
            <p className="text-sm text-gray-500">Role: Business</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
