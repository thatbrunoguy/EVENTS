"use client";
import Image from "next/image";
import React, { useState } from "react";
import { LuCalendarDays } from "react-icons/lu";
import { MdOutlineLocationOn } from "react-icons/md";
import { GrDown } from "react-icons/gr";
import Link from "next/link";
const options = [
  { title: "All" },
  { title: "Free" },
  { title: "Paid" },
  { title: "Virtual" },
  { title: "Popular" },
];

export const cards = [
  {
    id: "1",
    name: "Study Abroad Fair in Lagos Mainland 2024",
    date: "Sat, Feb 10th 2024 | 5pm",
    location: "The Good Village, VI",
    image: "/assets/event-card.png",
  },
  {
    id: "2",
    name: "Study Abroad Fair in Lagos Mainland 2024",
    date: "Sat, Feb 10th 2024 | 5pm",
    location: "The Good Village, VI",
    image: "/assets/event-card.png",
  },
  {
    id: "3",
    name: "Study Abroad Fair in Lagos Mainland 2024",
    date: "Sat, Feb 10th 2024 | 5pm",
    location: "The Good Village, VI",
    image: "/assets/event-card.png",
  },
  {
    id: "4",
    name: "Study Abroad Fair in Lagos Mainland 2024",
    date: "Sat, Feb 10th 2024 | 5pm",
    location: "The Good Village, VI",
    image: "/assets/event-card.png",
  },
  {
    id: "5",
    name: "Study Abroad Fair in Lagos Mainland 2024",
    date: "Sat, Feb 10th 2024 | 5pm",
    location: "The Good Village, VI",
    image: "/assets/event-card.png",
  },
  {
    id: "6",
    name: "Study Abroad Fair in Lagos Mainland 2024",
    date: "Sat, Feb 10th 2024 | 5pm",
    location: "The Good Village, VI",
    image: "/assets/event-card.png",
  },
  {
    id: "1",
    name: "Study Abroad Fair in Lagos Mainland 2024",
    date: "Sat, Feb 10th 2024 | 5pm",
    location: "The Good Village, VI",
    image: "/assets/event-card.png",
  },
  {
    id: "2",
    name: "Study Abroad Fair in Lagos Mainland 2024",
    date: "Sat, Feb 10th 2024 | 5pm",
    location: "The Good Village, VI",
    image: "/assets/event-card.png",
  },
  {
    id: "3",
    name: "Study Abroad Fair in Lagos Mainland 2024",
    date: "Sat, Feb 10th 2024 | 5pm",
    location: "The Good Village, VI",
    image: "/assets/event-card.png",
  },
  {
    id: "4",
    name: "Study Abroad Fair in Lagos Mainland 2024",
    date: "Sat, Feb 10th 2024 | 5pm",
    location: "The Good Village, VI",
    image: "/assets/event-card.png",
  },
  {
    id: "5",
    name: "Study Abroad Fair in Lagos Mainland 2024",
    date: "Sat, Feb 10th 2024 | 5pm",
    location: "The Good Village, VI",
    image: "/assets/event-card.png",
  },
  {
    id: "6",
    name: "Study Abroad Fair in Lagos Mainland 2024",
    date: "Sat, Feb 10th 2024 | 5pm",
    location: "The Good Village, VI",
    image: "/assets/event-card.png",
  },
  {
    id: "1",
    name: "Study Abroad Fair in Lagos Mainland 2024",
    date: "Sat, Feb 10th 2024 | 5pm",
    location: "The Good Village, VI",
    image: "/assets/event-card.png",
  },
  {
    id: "2",
    name: "Study Abroad Fair in Lagos Mainland 2024",
    date: "Sat, Feb 10th 2024 | 5pm",
    location: "The Good Village, VI",
    image: "/assets/event-card.png",
  },
  {
    id: "3",
    name: "Study Abroad Fair in Lagos Mainland 2024",
    date: "Sat, Feb 10th 2024 | 5pm",
    location: "The Good Village, VI",
    image: "/assets/event-card.png",
  },
  {
    id: "4",
    name: "Study Abroad Fair in Lagos Mainland 2024",
    date: "Sat, Feb 10th 2024 | 5pm",
    location: "The Good Village, VI",
    image: "/assets/event-card.png",
  },
];

type FormattedEvent = {
  event: {
    id: string;
    name: string;
    startDate: string;
    quantity: number;
    price: number;
    desc: string;
    img: string;
    address: string;
    lowestPrice: number;
    highestPrice: number;
  };
};

export const Card = ({ event }: FormattedEvent) => {
  const {
    name,
    id,
    startDate,
    price,
    address,
    img,
    lowestPrice,
    highestPrice,
  } = event;
  return (
    <div className="w-[95%] mx-auto md:mx-0 md:w-[295px] cursor-pointer border-[.6px] rounded-xl hover:shadow-xl  transition-all duration-300 bg-white pt-3">
      <Link href={`/events/${id}`} className=" w-auto h-auto block">
        <div className="px-3">
          <div className="h-[181px] w-full rounded-xl relative overflow-hidden">
            {img && (
              <Image
                className="object-cover"
                src={`${img}`}
                alt="event thumbnail"
                fill
                priority
              />
            )}
          </div>

          <div className="mt-4 mb-3">
            <p className="font-medium md:font-semibold text-lg md:text-xl">
              {name}
            </p>

            <div className=" flex items-center gap-3 my-5  font-light">
              <div className="text-base">
                <LuCalendarDays />
              </div>

              <p className="text-sm md:text-base">{startDate}</p>
            </div>
            <div className=" flex items-center gap-3 my-5 font-light">
              <div className="text-base">
                <MdOutlineLocationOn />
              </div>

              <p className="hover:underline text-sm md:text-base underline-offset-2 decoration-gray-400">
                {" "}
                {address}
              </p>
            </div>
          </div>
        </div>
      </Link>

      <footer className="border-t-[.4px] flex items-center justify-between px-3 py-3 ">
        <p className="text-sm text-gray-600 font-medium">
          {highestPrice === lowestPrice ? (
            <span>From ₦{lowestPrice}</span>
          ) : (
            <>
              <span>From</span> ₦{lowestPrice}
            </>
          )}
        </p>
        <Link href={`/events/${id}`}>
          <button className=" w-[131px] h-9 grid place-content-center border-[.5px]  rounded hover:bg-primaryPurple hover:text-white transition-all duration-300 border-primaryPurple text-primaryPurple">
            <p className="text-sm  ">Get Tickets</p>
          </button>
        </Link>
      </footer>
    </div>
  );
};

const HomeEvents = ({ events }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="w-[94%] md:w-[90%] mx-auto">
      <div className="flex items-center gap-24">
        <p className="text-lg font-semibold   md:text-3xl">
          Browse Events in <span className="text-primaryPurple">Lagos</span>
        </p>
        <div className="text-base md:text-[20px]">
          <GrDown />
        </div>
      </div>
      <div className="mt-7">
        <hr />
        <div className="flex items-center  p-2 md:p-3 pb-0">
          {options.map((item, i) => (
            <p
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-[60px] text-xs sm:text-sm md:text-base md:w-[155px] text-center cursor-pointer ${
                activeIndex === i
                  ? "border-b-2 border-primaryPurple pb-3 text-primaryPurple"
                  : "text-lightText"
              }`}
            >
              {item.title}
            </p>
          ))}
        </div>

        <hr />
        <div className="mt-12 grid-cols-1 grid md:grid-cols-2   lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {events?.map((card: any, i: number) => (
            <Card key={i} event={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeEvents;
