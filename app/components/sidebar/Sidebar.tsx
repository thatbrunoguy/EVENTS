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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authFunctions } from "@/app/utils/endpoints";
import { Menu, MenuButton, MenuGroup, MenuItem } from "@szhsin/react-menu";
import { EVENTSPARROT_USER, truncateText } from "@/app/constants";
import {
  addToLocalStorage,
  getData,
  removeFromLocalStorage,
} from "@/app/utils/localstorage";
import { roles } from "@/app/utils/endpoints/teammate";

const routes = [
  {
    title: "Dashboard",
    icon: <RxDashboard />,
    path: "",
    allowedRoles: [1, 2],
  },
  {
    title: "Event",
    icon: <MdCalendarToday />,
    path: "event",
    allowedRoles: [1],
  },
  {
    title: "Campaigns",
    icon: <MdOutlineCampaign />,
    path: "campaigns",
    allowedRoles: [1, 2],
  },
  {
    title: "Guestlist",
    icon: <PiUsersThreeLight />,
    path: "guestlist",
    allowedRoles: [1, 2, 3],
  },
  {
    title: "Sales",
    icon: <MdOutlineSavings />,
    path: "sales",
    allowedRoles: [1],
  },
  {
    title: "Wallet History",
    icon: <IoMdWallet />,
    path: "wallet",
    allowedRoles: [1],
  },
  {
    title: "Settings",
    icon: <AiOutlineSetting />,
    path: "settings",
    allowedRoles: [1],
  },
  {
    title: "Event Check ins",
    icon: <TbCalendarTime />,
    path: "events/check-ins",
    allowedRoles: [1, 2, 3],
  },
];
const Sidebar = () => {
  const path = usePathname().split("/");
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const { data: accountInfo_ } = useQuery({
    queryKey: ["account-info"],
    queryFn: authFunctions.getAccountInfo,
    staleTime: Infinity,
  });

  const handleSignOutClick = async () => {
    try {
      await signOut({ callbackUrl: "/auth/login" });
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  const { data: workspace } = useQuery({
    queryKey: ["user-account"],
    queryFn: authFunctions.getUserAccount,
    staleTime: Infinity,
  });

  const handleWorkspaceSwitch = (workspace: any) => {
    addToLocalStorage(EVENTSPARROT_USER, "account", workspace);
    removeFromLocalStorage("activeEvent");
    queryClient.invalidateQueries();
  };

  // if(status === "authenticated"){
  //   storeData(EVENTSPARROT_USER, session.user);

  // }

  return (
    <div className="h-[100dvh] min-w-[284px] w-[284px] hidden md:block py-[25px] border-r relative">
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

      <div className="px-6 pb-20 md:pb-0  flex-col gap-2 space-y-2 justify-center h-[70dvh] mt-12 overflow-y-auto">
        {routes
          .filter((route) =>
            route.allowedRoles?.includes(accountInfo_.user_role_on_account)
          )
          .map((item) => (
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
        <div className="flex justify-between items-center border-t fixed bottom-0 left-0 w-[284px] border-r py-6 px-4 bg-white">
          <div className="flex space-x-3">
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
              <p>
                {truncateText(
                  //@ts-ignore
                  `${session?.user?.user?.first_name} ${session?.user?.user?.last_name}`,
                  13
                )}
              </p>
              <p className="text-sm text-gray-500">
                Role:{" "}
                {
                  //@ts-ignore
                  roles[accountInfo_?.user_role_on_account]?.split(" ")[0]
                }
              </p>
            </div>
          </div>
          <div className="cursor-pointer">
            <Menu
              className="w-full"
              direction="right"
              menuStyle={{
                backgroundColor: "white",
                border: "1px solid #E7E4EB",
                borderRadius: 8,
                width: 230,
                height: 240,
                padding: 6,
                boxShadow:
                  "0px 4px 6px -2px #88868A0D, 0px 12px 16px -4px #88868A1A",
              }}
              // arrow
              align="end"
              menuButton={
                <MenuButton style={{ background: "transparent" }}>
                  <IoChevronDown />
                </MenuButton>
              }
              transition
            >
              <MenuGroup>
                {workspace?.map((item: any, index: number) => (
                  <MenuItem
                    onClick={() => handleWorkspaceSwitch(item)}
                    className="py-2 cursor-pointer pl-3 hover:bg-lightPurple"
                    key={index}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative w-[30px] h-[30px] grid place-content-center bg-lightPurple rounded-full overflow-hidden">
                        <p className="text-xl text-primaryPurple font-medium">
                          {/* @ts-ignore */}
                          {item.name.charAt(0).toUpperCase()}
                        </p>
                      </div>
                      <div>
                        <p>{truncateText(`${item.name}`, 13)}</p>
                      </div>
                    </div>
                  </MenuItem>
                ))}
              </MenuGroup>
            </Menu>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
