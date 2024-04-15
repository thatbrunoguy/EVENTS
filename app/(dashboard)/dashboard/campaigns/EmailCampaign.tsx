"use client";

import React, { useState } from "react";
import { GoInfo } from "react-icons/go";
import { FaMoneyBills } from "react-icons/fa6";
import Image from "next/image";
import { HiOutlinePlusSm } from "react-icons/hi";
import Link from "next/link";
import { IoIosMore } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { PiSpeakerHighLight } from "react-icons/pi";
import { campaignFn } from "@/app/utils/endpoints/campaign";
import { useQuery } from "@tanstack/react-query";
import { formatDate, formatTime } from "@/app/helpers";

const emailCampaign = [
  {
    title: "Revenue",
    value: "₦0",
    icon: <FaMoneyBills color="#D90BD9" />,
    background: "#FCEDFC",
  },
  {
    title: "Ticket Sales",
    value: "4",
    icon: <FaMoneyBills color="#106BD5" />,
    background: "#EDF4FC",
  },
  {
    title: "Delivered",
    value: "60",
    icon: <FaMoneyBills color="#CB1C6F" />,
    background: "#FCEDF6",
  },
  {
    title: "Opens",
    value: "65%",
    icon: <FaMoneyBills color="#FF5602" />,
    background: "#FCEFE8",
  },
  {
    title: "Clicks",
    value: "10%",
    icon: <FaMoneyBills color="#199FFF" />,
    background: "#F0F7FC",
  },
  {
    title: "Unsubscribed",
    value: "0%",
    icon: <FaMoneyBills color="#B61C9D" />,
    background: "#FCF0FA",
  },
  {
    title: "Bounced",
    value: "1.7%",
    icon: <FaMoneyBills color="#7431B8" />,
    background: "#F5EDFC",
  },
];

const EmailCampaign = () => {
  const [options, setOptions] = useState<any>([
    // {
    //   title: " Eko convections centre",
    //   opened: "14/20",
    //   clicked: "10%",
    //   status: "sent",
    // },
    // {
    //   title: " Eko convections centre",
    //   opened: "14/20",
    //   clicked: "10%",
    //   status: "sent",
    // },
    // {
    //   title: " Eko convections centre",
    //   opened: "14/20",
    //   clicked: "10%",
    //   status: "sent",
    // },
    // {
    //   title: " Eko convections centre",
    //   opened: "14/20",
    //   clicked: "10%",
    //   status: "sent",
    // },
    // {
    //   title: " Eko convections centre",
    //   opened: "14/20",
    //   clicked: "10%",
    //   status: "sent",
    // },
    // {
    //   title: " Eko convections centre",
    //   opened: "14/20",
    //   clicked: "10%",
    //   status: "sent",
    // },
    // {
    //   title: " Eko convections centre",
    //   opened: "14/20",
    //   clicked: "10%",
    //   status: "sent",
    // },
    // {
    //   title: " Eko convections centre",
    //   opened: "14/20",
    //   clicked: "10%",
    //   status: "sent",
    // },
  ]);

  const { data: adCampaign, isLoading } = useQuery({
    queryKey: ["ad-campaign"],
    queryFn: campaignFn.getEmailCampaigns,
    select: (data) => {
      const selectedCampaign = data.events.map((campaign: any) => {
        const startDate = campaign.start_date
          ? `${formatDate(campaign.start_date)} | ${formatTime(
              campaign.start_date
            )}`
              .split("|")[0]
              .trim()
          : null;
        const endDate = campaign.end_date
          ? `${formatDate(campaign.end_date)} | ${formatTime(
              campaign.end_date
            )}`
              .split("|")[0]
              .trim()
          : null;
        const img = campaign.event.medias[0]?.thumb || null;
        const status = campaign.event.status === 2 ? "Active" : "Disabled";

        return {
          id: campaign.id || null,
          name: campaign.event.name || null,
          startDate,
          img,
          endDate,
          status,
        };
      });

      return selectedCampaign;
    },
  });

  return (
    <>
      {!options.length ? (
        <section className="flex">
          <main className="h-screen flex-1">
            <div className="flex justify-center items-center w-full h-[70%]">
              <div className="w-[351px] flex flex-col items-center">
                <Image
                  src="/assets/email-c.png"
                  alt="Eventparrot logo"
                  width={180}
                  height={180}
                  priority
                />

                <div className="py-5">
                  <p className="pb-2 text-center font-bold">
                    ✨ Your events deserve an audience ✨
                  </p>
                  <p className="text-sm text-lightText">
                    Let's build your email campaign from scratch!✨
                  </p>
                </div>
                <Link
                  href="/dashboard/campaigns/create/email"
                  className="bg-purple-700 py-[10px] px-5 w-[197px] h-[41px] text-white text-sm rounded-lg flex items-center space-x-[4px]"
                >
                  <div>
                    <HiOutlinePlusSm />
                  </div>
                  <p>Start your campaign</p>
                </Link>
              </div>
            </div>
          </main>
        </section>
      ) : (
        <div className="w-[90%] mx-auto mt-14">
          <Swiper
            slidesPerView={"auto"}
            // centeredSlides={true}
            spaceBetween={"5%"}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="h-auto"
            // keyboard={true}
            // mousewheel={true}
            // cssMode={true}
          >
            {emailCampaign.map((item, i) => (
              <SwiperSlide
                key={i}
                style={{ width: "122px" }}
                className=" relative p-4 h-[140px] mb-12 bg-white shadow-lg rounded-e-md  border-[.4px] border-gray-300"
              >
                <div className="absolute cursor-pointer top-4 right-4 text-sm">
                  <GoInfo />
                </div>
                <div
                  style={{ backgroundColor: item.background }}
                  className="h-11 w-11 text-xl rounded-full grid place-content-center"
                >
                  {item.icon}
                </div>

                <p className="font-semibold text-2xl my-2">{item.value}</p>
                <p className="text-sm text-lightText">{item.title}</p>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* TABLE */}

          <div className="w-full mt-10">
            <div className="flex items-center justify-end w-full ">
              {/* <h2 className="font-semibold text-2xl">Events</h2> */}

              <Link
                href="/dashboard/campaigns/create/email"
                className="bg-purple-700 mb-10 ml-auto py-[10px] px-5 w-auto h-[41px] text-white text-sm rounded-lg flex items-center space-x-[4px]"
              >
                <div>
                  <HiOutlinePlusSm />
                </div>
                <p>New Campaign</p>
              </Link>
            </div>
            <div className="">
              <header className="w-full text-sm flex items-center py-3 px-4 bg-[#FBFAFC]">
                <p className="w-[500px]">Campaigns</p>
                <p className="w-[400px]">Opened</p>
                <p className="w-[400px]">Clicked</p>
                <p className="w-[400px]">Status</p>
              </header>
              {options.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex w-full border-b items-center justify-between"
                >
                  <div className="flex items-center space-x-5 p-3 ">
                    <div className="h-[48px] w-[48px] relative rounded overflow-hidden">
                      <Image
                        fill
                        src="/assets/event.jpeg"
                        alt={item.title}
                        className="object-cover"
                      />
                    </div>
                    <div className="w-[30%] text-sm">
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                    </div>
                    <div className="w-[360px]">{item.opened}</div>
                    <div className="w-[310px]">{item.clicked}</div>
                    <div className={`w-[310px] flex items-center`}>
                      <div
                        className={`px-[10px] rounded-[30px] w-auto ${
                          item.status === "sent"
                            ? "text-[#228056] bg-[#EDFCF6]"
                            : "text-red-500 bg-red-200"
                        }`}
                      >
                        {item.status}
                      </div>
                    </div>
                    <div className="text-2xl text-gray-500 cursor-pointer">
                      <IoIosMore />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailCampaign;
