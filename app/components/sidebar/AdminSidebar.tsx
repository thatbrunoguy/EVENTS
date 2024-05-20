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
import { IoChevronDown } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { authFunctions } from "@/app/utils/endpoints";
import WalletIcon from "@/public/assets/WalletIcon";
import Megaphone from "@/public/assets/Megaphone-icon";

const routes = [
  {
    title: "Ads Campaign",
    icon: <WalletIcon />,
    path: "",
  },
  {
    title: "Payouts",
    icon: <Megaphone />,
    path: "event",
  },
];
const AdminSidebar = () => {
  const path = usePathname().split("/");

  const handleSignOutClick = async () => {
    try {
      await signOut({ callbackUrl: "/auth/login" });
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  // const { data: workspace } = useQuery({
  //   queryKey: ["user-account"],
  //   queryFn: authFunctions.getUserAccount,
  //   staleTime: Infinity,
  // });

  return (
    <div className="h-screen min-w-[284px] w-[284px] hidden md:block py-[25px] border-r relative">
      <div className="pl-6">
        <Link href="/">
          <Image
            src="/assets/eventparrot-admin-logo.svg"
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
    </div>
  );
};

export default AdminSidebar;
