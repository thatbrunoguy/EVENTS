import { EventType } from "@/app/(home)/page";
import React, { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { GrDown, GrLocation } from "react-icons/gr";

type Iprops = {
  setGuestsEvent: React.Dispatch<React.SetStateAction<EventType[] | null>>;
  guestEvents: EventType[] | null;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  events: EventType[] | null;
};

const LocationSearchBar = ({
  guestEvents,
  setGuestsEvent,
  searchTerm,
  setSearchTerm,
  events,
}: Iprops) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const filteredResults = event.target.value
      ? guestEvents?.filter(
          (item) =>
            item?.name
              ?.toLowerCase()
              ?.includes(event.target.value.toLowerCase()) ||
            item?.address
              ?.toLowerCase()
              .includes(event.target.value.toLowerCase())
        )
      : guestEvents;
    setGuestsEvent(filteredResults as EventType[]);
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setGuestsEvent(events as EventType[]);
    }
  }, [searchTerm]);

  return (
    <div className=" h-[60px] md:h-[84px] shadow-xl bg-white flex rounded-xl  w-full ">
      <div className="flex items-center w-[50%] border-r px-6">
        <div className="flex items-center gap-2 md:gap-4  w-full ">
          <label
            className="text-primaryPurple text-base md:text-2xl"
            htmlFor="searchLocation"
          >
            <FiSearch />
          </label>
          <input
            onChange={handleChange}
            id="searchLocation"
            className="outline-none text-sm md:text-base font-light border-none block w-full"
            type="text"
            placeholder="Search Event..."
          />
        </div>
      </div>

      <div className="h-full bg-primaryPurple rounded-tr-xl rounded-br-xl md:bg-transparent text-white md:text-black flex items-center justify-between  basis-1/2 px-6 md:px-6">
        <div className="flex items-center gap-2">
          <div className="text-white md:text-primaryPurple text-base md:text-2xl">
            <GrLocation />
          </div>
          <p className="text-sm md:text-base">Ibadan</p>
        </div>
        <div className="text-xs md:text-base">
          <GrDown />
        </div>
      </div>

      <div className="basis-1/2 text-sm  md:text-base  h-full w-full hover:bg-purple-900 transition-all duration-300 cursor-pointer text-white  bg-primaryPurple hidden md:grid place-content-center rounded-tr-xl rounded-br-xl">
        <p>Search</p>
      </div>
    </div>
  );
};

export default LocationSearchBar;
