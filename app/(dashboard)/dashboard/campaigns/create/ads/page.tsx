"use client";

import { BsPersonCheck } from "react-icons/bs";
import { MdAdsClick } from "react-icons/md";
import { PiSpeakerHigh } from "react-icons/pi";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoChevronDown, IoClose } from "react-icons/io5";
import { MdInfo } from "react-icons/md";
import DatePicker from "react-date-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
// import { Value } from "@/app/(dashboard)/dashboard/create/basic-info/page";
import Faq from "../Faq";
import { FaMinus, FaPlus } from "react-icons/fa6";
import BuyTokenModal from "./BuyTokenModal";
import {
  authFunctions,
  eventsManagamentFunctions,
} from "@/app/utils/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDate, formatDateTime, formatTime } from "@/app/helpers";
import { EventData } from "../../../event/page";
import PrimaryLoading from "@/app/components/loaders/PrimaryLoading";
import GoogleLocationSearch from "@/app/components/googleLocationSearch";
import { campaignFn } from "@/app/utils/endpoints/campaign";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { countries } from "@/app/utils/countries";
import { Value } from "../../../create/CreateAndEditEvent";

const CreateAdsCampaign = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState<Value>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationValue, setLocationValue] = useState<null | any>(null);
  const [cityValue, setCityValue] = useState<null | any>(null);
  const [tokenAmount, setTokenAmount] = useState(0);

  const queryClient = useQueryClient();

  //get events
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

  //user token
  const { data: userToken } = useQuery({
    queryKey: ["getToken"],
    queryFn: authFunctions.getUserToken,
    select: (data) => {
      return {
        currency: data.currency,
        token_balance: data.token_balance,
      };
    },
  });

  const createAdsCampaign = useMutation({
    mutationFn: campaignFn.createAdsCampaign,
    onError: async (error: string) => {
      toast.error(error);
    },
    onSuccess: async (data) => {
      // Boom baby!
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["ad-campaign"] });
      router.push("/dashboard/campaigns");
    },
  });

  const [selectedEvent, setSelectedEvent] = useState(events && events[0]);
  const [data, setData] = useState({
    objective: "",
    start_date: "",
    end_date: "",
    target_country: "",
    target_city: "",
    token: 0,
  });

  const submitCreateEvent = async () => {
    if (data.token < 5) {
      toast.error("Campaign cannot be created with token less than 5");
      return;
    }
    createAdsCampaign.mutate({ eventId: selectedEvent.id, body: data });
  };

  //update start date
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      start_date: formatDateTime(startDate),
    }));
  }, [startDate]);

  //update end date
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      end_date: formatDateTime(endDate),
    }));
  }, [endDate]);

  //update country location
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      target_country: locationValue?.label,
    }));
  }, [locationValue]);

  //update city location
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      target_city: cityValue?.label,
    }));
  }, [cityValue]);

  //update user t
  useEffect(() => {
    if (userToken?.token_balance < data.token) {
      setTokenAmount(data?.token - userToken?.token_balance);
    }
  }, [userToken, data.token]);

  const disableButton =
    data.token < 5 ||
    !data.objective ||
    !data.end_date ||
    !data.start_date ||
    !data.target_city ||
    !data.target_country;

  console.log("data", data);

  if (isLoading) {
    return <PrimaryLoading />;
  }

  return (
    <section className="w-full min-h-screen flex">
      {isModalOpen && (
        <BuyTokenModal
          setIsModalOpen={setIsModalOpen}
          tokenAmount={tokenAmount}
        />
      )}

      <div className="p-2 py-4 md:p-12 bg-white w-full md:basis-[55%]">
        <h3 className="font-semibold text-xl mb-2">📢 Eventparrot Ads</h3>
        <p className="text-sm">
          You&apos;re on the verge of promoting on our worldwide marketplace,
          where millions actively seek exciting activities! Benefit from premium
          event placement and enhance your ticket sales.
        </p>

        <div className="mt-9 border-[0.5px] p-2 md:p-5 rounded-md">
          <h3 className="">Select an Event</h3>
          <Menu
            className="w-full"
            direction="bottom"
            // arrow
            align="start"
            menuButton={
              <MenuButton style={{ background: "transparent" }}>
                <div className="border px-3 py-3 flex items-center mt-6 md:h-[104px] justify-between shadow-lg rounded-lg w-full md:w-[624px] bg-white">
                  <div className="flex items-center space-x-5 p-3 ">
                    <div className="h-[72px] w-[72px] relative rounded overflow-hidden">
                      <Image
                        fill
                        src={selectedEvent?.img}
                        alt={selectedEvent?.name}
                        objectFit="cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">
                        {selectedEvent?.name}
                      </h4>
                      <p className="text-lightText">{selectedEvent?.desc}</p>
                      <p className="text-lightText">
                        {selectedEvent?.startDate}
                      </p>
                    </div>
                  </div>
                  <div className="text-xl">
                    <IoChevronDown />
                  </div>
                </div>
              </MenuButton>
            }
            transition
          >
            <div className="shadow-xl mt-6  bg-white">
              {events?.map((item: any, index: number) => (
                <MenuItem
                  className="hover:bg-gray-100 hover:border-b cursor-pointer"
                  key={index}
                  onClick={() => setSelectedEvent(item)}
                >
                  <div className="flex items-center w-full md:w-[575px] space-x-3 md:space-x-5 md:p-3 ">
                    <div className="h-[42px] md:h-[72px] w-[42px] md:w-[72px] relative rounded overflow-hidden">
                      <Image
                        fill
                        src={item.img}
                        alt={item.name}
                        objectFit="cover"
                      />
                    </div>
                    <div className="w-full">
                      <h4 className="font-semibold mb-1">{item.name}</h4>
                      <p className="text-lightText">{item.desc}</p>
                      <p className="text-lightText">{item.startDate}</p>
                    </div>
                  </div>
                </MenuItem>
              ))}
            </div>
          </Menu>
        </div>

        {/* Set an objective */}
        <div className="w-full mt-9 h-auto border rounded-md p-5">
          <h4 className="text-lg">Set an Objective</h4>

          {/* --- */}
          <div className="mt-6 flex items-center justify-between py-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="text-primaryPurple">
                <BsPersonCheck />
              </div>
              <p>Get Registrations</p>
            </div>
            <div>
              <input
                type="radio"
                className="block w-5 h-5 cursor-pointer accent-primaryPurple"
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    objective: "Get registrations",
                  }))
                }
                checked={data.objective === "Get registrations"}
              />
            </div>
          </div>

          {/* --- */}
          <div className="mt-6 flex items-center justify-between py-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="text-primaryPurple">
                <MdAdsClick />
              </div>
              <p>Drive traffic</p>
            </div>
            <div>
              <input
                type="radio"
                className="block w-5 h-5 cursor-pointer accent-primaryPurple"
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    objective: "Drive traffic",
                  }))
                }
                checked={data.objective === "Drive traffic"}
              />
            </div>
          </div>

          {/* --- */}
          <div className="mt-6 flex items-center justify-between py-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="text-primaryPurple">
                <PiSpeakerHigh />
              </div>
              <p>Increase awareness</p>
            </div>
            <div>
              <input
                type="radio"
                className="block w-5 h-5 cursor-pointer accent-primaryPurple"
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    objective: "Increase awareness",
                  }))
                }
                checked={data.objective === "Increase awareness"}
              />
            </div>
          </div>
        </div>

        {/* ----- */}

        <div className="w-full mt-9 h-auto border rounded-md p-5">
          <h4 className="text-lg">Build your ad</h4>
          <p className="mt-4">Duration</p>
          <div className="flex items-center w-full space-x-6 mt-4">
            <div className="basis-1/2">
              <label
                className="text-sm block mb-2 text-gray-800"
                htmlFor="organizerName"
              >
                Event start date <span className="text-red-500">*</span>
              </label>
              <div>
                <DatePicker
                  minDate={new Date()}
                  onChange={setStartDate}
                  value={startDate}
                />
              </div>
            </div>
            <div className="basis-1/2">
              <label
                className="text-sm block mb-2 text-gray-800"
                htmlFor="organizerName"
              >
                Event end date <span className="text-red-500">*</span>
              </label>
              <div>
                <DatePicker onChange={setEndDate} value={endDate} />
              </div>
            </div>
          </div>
        </div>

        {/* ----- */}

        <div className="w-full mt-9 h-auto border rounded-md p-5">
          <h4 className="text-lg">Target Location</h4>

          <div className="flex items-center w-full space-x-6 mt-2">
            <div className="my-6 basis-1/2">
              <GoogleLocationSearch
                label="Country"
                value={locationValue}
                setValue={setLocationValue}
                apiOptions={{
                  types: ["country"],
                  componentRestrictions: {
                    types: ["geocode", "political"],
                  },
                }}
              />
            </div>
            <div className="my-6 basis-1/2">
              <GoogleLocationSearch
                label="City"
                value={cityValue}
                setValue={setCityValue}
                apiOptions={{
                  types: ["geocode"],
                  componentRestrictions: {
                    types: ["country", "locality", "political"],
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* -----BUY TOKEN---- */}

        <div className="w-full relative mt-9 h-auto border rounded-md p-5">
          {userToken?.token_balance > 0 && (
            <div className=" w-full hover:bg-[#FF5602] group flex items-center justify-between  rounded-md px-4 hover:text-white bg-[#FCEFE8] text-xs h-9 ">
              <div className="flex items-center space-x-2">
                <div className="text-xl text-[#FF5602] group-hover:text-white">
                  <MdInfo />
                </div>
                <p>You have {userToken?.token_balance} Tokens</p>
              </div>
              <IoClose className="text-xl cursor-pointer" />
            </div>
          )}
          <div className="my-6">
            <h4 className="text-lg">Tokens</h4>
            <p className="text-lightText text-sm">Buy some token</p>
          </div>

          <div className="flex items-center w-full space-x-6 my-6">
            <div className="bg-[#F8F8F8] flex items-center justify-between px-7 h-14 flex-1">
              <p>{data?.token}</p>
              <p>Tokens</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    token: Math.max(prev.token - 1, 0),
                  }))
                }
                className="w-14 h-14 bg-lightPurple hover:bg-primaryPurple hover:text-white text-primaryPurple rounded-md grid place-content-center"
              >
                <p>
                  <FaMinus />
                </p>
              </button>
              <button
                onClick={() =>
                  setData((prev) => ({ ...prev, token: prev.token + 1 }))
                }
                className="w-14 h-14 bg-lightPurple hover:bg-primaryPurple hover:text-white text-primaryPurple rounded-md grid place-content-center"
              >
                <p>
                  <FaPlus />
                </p>
              </button>
            </div>
          </div>
          {userToken?.token_balance < 5 ||
          userToken?.token_balance < data.token ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-primaryPurple w-full bg-lightPurple grid place-content-center h-10 rounded-md hover:bg-primaryPurple hover:text-white"
            >
              <p>Buy</p>
            </button>
          ) : (
            <button
              onClick={submitCreateEvent}
              className="text-primaryPurple w-full bg-lightPurple grid place-content-center h-10 rounded-md hover:bg-primaryPurple hover:text-white"
              disabled={disableButton}
            >
              <p>Submit Campaign</p>
            </button>
          )}
        </div>
      </div>

      {/* RIGHT */}

      <div className="basis-[45%] hidden md:block min-h-screen p-12 bg-gray-100">
        <div>
          <h4 className="text-xl w-full font-semibold">Preview</h4>

          <div className="flex items-center bg-white w-full mt-6 mb-12 border-[.4px] rounded-md space-x-6 shadow-xl p-5 ">
            <div className="h-[102px] w-[146px] relative rounded overflow-hidden">
              <Image
                fill
                src={selectedEvent?.img}
                alt={selectedEvent?.name}
                objectFit="cover"
              />
            </div>
            <div>
              <p className="text-[#7431B8] text-sm">Promoted</p>
              <h4 className="font-semibold mb-1">{selectedEvent?.name}</h4>
              <p className="text-lightText">{selectedEvent?.desc}</p>
              <p className="text-lightText">{selectedEvent?.startDate}</p>
            </div>
          </div>

          {/* FAQS */}

          <div>
            <h4 className=" text-xl w-full font-semibold">Faqs</h4>
            <div>
              <Faq />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateAdsCampaign;
