"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { IoIosMore } from "react-icons/io";
import { MdCalendarToday, MdOutlineCampaign } from "react-icons/md";
import { PiUsersThreeLight } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import SidebarModal from "../modals/SidebarModal";

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
    title: "More",
    icon: <IoIosMore />,
    path: "more",
  },
];

const MobileFooter = () => {
  const path = usePathname().split("/");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <footer className="fixed block md:hidden h-auto py-4 z-50 bg-white border-t bottom-0 left-0 right-0">
      {isSidebarOpen && <SidebarModal setIsSidebarOpen={setIsSidebarOpen} />}
      <div className="px-4  flex  justify-between">
        {routes.map((item) => (
          <div key={item.title}>
            {item.path !== "more" ? (
              <Link
                className={`flex flex-col items-center justify-between text-sm  text-gray-500 rounded-2xl hover:text-primaryPurple hover:font-semibold ${
                  (path.length < 3 && item.path === "") ||
                  (path.length > 2 &&
                    path[2] === "dashboard" &&
                    item.path === "") ||
                  (path.length > 2 &&
                    path[2] !== "dashboard" &&
                    path[2] === item.path.split("/")[0])
                    ? "text-primaryPurple font-semibold"
                    : path.length > 3 &&
                      `${path[2]}/${path[3]}` === item.path &&
                      "text-primaryPurple font-semibold"
                }`}
                // key={item.title}
                href={`/dashboard/${item.path}`}
              >
                <div className="text-xl">{item.icon}</div>
                <p>{item.title}</p>
              </Link>
            ) : (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className={`flex flex-col items-center justify-between text-sm  text-gray-500 rounded-2xl hover:text-primaryPurple hover:font-semibold ${
                  path.length > 2
                    ? `${path[1]}/${path[2]}` === item.path &&
                      " text-primaryPurple font-semibold"
                    : path[1] === item.path &&
                      " text-primaryPurple font-semibold"
                }`}
                key={item.title}
              >
                <div className="text-xl">{item.icon}</div>
                <p>{item.title}</p>
              </button>
            )}
          </div>
        ))}
      </div>
    </footer>
  );
};

export default MobileFooter;
