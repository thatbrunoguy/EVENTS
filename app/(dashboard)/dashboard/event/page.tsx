"use client";

import Image from "next/image";
import Header from "../../../components/header/Header";
import Sidebar from "../../../components/sidebar/Sidebar";
import { HiOutlinePlusSm } from "react-icons/hi";
import Link from "next/link";
import { IoIosMore } from "react-icons/io";
import { useState } from "react";
import MobileFooter from "../../../components/footer/MobileFooter";
import { useQuery } from "@tanstack/react-query";
import { eventsManagamentFunctions } from "../../../utils/endpoints";
import PrimaryLoading, {
  PrimaryLoading2,
} from "../../../components/loaders/PrimaryLoading";
import { formatDate, formatTime } from "../../../helpers";
import GlobalTable from "@/app/components/table/GlobalTable";

type Ticket = {
  id: string;
  event_id: string;
  name: string;
  description: string;
  price: number;
  stock: string;
  stock_qty: number;
  purchase_limit: number;
  quantity_limit_per_person: number | null;
  currency: string;
  type: number;
  status: number;
  created_at: string;
  updated_at: string;
};

type Media = {
  original: string;
  thumb: string;
};

type Location = {
  id: string;
  event_id: string;
  type: number;
  latitude: string;
  longitude: string;
  country_code: string | null;
  country: string | null;
  city: string | null;
  zipcode: string | null;
  address: string;
  link: string | null;
  meta: any | null;
  status: number;
  created_at: string;
  updated_at: string;
};

export type EventData = {
  id: string;
  account_id: string;
  name: string;
  start_date: string;
  end_date: string;
  timezone: string;
  registration_requirements: {
    name: string;
    required: boolean;
  }[];
  description: string;
  medias: Media[];
  status: number;
  tickets: Ticket[];
  locations: Location[];
};
type FormattedEvent = {
  id: string;
  name: string;
  startDate: string;
  quantity: number;
  price: number;
  desc: string;
  img: string;
};

export default function Event() {
  const {
    data: events,
    isError,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["events"],
    queryFn: eventsManagamentFunctions.getEvents,
    select: (data) => {
      const selectedEvents: EventData[] = data.map((event: EventData) => {
        const startDate = event.start_date
          ? `${formatDate(event.start_date)} | ${formatTime(event.start_date)}`
          : null;
        const quantity =
          event.tickets[0]?.stock_qty != null
            ? event.tickets[0].stock_qty
            : null;
        const price =
          event.tickets[0]?.price != null ? event.tickets[0].price : null;
        const desc = event.tickets[0]?.description || null;
        const img = event.medias[0]?.original || null;
        const address = event.locations[0]?.address || "Online";

        return {
          id: event.id || null,
          name: event.name || null,
          startDate,
          quantity,
          price,
          desc,
          img,
          address,
        };
      });

      return selectedEvents;
    },
  });

  console.log("events", events);
  // const newArray = Array(20).fill(events);
  return (
    <section className="flex">
      <Sidebar />
      <MobileFooter />

      <main className="h-screen relative overflow-y-scroll flex-1">
        {/* <Header /> */}
        {isLoading ? (
          <div>
            <PrimaryLoading2 />
          </div>
        ) : (
          <div className="w-full flex  h-full justify-center items-center ">
            {events === undefined || events?.length < 1 ? (
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
                  href="/dashboard/create/basic-info"
                  className="bg-purple-700 py-[10px] px-5 w-[147px] h-[41px] text-white text-sm rounded-lg flex items-center space-x-[4px]"
                >
                  <div>
                    <HiOutlinePlusSm />
                  </div>
                  <p>Create Event</p>
                </Link>
              </div>
            ) : (
              <div className="w-[90%] mt-[5%] self-start">
                <h2 className="font-semibold text-2xl">Events</h2>

                <Link
                  href="/dashboard/create/basic-info"
                  className="bg-purple-700 mb-10 ml-auto py-[10px] px-5 w-[147px] h-[41px] text-white text-sm rounded-lg flex items-center space-x-[4px]"
                >
                  <div>
                    <HiOutlinePlusSm />
                  </div>
                  <p>Create Event</p>
                </Link>
                <div className="w-full overflow-x-scroll">
                  <header className=" w-[130vw] md:w-full text-xs  md:text-sm flex items-center justify-between py-3 px-4 bg-[#FBFAFC]">
                    <p className="w-[45%]">Ticket name</p>
                    <p className="">Ticket quantity</p>
                    <p className="">Ticket price</p>
                    <p className=""></p>
                  </header>
                  {events?.map((item: any, index: number) => (
                    <div
                      key={item.id}
                      className="flex w-[130vw] md:w-full border-b items-center justify-between"
                    >
                      <div className="flex items-center text-xs md:text-sm justify-between space-x-5 p-3  w-full">
                        <div className="flex items-center w-[45%] space-x-5">
                          <div className="h-[72px] w-[72px] relative rounded overflow-hidden">
                            <Image
                              fill
                              src={item.img}
                              alt={item.name}
                              className="object-cover"
                            />
                          </div>
                          <div className="w-full  text-xs md:text-sm">
                            <h4 className="font-semibold mb-1">{item.name}</h4>
                            <p className="text-lightText">{item.address}</p>
                            <p className="text-lightText">{item.startDate}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 flex-1 justify-items-end">
                          <div className=" md:mr-4">
                            {item.quantity || "unlimited"}
                          </div>
                          <div className="">
                            <p className="relative md:left-5">
                              {item.price || "Free"}
                            </p>
                          </div>
                          <div className="text-lg md:text-2xl  flex justify-end ">
                            <IoIosMore />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </section>
  );
}
