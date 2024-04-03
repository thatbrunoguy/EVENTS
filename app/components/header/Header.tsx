"use client";

import { EventData } from "@/app/(dashboard)/dashboard/event/page";
import { formatDate, formatTime } from "@/app/helpers";
import { eventsManagamentFunctions } from "@/app/utils/endpoints";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";

type Iprops = {
  selectedEvent: {
    name: string;
    eventId: string;
  };

  setSelectedEvent:
    | React.Dispatch<
        React.SetStateAction<{
          name: string;
          eventId: string;
          img?: string;
          location?: string;
          date?: string;
        }>
      >
    | any;
};

interface SelectedEventData {
  id: string;
  name: string;
  startDate: string;
  quantity: number;
  price: number;
  desc: string;
  img: string;
  address: string;
}
const Header = ({ selectedEvent, setSelectedEvent }: Iprops) => {
  // const [selectedEvent, setSelectedEvent] = useState({ name: "" });

  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: eventsManagamentFunctions.getEvents,
<<<<<<< HEAD
    select: (data): SelectedEventData[] => {
      const selectedEvents: any = data.map((event: EventData) => ({
        id: event.id,
        name: event.name,
        startDate: `${formatDate(event.start_date)} | ${formatTime(
          event.start_date
        )}`,
        quantity: event.tickets[0].stock_qty,
        price: event.tickets[0].price,
        desc: event.tickets[0].description,
        img: event.medias[0].original,
        address: event.locations[0]?.address ?? "Online",
      }));
=======
    select: (data) => {
      const selectedEvents = data.map((event: EventData) => {
        const startDate = event.start_date
          ? `${formatDate(event.start_date)} | ${formatTime(event.start_date)}`
          : null;
        const desc = event.tickets[0]?.description || null;
        const img = event.medias[0]?.original || null;
        const address = event.locations[0]?.address || "Online";
        const status = event.status;

        return {
          id: event.id || null,
          name: event.name || null,
          startDate,
          desc,
          img,
          address,
          status,
        };
      });
>>>>>>> 50211615ecdb05ac08e89bf7bf72a2000355fc7f

      return selectedEvents;
    },
  });

  useEffect(() => {
    if (events && events.length && selectedEvent?.name === "") {
      setSelectedEvent({
        name: events[0].name,
        eventId: events[0].id,
        img: events[0].img,
        address: events[0].address,
        startDate: events[0].startDate,
        desc: events[0].desc,
      });
    }
  }, [events]);

  return (
    <div className="w-full flex justify-center md:justify-end md:pr-7 border-b ">
      <div className="flex items-center space-x-4 py-4">
        <p className="text-sm">Select event</p>
        <div className="w-[1px] h-[48px] bg-gray-300" />

        <Menu
          className="w-full"
          direction="bottom"
          // arrow
          align="end"
          menuButton={
            <MenuButton style={{ background: "transparent" }}>
              <div className="border-2 px-3 py-3 flex items-center justify-between border-primaryPurple rounded-lg  text-primaryPurple w-[60vw] md:min-w-[340px] md:w-[65%] lg:w-[400px] bg-purple-100">
                <p className="text-xs md:text-base">{selectedEvent?.name}</p>
                <div className="text-xl">
                  <IoChevronDown />
                </div>
              </div>
            </MenuButton>
          }
          transition
        >
          {events?.map((item: any, index: number) => (
            <MenuItem
              onClick={() =>
                setSelectedEvent({
                  name: item.name,
                  eventId: item.id,
                  img: item.img,
                  address: item.address,
                })
              }
              className="hover:bg-lightPurple"
              key={index}
            >
              <div className="flex items-center space-x-5 p-3 ">
                <div className="h-[72px] w-[72px] hidden md:block relative rounded overflow-hidden">
                  <Image
                    className="object-cover"
                    fill
                    src={item.img}
                    alt={item.name}
                  />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{item.name}</h4>
                  <p className="text-lightText">{item.address}</p>
                  <p className="text-lightText">{item.startDate}</p>
                </div>
              </div>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
};

export default Header;
