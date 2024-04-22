"use client";

import React, { useState } from "react";
import Faq from "@/app/components/faq/Faq";
import FileUpload from "@/app/components/fileUpload/FileUpload";
import { BiPencil } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import ReactSelectOptions from "@/app/components/select/ReactSelect";
import ReactQuillEditor from "@/app/components/Reactquill";
import { TransparentButton } from "@/app/components/buttons/button";
import { GoSearch } from "react-icons/go";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import MainFooter from "@/app/components/footer/MainFooter";
import { updateLocalStorageField } from "@/app/utils/localstorage";
import { useRouter } from "next/navigation";
import { Value } from "../CreateAndEditEvent";

const Details = () => {
  const [eventPhoto, setEventPhoto] = useState<any>([]);
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  const [quillValue, setQuillValue] = useState("");

  const [eventDetails, setEventDetails] = useState({
    isEditOrganizerInfo: false,
    isEditEventDetails: false,
    isEditEventLocation: false,
    isEditEventDateAndTime: false,
  });

  const [startDate, setStartDate] = useState<Value>(new Date());
  const [startTime, setStartTime] = useState<any>("10:00");

  const thumbs = eventPhoto.map((file: any) => (
    <div key={file.name}>
      <div>
        <img
          src={file.preview}
          className="w-full h-full object-contain"
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          alt={file.name}
        />
      </div>
    </div>
  ));

  const nextHandler = () => {
    updateLocalStorageField("event-creation", "details", "isComplete", true);

    router.push("/create/ticket");
  };

  const backHandler = () => {
    router.push("/create/basic-info");
  };

  return (
    <section className="mb-20  w-[94%] mx-auto md:w-full   ">
      <p className="text-sm w-full text-gray-700 mb-2">
        Add a photo of your event <span className="text-red-600">*</span>
      </p>
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
          <div>{thumbs}</div>
        </div>
      )}
      <h3 className="text-2xl font-semibold mb-5 mt-16">Preview</h3>

      {/* Organizer&apos;s Information */}

      <div className="">
        {!eventDetails.isEditOrganizerInfo ? (
          <div className=" w-full py-5 border-[.3px] border-gray-300 px-6 shadow-lg rounded-md relative">
            <div
              onClick={() =>
                setEventDetails((prev) => ({
                  ...prev,
                  isEditOrganizerInfo: true,
                }))
              }
              className="absolute -top-3 -right-3 cursor-pointer hover:bg-primaryPurple hover:text-white w-12 h-12 rounded-full text-primaryPurple bg-lightPurple grid place-content-center"
            >
              <BiPencil />
            </div>
            <p className="font-semibold ">Organizer&apos;s Information</p>
            <div className="mt-4  flex items-center justify-between">
              <div className="w-[45%]">
                <p className="text-sm text-lightText">Organizer&apos;s name</p>
                <p>Christian</p>
              </div>
              <div className="w-[45%]">
                <p className="text-sm text-lightText">Phone</p>
                <p>09019089009</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="border-[2px] p-6 border-primaryPurple rounded-md">
            <div className="flex justify-between items-center">
              <h2 className="text-[24px] font-semibold">
                Organizers Information
              </h2>
              <div
                onClick={() =>
                  setEventDetails((prev) => ({
                    ...prev,
                    isEditOrganizerInfo: false,
                  }))
                }
                className="text-2xl cursor-pointer text-gray-700 hover:text-gray-400"
              >
                <FaAngleDown />
              </div>
            </div>

            <p className="text-gray-500 w-[70%] mt-2 mb-9">
              Please provide your full name, email address, and a phone number
              where we can reach you.
            </p>
            <div className="flex items-center space-x-6 ">
              <div className="basis-1/2">
                <label
                  className="text-sm text-gray-800"
                  htmlFor="organizerName"
                >
                  Organizer&apos;s name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
                />
              </div>
              <div className="basis-1/2">
                <label
                  className="text-sm text-gray-800"
                  htmlFor="organizerName"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Event&apos;s Details */}

      <div className="mt-8">
        {!eventDetails.isEditEventDetails ? (
          <div className=" w-full py-5 border-[.3px] border-gray-300 px-6 shadow-lg rounded-md relative ">
            <div
              onClick={() =>
                setEventDetails((prev) => ({
                  ...prev,
                  isEditEventDetails: true,
                }))
              }
              className="absolute -top-3 -right-3 cursor-pointer hover:bg-primaryPurple hover:text-white w-12 h-12 rounded-full text-primaryPurple bg-lightPurple grid place-content-center"
            >
              <BiPencil />
            </div>
            <p className="font-semibold ">Event&apos;s details</p>
            <div className="mt-4">
              <div className="w-[90%]">
                <p className="text-sm text-lightText">Event name</p>
                <p>InnovateXpo 2023: Unleashing Creativity and Technology</p>
              </div>
              <div className="w-full my-4">
                <p className="text-sm text-lightText">Event Info</p>
                <p className="w-full">
                  Join us at InnovateXpo 2023, where innovation takes center
                  stage! Immerse yourself in a dynamic blend of creativity and
                  technology as industry leaders, visionaries, and tech
                  enthusiasts come together for a day of groundbreaking ideas
                  and collaborative exploration. 🚀 Highlights: Engaging Keynote
                  Speakers: Hear from renowned experts pushing the boundaries of
                  innovation in technology, business, and beyond. Interactive
                  Workshops: Dive deep into hands-on workshops covering the
                  latest trends in AI, blockchain, augmented reality, and more.
                  Tech Showcase: Explore cutting-edge products and solutions
                  from innovative companies shaping the future. Networking
                  Opportunities: Connect with like-minded professionals,
                  potential collaborators, and industry influencers. Innovation
                  Awards: Celebrate and be inspired by the trailblazers making a
                  significant impact in the world of technology.
                </p>
              </div>
              <div className="">
                <p className="text-sm text-lightText">Event category</p>
                <p>Business</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="border-[2px] p-6 border-primaryPurple rounded-md pb-12">
            <div className="flex justify-between items-center">
              <h2 className="text-[24px] font-semibold">
                Event&apos;s Details
              </h2>
              <div
                onClick={() =>
                  setEventDetails((prev) => ({
                    ...prev,
                    isEditEventDetails: false,
                  }))
                }
                className="text-2xl cursor-pointer text-gray-700 hover:text-gray-400"
              >
                <FaAngleDown />
              </div>
            </div>
            <p className="text-gray-500 w-[70%] mt-2 mb-9">
              Please provide your full name, email address, and a phone number
              where we can reach you.
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
              <ReactSelectOptions
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                options={[]}
              />
            </div>
            <div className="my-6">
              <label
                className="text-sm block text-gray-800 mb-2"
                htmlFor="organizerName"
              >
                Description of your event{" "}
                <span className="text-red-500">*</span>
              </label>
              <ReactQuillEditor value={quillValue} setValue={setQuillValue} />
            </div>
          </div>
        )}
      </div>

      {/* Events Location */}

      <div className="mt-8">
        {!eventDetails.isEditEventLocation ? (
          <div className=" w-full py-5 border-[.3px] border-gray-300 px-6 shadow-lg rounded-md relative">
            <div
              onClick={() =>
                setEventDetails((prev) => ({
                  ...prev,
                  isEditEventLocation: true,
                }))
              }
              className="absolute -top-3 -right-3 cursor-pointer hover:bg-primaryPurple hover:text-white w-12 h-12 rounded-full text-primaryPurple bg-lightPurple grid place-content-center"
            >
              <BiPencil />
            </div>
            <p className="font-semibold ">Event&apos;s location</p>
            <div className="mt-4">
              <div className="">
                <p className="text-sm text-lightText">Venue Address</p>
                <p>Eko Hotel, Landmark centre</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="border-[2px] p-6 border-primaryPurple rounded-md">
            <div className="flex items-center justify-between">
              <h2 className="text-[24px] font-semibold">
                Event&apos;s Location
              </h2>
              <div
                onClick={() =>
                  setEventDetails((prev) => ({
                    ...prev,
                    isEditEventLocation: false,
                  }))
                }
                className="text-2xl cursor-pointer text-gray-700 hover:text-gray-400"
              >
                <FaAngleDown />
              </div>
            </div>

            <p className="text-gray-500 w-[70%] mt-2 mb-9">
              Specify the venue name and address, including any relevant room
              numbers
            </p>
            <div className="mt-9 mb-6 flex items-center space-x-6">
              <div className="basis-1/2">
                <TransparentButton title="Venue" />
              </div>
              <div className="basis-1/2">
                <TransparentButton title="Online Event" />
              </div>
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
        )}
      </div>

      {/* Date and Time */}

      <div className="mt-8">
        {!eventDetails.isEditEventDateAndTime ? (
          <div className=" w-full py-5 border-[.3px] border-gray-300 px-6 shadow-lg rounded-md relative">
            <div
              onClick={() =>
                setEventDetails((prev) => ({
                  ...prev,
                  isEditEventDateAndTime: true,
                }))
              }
              className="absolute -top-3 -right-3 cursor-pointer hover:bg-primaryPurple hover:text-white w-12 h-12 rounded-full text-primaryPurple bg-lightPurple grid place-content-center"
            >
              <BiPencil />
            </div>
            <p className="font-semibold ">Date and time</p>
            <div className="mt-4  flex items-center justify-between">
              <div className="w-[45%]">
                <p className="text-sm text-lightText">Event start date</p>
                <p>18th December 2023</p>
              </div>
              <div className="w-[45%]">
                <p className="text-sm text-lightText">Event start time</p>
                <p>10:00am</p>
              </div>
            </div>
            <div className="mt-4  flex items-center justify-between">
              <div className="w-[45%]">
                <p className="text-sm text-lightText">Event end date</p>
                <p>25th December 2023</p>
              </div>
              <div className="w-[45%]">
                <p className="text-sm text-lightText">Event end time</p>
                <p>3:00pm</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-12 border-[2px] p-6 border-primaryPurple rounded-md">
            <div className="flex items-center justify-between">
              <h2 className="text-[24px] font-semibold">Date and Time</h2>
              <div
                onClick={() =>
                  setEventDetails((prev) => ({
                    ...prev,
                    isEditEventDateAndTime: false,
                  }))
                }
                className="text-2xl cursor-pointer text-gray-700 hover:text-gray-400"
              >
                <FaAngleDown />
              </div>
            </div>
            <p className="text-gray-500 w-[70%] mt-2 mb-9">
              Indicate the exact date and time your event will take place,
              including the start and end time
            </p>
            <p className="text-sm mt-[36px] mb-6">
              Think of a special event. It happens once and goes on for many
              days
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
        )}
      </div>
      {/* Add FAQ */}
      {/* <Faq /> */}
      <MainFooter backHandler={backHandler} nextHandler={nextHandler} />
    </section>
  );
};

export default Details;
