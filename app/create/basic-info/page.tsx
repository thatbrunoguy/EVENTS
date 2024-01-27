"use client";

import ReactQuillEditor from "@/app/components/Reactquill";
import { TransparentButton } from "@/app/components/buttons/button";
import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import TimePicker from "react-time-picker";
import DatePicker from "react-date-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import ReactSelectOptions from "../../components/select/ReactSelect";
import MainFooter from "@/app/components/footer/MainFooter";
import { storeData } from "@/app/utils/localstorage";
import { useRouter } from "next/navigation";
const regRequirements = [
  { title: "First name" },
  { title: "Last name" },
  { title: "Email" },
  { title: "Phone Number" },
  { title: "Job title" },
  { title: "Company" },
  { title: "Address" },
];

export const options = [
  { value: "artAndCulture", label: "Arts & Culture" },
  { value: "business", label: "Business" },
  { value: "career", label: "Career" },
  { value: "charityAndAid", label: "Charity & Aid" },
  { value: "childrenAndYouth", label: "Children & Youth" },
  { value: "community", label: "Community" },
  { value: "fashionAndDesign", label: "Fashion & Design" },
  { value: "foodAndDrink", label: "Food & Drink" },
  { value: "government", label: "Government" },
  { value: "investments", label: "Investments" },
  { value: "mediaAndFilm", label: "Media & Film" },
  { value: "musicAndPerformances", label: "Music & Performances" },
  { value: "schoolsAndEducation", label: "Schools & Education" },
  { value: "spiritualityAndReligion", label: "Spirituality & Religion" },
  { value: "sportsAndFitness", label: "Sports & Fitness" },
  { value: "startupsAndSmallBusiness", label: "Startups & Small Business" },
  { value: "technologyAndScience", label: "Technology & Science" },
];
type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

const BasicInfo = () => {
  const [startDate, setStartDate] = useState<Value>(new Date());
  const [startTime, setStartTime] = useState<any>("10:00");
  const router = useRouter();

  const nextHandler = () => {
    storeData("event-creation", [
      {
        title: "Basic info",
        path: "basic-info",
        isComplete: true,
        isActive: false,
      },
      { title: "Details", path: "details", isComplete: false, isActive: false },
      {
        title: "Basic Tickets",
        path: "ticket",
        isComplete: false,
        isActive: false,
      },
    ]);

    router.push("/create/details");
  };
  const backHandler = () => {
    router.push("/event");
  };

  return (
    <div className="w-[94%] mx-auto  mb-20 ">
      <div>
        <h2 className="text-[24px] font-semibold">Organizers Information</h2>
        <p className="text-gray-500 w-[70%] mt-2 mb-9">
          Please provide your full name, email address, and a phone number where
          we can reach you.
        </p>
        <div className="flex flex-col gap-6 md:flex-row items-center  ">
          <div className="w-full md:basis-1/2">
            <label className="text-sm text-gray-800" htmlFor="organizerName">
              Organizer's name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            />
          </div>
          <div className="w-full md:basis-1/2">
            <label className="text-sm text-gray-800" htmlFor="organizerName">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            />
          </div>
        </div>
      </div>

      <hr className="my-8" />

      <div>
        <h2 className="text-[24px] font-semibold">Event's Details</h2>
        <p className="text-gray-500 w-[90%] md:w-[70%] mt-2 mb-9">
          Please provide your full name, email address, and a phone number where
          we can reach you.
        </p>
        <div>
          <label className="text-sm text-gray-800" htmlFor="organizerName">
            Event name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Quick description of your Event name"
            className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
          />
        </div>
        <div className="my-6">
          <label
            className="text-sm mb-2 block text-gray-800"
            htmlFor="organizerName"
          >
            Event Category <span className="text-red-500">*</span>
          </label>
          {/* <input
            type="text"
            placeholder="Select category"
            className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
          /> */}
          <ReactSelectOptions options={options} />
        </div>
        <div className="my-6 ">
          <label
            className="text-sm block text-gray-800 mb-2"
            htmlFor="organizerName"
          >
            Description of your event <span className="text-red-500">*</span>
          </label>
          <ReactQuillEditor />
        </div>
      </div>

      <hr className="my-8 " />

      <div>
        <h2 className="text-[24px] font-semibold">Event's Location</h2>
        <p className="text-gray-500 w-[70%] mt-2 mb-9">
          Specify the venue name and address, including any relevant room
          numbers
        </p>
        <div className="mt-9 mb-6 flex items-center space-x-6">
          <TransparentButton title="Venue" />
          <TransparentButton title="Online Event" />
        </div>
        <label className="text-sm text-gray-800" htmlFor="organizerName">
          Venue Location <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center space-x-2 h-[56px] focus-within:border-2 focus-within:border-primaryPurple text-sm w-full text-gray-600 px-3 mt-2  bg-[#F8F8F8] rounded-lg outline-primaryPurple">
          <label htmlFor="search">
            <GoSearch />
          </label>
          <input
            id="search"
            type="text"
            placeholder="Location"
            className="block bg-transparent w-full h-full outline-none border-none"
          />
        </div>
      </div>

      <hr className="my-6" />

      <div className="mb-12">
        <h2 className="text-[24px] font-semibold">Date and Time</h2>
        <p className="text-gray-500 w-[70%] mt-2 mb-9">
          Indicate the exact date and time your event will take place, including
          the start and end time
        </p>
        <p className="text-sm mt-[36px] mb-6">
          Think of a special event. It happens once and goes on for many days
        </p>
        <div className="flex items-center space-x-6">
          <div className="basis-1/2">
            <label
              className="text-sm mb-2 block text-gray-800"
              htmlFor="organizerName"
            >
              Event start date <span className="text-red-500">*</span>
            </label>
            <div>
              <DatePicker
                className="outline-green-500"
                onChange={setStartDate}
                value={startDate}
              />
            </div>
            {/* <input
              type="text"
              className="h-[56px] text-sm w-[338px] text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            /> */}
          </div>
          <div className="basis-1/2">
            <label
              className="text-sm mb-2 block text-gray-800"
              htmlFor="organizerName"
            >
              Event start time <span className="text-red-500">*</span>
            </label>
            <div>
              <TimePicker onChange={setStartTime} value={startTime} />
            </div>

            {/* <input
              type="text"
              className="h-[56px] text-sm w-[338px] text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            /> */}
          </div>
        </div>
        <div className="flex items-center space-x-6 mt-6">
          <div className="basis-1/2">
            <label
              className="text-sm block mb-2 text-gray-800"
              htmlFor="organizerName"
            >
              Event end date <span className="text-red-500">*</span>
            </label>
            <div>
              <DatePicker onChange={setStartDate} value={startDate} />
            </div>
            {/* <input
              type="text"
              className="h-[56px] text-sm w-[338px] text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            /> */}
          </div>
          <div className="basis-1/2">
            <label
              className="text-sm block mb-2 text-gray-800"
              htmlFor="organizerName"
            >
              Event end time <span className="text-red-500">*</span>
            </label>
            <div>
              <TimePicker onChange={setStartTime} value={startTime} />
            </div>
            {/* <input
              type="text"
              className="h-[56px] text-sm w-[338px] text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            /> */}
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-[24px] font-semibold">Registration Requirements</h2>
        <p className="text-gray-500 w-[70%] mt-2 mb-9">
          Which fields do you require the event registrants to provide?
        </p>
        <div className="grid grid-cols-2 gap-y-9">
          {regRequirements.map((item) => (
            <div key={item.title} className="flex space-x-3 ">
              <div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="accent-primaryPurple"
                />
              </div>
              <div>
                {item.title}
                <p className="text-lightText">Get attendee {item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MainFooter nextHandler={nextHandler} backHandler={backHandler} />
    </div>
  );
};

export default BasicInfo;
