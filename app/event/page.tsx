"use client";

import Image from "next/image";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import { HiOutlinePlusSm } from "react-icons/hi";
import Link from "next/link";
import { IoIosMore } from "react-icons/io";
import { useState } from "react";

export default function Event() {
  const [options, setOptions] = useState<any>([
    {
      title: " Eko convections centre",
      desc: "Lekki paradise estate 3, chevron drive",
      date: "Saturday, October 22, 2023 | 7:30pm",
      quantity: "0/10000",
      price: "Free",
    },
    {
      title: " Eko convections centre",
      desc: "Lekki paradise estate 3, chevron drive",
      date: "Saturday, October 22, 2023 | 7:30pm",
      quantity: "0/10000",
      price: "₦20,000.00 - ₦50,000.00 ",
    },
    {
      title: " Eko convections centre",
      desc: "Lekki paradise estate 3, chevron drive",
      date: "Saturday, October 22, 2023 | 7:30pm",
      quantity: "0/10000",
      price: "Free",
    },
    {
      title: " Eko convections centre",
      desc: "Lekki paradise estate 3, chevron drive",
      date: "Saturday, October 22, 2023 | 7:30pm",
      quantity: "0/10000",
      price: "₦20,000.00",
    },
    {
      title: " Eko convections centre",
      desc: "Lekki paradise estate 3, chevron drive",
      date: "Saturday, October 22, 2023 | 7:30pm",
      quantity: "0/10000",
      price: "Free",
    },
    {
      title: " Eko convections centre",
      desc: "Lekki paradise estate 3, chevron drive",
      date: "Saturday, October 22, 2023 | 7:30pm",
      quantity: "0/10000",
      price: "₦20,000.00",
    },
    {
      title: " Eko convections centre",
      desc: "Lekki paradise estate 3, chevron drive",
      date: "Saturday, October 22, 2023 | 7:30pm",
      quantity: "0/10000",
      price: "Free",
    },
    {
      title: " Eko convections centre",
      desc: "Lekki paradise estate 3, chevron drive",
      date: "Saturday, October 22, 2023 | 7:30pm",
      quantity: "0/10000",
      price: "₦20,000.00 - ₦50,000.00 ",
    },
  ]);

  return (
    <section className="flex">
      <Sidebar />
      <main className="h-screen overflow-y-scroll flex-1">
        {/* <Header /> */}
        <div className="w-full flex  h-full justify-center items-center">
          {!options.length ? (
            <div className="w-[351px] flex flex-col items-center">
              <Image
                src="/assets/one.svg"
                alt="Eventparrot logo"
                width={165}
                height={153}
                priority
              />
              <p className="py-5 text-center">
                Get ready to make your event happen! Tap below to start
                planning. Your perfect gathering is just a click away.
              </p>
              <Link
                href="/create/basic-info"
                className="bg-purple-700 py-[10px] px-5 w-[147px] h-[41px] text-white text-sm rounded-lg flex items-center space-x-[4px]"
              >
                <div>
                  <HiOutlinePlusSm />
                </div>
                <p>Create Event</p>
              </Link>
            </div>
          ) : (
            <div className="w-[90%] mt-[15%]">
              <h2 className="font-semibold text-2xl">Events</h2>

              <Link
                href="/create/basic-info"
                className="bg-purple-700 mb-10 ml-auto py-[10px] px-5 w-[147px] h-[41px] text-white text-sm rounded-lg flex items-center space-x-[4px]"
              >
                <div>
                  <HiOutlinePlusSm />
                </div>
                <p>Create Event</p>
              </Link>
              <div className="">
                <header className="w-full text-sm flex items-center py-3 px-4 bg-[#FBFAFC]">
                  <p className="w-[500px]">Ticket name</p>
                  <p className="w-[400px]">Ticket quantity</p>
                  <p className="w-[400px]">Ticket price</p>
                </header>
                {options.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex w-full border-b items-center justify-between"
                  >
                    <div className="flex items-center space-x-5 p-3 ">
                      <div className="h-[72px] w-[72px] relative rounded overflow-hidden">
                        <Image
                          fill
                          src="/assets/event.jpeg"
                          alt={item.title}
                          className="object-cover"
                        />
                      </div>
                      <div className="w-[378px] text-sm">
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-lightText">{item.desc}</p>
                        <p className="text-lightText">{item.date}</p>
                      </div>
                      <div className="w-[360px]">{item.quantity}</div>
                      <div className="w-[310px]">{item.price}</div>
                      <div className="text-2xl">
                        <IoIosMore />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </section>
  );
}
