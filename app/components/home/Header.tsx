"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";

const headOptions = [
  { title: "FAQ", url: "faq" },
  { title: "Events", url: "" },
  { title: "Terms of service", url: "terms" },
  { title: "Privacy Policy", url: "privacy-policy" },
];

const HomeHeader = () => {
  const path = usePathname().split("/");

  return (
    <div className="w-full bg-white sticky z-30 top-0 mx-auto border-b ">
      <div className="flex  items-center mx-auto justify-between h-[72px] w-[90%]">
        <Link href="/">
          <Image
            src="/assets/eventparrot-logo.svg"
            alt="Eventparrot logo"
            width={152}
            height={32}
            priority
          />
        </Link>

        <div className=" items-center gap-9 font-light hidden md:flex">
          {headOptions.map((head) => (
            <Link
              className={` ${
                path[1] === head.url ? "underline" : ""
              } hover:underline underline-offset-8 transition-all duration-300 ease-linear decoration-primaryPurple`}
              href={`/${head.url}`}
              key={head.title}
            >
              {head.title}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-9 font-light">
          <Link
            className="hover:underline underline-offset-4 decoration-primaryPurple"
            href="/auth/login"
          >
            Login
          </Link>
          <button className="h-[44px] w-[141px] transition-all duration-300 ease-linear hover:bg-opacity-60 bg-primaryPurple rounded-md text-white ">
            <Link href="/auth/sign-up">
              <p>Sign up</p>
            </Link>
          </button>
        </div>

        <div className="block md:hidden text-2xl">
          <HiOutlineMenuAlt4 />
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
