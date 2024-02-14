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

export const Card = ({ event }: any) => {
  return (
    <div className="w-full md:w-[295px] border-[.6px] rounded-xl hover:shadow-xl  transition-all duration-300 bg-white pt-3">
      <div className="px-3">
        <div className="h-[181px] w-full rounded-xl relative overflow-hidden">
          <Image
            className="object-cover"
            src={`${event.image}`}
            alt="event thumbnail"
            fill
            priority
          />
        </div>

        <div className="mt-4 mb-3">
          <p className="font-semibold text-xl">{event.name}</p>

          <div className=" flex items-center gap-3 my-5  font-light">
            <LuCalendarDays />

            <p>{event.date}</p>
          </div>
          <div className=" flex items-center gap-3 my-5 font-light">
            <MdOutlineLocationOn size={18} />

            <p>{event.location}</p>
          </div>
        </div>
      </div>

      <footer className="border-t-[.4px] flex items-center justify-between px-3 py-3 ">
        <p className="text-lg font-medium">₦18,800</p>
        <Link href="/events/valentine">
          <button className=" w-[131px] h-9 grid place-content-center border-[.5px]  rounded hover:bg-primaryPurple hover:text-white transition-all duration-300 border-primaryPurple text-primaryPurple">
            <p className="text-sm  ">Get Tickets</p>
          </button>
        </Link>
      </footer>
    </div>
  );
};

const HomeEvents = () => {
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
          {cards.map((card, i) => (
            <Card key={i} event={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeEvents;
