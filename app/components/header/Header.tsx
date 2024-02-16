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

const Header = () => {
  const [options, setOptions] = useState([
    {
      title: " Eko convections centre",
      desc: "Lekki paradise estate 3, chevron drive",
      date: "Saturday, October 22, 2023 | 7:30pm",
    },
    {
      title: " Kuto convections centre",
      desc: "Lekki paradise estate 3, chevron drive",
      date: "Saturday, October 22, 2023 | 7:30pm",
    },
    {
      title: " Kano convections centre",
      desc: "Lekki paradise estate 3, chevron drive",
      date: "Saturday, October 22, 2023 | 7:30pm",
    },
    {
      title: " Dubai convections centre",
      desc: "Lekki paradise estate 3, chevron drive",
      date: "Saturday, October 22, 2023 | 7:30pm",
    },
  ]);
  const [selectedEvent, setSelectedEvent] = useState({ name: "" });
  const {
    data: events,
    isError,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["events"],
    queryFn: eventsManagamentFunctions.getEvents,
    select: (data) => {
      const selectedEvents: EventData[] = data.map((event: EventData) => ({
        id: event.id,
        name: event.name,
        startDate: `${formatDate(event.start_date)} | ${formatTime(
          event.start_date
        )}`,
        quantity: event.tickets[0].stock_qty,
        price: event.tickets[0].price,
        desc: event.tickets[0].description,
        img: event.medias[0].thumb,
        address: event.locations[0].address,
      }));

      return selectedEvents;
    },
  });

  useEffect(() => {
    if (events && events.length && selectedEvent.name === "") {
      setSelectedEvent(events[0]);
    }
  }, [events]);
  console.log("events", events);

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
          {events?.map((item: any, index) => (
            <MenuItem
              onClick={() => setSelectedEvent(item)}
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
