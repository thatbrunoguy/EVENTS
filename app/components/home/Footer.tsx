"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

const headOptions = [
  { title: "FAQ", url: "faq" },
  { title: "Events", url: "" },
  { title: "Terms of service", url: "terms" },
  { title: "Privacy Policy", url: "privacy-policy" },
];

const socials = [
  { icon: <BsTwitterX size={20} />, url: "https://twitter.com/events_parrot" },
  {
    icon: <FaLinkedinIn size={20} />,
    url: "https://www.linkedin.com/company/eventsparrot",
  },
  {
    icon: <FaFacebookF size={20} />,
    url: "https://www.facebook.com/eventsparrot",
  },
  {
    icon: <FaInstagram size={20} />,
    url: "https://instagram.com/eventsparrot",
  },
];

const HomeFooter = () => {
  const path = usePathname().split("/");

  return (
    <footer className="w-full h-[390px] flex  items-center  bg-[#291240]">
      <div className="flex justify-between gap-12 md:gap-0 flex-col md:flex-row mx-auto w-[90%] ">
        <div>
          <Link href="/">
            <Image
              src="/assets/logo-white.svg"
              alt="Eventparrot logo"
              width={152}
              height={32}
              priority
            />
          </Link>
        </div>

        <div className="flex flex-col gap-3 text-sm md:text-base md:gap-9 text-white">
          {headOptions.map((item, i) => (
            <Link
              className={` ${
                path[1] === item.url ? "underline" : ""
              } hover:underline underline-offset-8 transition-all duration-300 decoration-white`}
              key={i}
              href={`/${item.url}`}
            >
              <p>{item.title}</p>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6 self-start">
          {socials.map((item, i) => (
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
              key={i}
              href={item.url}
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
