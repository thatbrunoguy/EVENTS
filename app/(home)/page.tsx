"use client";

import React from "react";
import HomeHeader from "../components/home/Header";
import Image from "next/image";
import HomeCategories from "../components/home/Categories";
import HomeEvents from "../components/home/Events";
import VirtualEvents from "../components/home/VirtualEvents";
import HomeFooter from "../components/home/Footer";
import LocationSearchBar from "../components/home/LocationSearchBar";
import { useQuery } from "@tanstack/react-query";
import { guestFunctions } from "@/app/utils/endpoints";
import { EventData } from "../(dashboard)/dashboard/event/page";
import { formatDate, formatDate2, formatTime } from "../helpers";

const Home = () => {
  const {
    data: events,
    isError,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["events-guest"],
    queryFn: guestFunctions.getEvents,
    select: (data) => {
      const selectedEvents: EventData[] = data.map((event: EventData) => {
        const startDate = event.start_date
          ? `${formatDate2(event.start_date)} | ${formatTime(event.start_date)}`
          : null;
        const quantity = event.tickets[0]?.stock_qty ?? null;
        const price = event.tickets[1]?.price ?? null;
        const desc = event.tickets[0]?.description ?? null;
        const img = event.medias[0]?.original ?? null;
        const address = event.locations[0]?.address ?? null;

        return {
          id: event.id,
          name: event.name,
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

  console.log("events -home", events);
  return (
    <section>
      {/* HERO */}
      <div className="w-[98%] mx-auto">
        <div className="relative h-[50vh] mt-6">
          <div className="h-full relative w-full rounded-lg overflow-hidden ">
            <Image
              className="object-cover"
              src="/assets/external-hero.jpeg"
              alt="Eventparrots Hero Banner"
              fill
              priority
            />
          </div>
          <div className="absolute w-[95%] md:w-[80%] -bottom-10 z-10 transform left-1/2 -translate-x-1/2">
            <LocationSearchBar />
          </div>
        </div>
      </div>

      <div className="">
        <HomeCategories />
      </div>

      <div className="md:mt-[84px]  md:pb-[84px] w-full bg-white">
        <HomeEvents events={events} />
      </div>
      {/* <div className=" w-full pb-[84px] bg-[#FBFAFC]">
        <VirtualEvents events={events} />
      </div> */}
    </section>
  );
};

export default Home;
