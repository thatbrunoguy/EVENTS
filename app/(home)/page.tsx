"use client";

import React, { useEffect, useState } from "react";
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

export type EventType = {
  id: string;
  name: string;
  startDate: string;
  quantity: number;
  tickets: [];
  lowestPrice: number;
  highestPrice: number;
  desc: string;
  img: string;
  address: string;
};

const Home = () => {
  const [guestEvents, setGuestsEvent] = useState<EventType[] | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: events,
    isError,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["events-guest"],
    queryFn: guestFunctions.getEvents,
    select: (data): EventType[] => {
      const selectedEvents = data.map((event: EventData) => {
        let lowestPrice = Number.MAX_VALUE;
        let highestPrice = 0;

        const startDate = event.start_date
          ? `${formatDate2(event.start_date)} | ${formatTime(event.start_date)}`
          : null;
        const quantity = event.tickets[0]?.stock_qty ?? null;
        const tickets = event.tickets.map((ticket: any) => {
          lowestPrice = Math.min(lowestPrice, ticket.price);
          highestPrice = Math.max(highestPrice, ticket.price);

          return {
            id: ticket.id,
            name: ticket.name,
            price: ticket.price,
            stock_qty: ticket.stock_qty,
            purchase_limit: ticket.purchase_limit,
            quantity_limit_per_person: ticket.quantity_limit_per_person,
            currency: ticket.currency,
            type: ticket.type,
            status: ticket.status,
            created_at: ticket.created_at,
            updated_at: ticket.updated_at,
          };
        });

        const desc = event.tickets[0]?.description ?? null;
        const img = event.medias[0]?.original ?? null;
        const address = event.locations[0]?.address ?? null;

        return {
          id: event.id,
          name: event.name,
          startDate,
          quantity,
          tickets,
          lowestPrice,
          highestPrice,
          desc,
          img,
          address,
        };
      });

      return selectedEvents;
    },
  });
  useEffect(() => {
    setGuestsEvent(events as EventType[]);
  }, [events]);

  return (
    <section>
      {/* HERO */}
      <div className="w-[98%] mx-auto">
        <div className="relative h-[50vh] md:h-[56vh] mt-6">
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
            <LocationSearchBar
              guestEvents={guestEvents}
              setGuestsEvent={setGuestsEvent}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              events={events as EventType[]}
            />
          </div>
        </div>
      </div>

      <div className="">
        <HomeCategories />
      </div>

      <div className="md:mt-[84px] mb-16 md:mb-0 md:pb-[84px] w-full bg-white">
        <HomeEvents events={guestEvents} />
      </div>
      {/* <div className=" w-full pb-[84px] bg-[#FBFAFC]">
        <VirtualEvents events={events} />
      </div> */}
    </section>
  );
};

export default Home;
