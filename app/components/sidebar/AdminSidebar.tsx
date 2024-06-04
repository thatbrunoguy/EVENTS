"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import WalletIcon from "@/public/assets/WalletIcon";
import Megaphone from "@/public/assets/Megaphone-icon";

const routes = [
  {
    title: "Ads Campaign",
    icon: <WalletIcon />,
    path: "/admin/dashboard/ads",
  },
  {
    title: "Payouts",
    icon: <Megaphone />,
    path: "/admin/dashboard/payout",
  },
];

const AdminSidebar = () => {
  const path = usePathname();

  const handleSignOutClick = async () => {
    try {
      await signOut({ callbackUrl: "/auth/login" });
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

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

      <div className="px-6 flex-col gap-2 space-y-2 justify-center mt-12">
        {routes.map((item) => (
          <Link
            className={`flex items-center space-x-3 text-base px-4 py-3 text-gray-500 rounded-2xl hover:bg-lightPurple hover:text-primaryPurple hover:font-semibold ${
              path === item.path
                ? "bg-lightPurple text-primaryPurple font-semibold"
                : ""
            }`}
            key={item.title}
            href={item.path}
          >
            <div className="text-2xl">{item.icon}</div>
            <p>{item.title}</p>
          </Link>
        ))}
      </div>

      <div className="flex items-center space-x-3 text-base px-4 py-3 text-gray-500 rounded-2xl hover:bg-lightPurple hover:text-primaryPurple hover:font-semibold">
        <button>Sign out</button>
      </div>
    </div>
  );
};

export default AdminSidebar;
