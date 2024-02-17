"use client";

import ReactQuillEditor from "@/app/components/Reactquill";
import FileUpload from "@/app/components/fileUpload/FileUpload";
import { TabsComponent2 } from "@/app/components/tabs/Tabs";
import Image from "next/image";
import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { RiDeleteBin6Fill } from "react-icons/ri";

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

  const [eventPhoto, setEventPhoto] = useState<any>([]);
  const [value, setValue] = useState("");

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

        <div className="flex items-center space-x-2 h-[56px] focus-within:border-2 focus-within:border-primaryPurple text-sm w-full text-gray-600 px-3 mt-2  bg-[#F8F8F8] rounded-lg outline-primaryPurple">
          <label htmlFor="search">
            <GoSearch />
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search for events"
            className="block bg-transparent w-full h-full outline-none border-none"
          />
        </div>

        <div className="w-full py-4 px-4 bg-[#F8F8F8] mt-5 text-sm flex items-center justify-between">
          <p>Events</p>
          <p>Ticket quantity</p>
        </div>

        <div className="w-full flex items-center space-x-3 mb-8">
          <div className="">
            <input type="checkbox" className=" w-5 h-5 accent-primaryPurple" />
          </div>
          <div className="flex items-center space-x-5 p-3">
            <div className="h-[72px] w-[72px] relative rounded overflow-hidden">
              <Image
                fill
                src="/assets/event.jpeg"
                alt={options[0].title}
                objectFit="cover"
              />
            </div>
            <div>
              <h4 className="font-semibold mb-1">{options[0].title}</h4>
              <p className="text-lightText">{options[0].desc}</p>
              <p className="text-lightText">{options[0].date}</p>
            </div>
          </div>
        </div>

        <h2 className="text-[24px] font-semibold mb-9">Subject</h2>

        <div>
          <label className="text-sm text-gray-800" htmlFor="organizerName">
            Subject title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            // placeholder="Quick description of your Event name"
            className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
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
