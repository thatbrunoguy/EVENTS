"use client";

import ReactQuillEditor from "@/app/components/Reactquill";
import FileUpload from "@/app/components/fileUpload/FileUpload";
import { TabsComponent2 } from "@/app/components/tabs/Tabs";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { GoSearch } from "react-icons/go";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { EmailAdContext } from "./EmailAdsContext";
import { useQuery } from "@tanstack/react-query";
import { eventsManagamentFunctions } from "@/app/utils/endpoints";
import { formatDate, formatTime } from "@/app/helpers";
import { EventData } from "../../../event/page";

const CreateEmailCampaignContent = () => {
  const [options, setOptions] = useState([
    {
      title: " Eko convections centre",
      desc: "Lekki paradise estate 3, chevron drive",
      date: "Saturday, October 22, 2023 | 7:30pm",
    },
    {
      title: " Eko convections centre",
      desc: "Lekki paradise estate 3, chevron drive",
      date: "Saturday, October 22, 2023 | 7:30pm",
    },
    {
      title: " Eko convections centre",
      desc: "Lekki paradise estate 3, chevron drive",
      date: "Saturday, October 22, 2023 | 7:30pm",
    },
    {
      title: " Eko convections centre",
      desc: "Lekki paradise estate 3, chevron drive",
      date: "Saturday, October 22, 2023 | 7:30pm",
    },
  ]);

  const { setData, setMailContent } = useContext(EmailAdContext);

  const [eventPhoto, setEventPhoto] = useState<any>([]);
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: eventsManagamentFunctions.getEvents,
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

      return selectedEvents;
    },
  });

  const filteredEvents = events.filter((event: any) =>
    event?.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const thumbs = eventPhoto.map((file: any) => (
    <div key={file.name}>
      <div>
        <img
          src={file.preview}
          className="w-full h-full object-cover"
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  return (
    <div className="w-full  h-fullflex">
      <div className="mt-9 w-full">
        <h2 className="text-[24px] font-semibold mb-9">Content</h2>

        <div className="relative">
          <div className="flex items-center space-x-2 h-[56px] focus-within:border-2 focus-within:border-primaryPurple text-sm w-full text-gray-600 px-3 mt-2  bg-[#F8F8F8] rounded-lg outline-primaryPurple">
            <label htmlFor="search">
              <GoSearch />
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search for events"
              className="block bg-transparent w-full h-full outline-none border-none"
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={() => setShowDropdown(false)}
              autoComplete="off"
            />
          </div>
          {showDropdown ? (
            filteredEvents?.length > 0 ? (
              <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 z-10">
                <ul>
                  {filteredEvents.map((result: any, index: number) => (
                    <li
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      <div className="w-full flex items-center space-x-3 mb-8">
                        <div className="">
                          <input
                            type="checkbox"
                            className=" w-5 h-5 accent-primaryPurple"
                          />
                        </div>
                        <div className="flex items-center space-x-5 p-3">
                          <div className="h-[72px] w-[72px] relative rounded overflow-hidden">
                            <Image
                              fill
                              src={result?.img}
                              alt={result?.name}
                              objectFit="cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">
                              {result?.name}
                            </h4>
                            <p className="text-lightText">{result?.address}</p>
                            <p className="text-lightText">
                              {result?.startDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 z-10 p-4 ">
                <p>No event found for your search</p>
              </div>
            )
          ) : null}
        </div>

        <div className="w-full py-4 px-4 bg-[#F8F8F8] mt-5 text-sm flex items-center justify-between">
          <p>Events</p>
          <p>Ticket quantity</p>
        </div>

        {events?.slice(0, 2)?.map((event: any) => (
          <div className="w-full flex items-center space-x-3 mb-8">
            <div className="">
              <input
                type="checkbox"
                className=" w-5 h-5 accent-primaryPurple"
                onClick={() =>
                  //@ts-ignore
                  setMailContent((prev) => ({
                    ...prev,
                    selectedEvents: prev.selectedEvents.push(event),
                  }))
                }
              />
            </div>
            <div className="flex items-center space-x-5 p-3">
              <div className="h-[72px] w-[72px] relative rounded overflow-hidden">
                <Image
                  fill
                  src={event.img}
                  alt={event.name}
                  objectFit="cover"
                />
              </div>
              <div>
                <h4 className="font-semibold mb-1">{event.name}</h4>
                <p className="text-lightText">{event.address}</p>
                <p className="text-lightText">{event.startDate}</p>
              </div>
            </div>
          </div>
        ))}

        <h2 className="text-[24px] font-semibold mb-9">Subject</h2>

        <div>
          <label className="text-sm text-gray-800" htmlFor="subject">
            Subject title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            onChange={(e) =>
              //@ts-ignore
              setData((prev) => ({ ...prev, subject: e.target.value }))
            }
          />
        </div>

        <div className="my-6">
          <label
            className="text-sm block text-gray-800 mb-2"
            htmlFor="organizerName"
          >
            Description of your event <span className="text-red-500">*</span>
          </label>
          <ReactQuillEditor setValue={setValue} value={value} />
        </div>

        <h2 className="text-[24px] font-semibold my-9">Header image</h2>

        {/* UPLOAD */}

        {eventPhoto.length === 0 && (
          <div className="w-full relative flex items-center justify-center h-[248px] border border-dashed rounded-lg border-gray-600">
            <FileUpload setEventPhoto={setEventPhoto} />
          </div>
        )}
        {eventPhoto.length > 0 && (
          <div className="w-full relative overflow-hidden flex items-center justify-center h-[248px] border rounded-lg border-primaryPurple hover:bg-lightPurple">
            <div
              onClick={() => setEventPhoto([])}
              className="w-[72px] h-[72px] cursor-pointer text-3xl transition-all duration-300 ease-in-out hover:text-red-500 hover:bg-red-100 rounded-full bg-white grid place-content-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <RiDeleteBin6Fill onClick={() => setEventPhoto([])} />
            </div>
            <div className="w-full">{thumbs}</div>
          </div>
        )}

        <p className="text-xs text-lightText mt-2">
          The content should be accompanied by an image placed above the main
          text. Ideally, the image should have a 2:1 aspect ratio (with a
          minimum size of 2160x1080 pixels) and be under 1MB in size.
        </p>

        <div className="mt-6 mb-2">
          <label className="text-sm text-gray-800" htmlFor="organizerName">
            Add text to make image more accessible{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            // placeholder="Quick description of your Event name"
            className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateEmailCampaignContent;
