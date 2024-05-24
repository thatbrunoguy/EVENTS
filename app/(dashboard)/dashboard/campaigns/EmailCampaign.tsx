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
import { getData } from "@/app/utils/localstorage";
import { EVENTSPARROT_USER } from "@/app/constants";
import PrimaryLoading from "@/app/components/loaders/PrimaryLoading";

const EmailCampaign = () => {
  const activeEvent = getData(EVENTSPARROT_USER)?.activeEvent;

  const { data: emailCampaign, isLoading } = useQuery({
    queryKey: ["email-campaign"],
    queryFn: campaignFn.getEmailCampaigns,
    select: (data) => {
      const selectedCampaign = data.events.map((campaign: any) => {
        const status = campaign?.status === 1 ? "Sent" : "Disabled";
        return {
          id: campaign.id || null,
          name: campaign?.name || null,
          clicked: campaign.analytics.clicked,
          opened: campaign.analytics.opened,
          status,
        };
      });

      return selectedCampaign;
    },
  });

  const { data: emailAnalytics } = useQuery({
    queryFn: campaignFn.getEmailCampaignsAnalytics,
    queryKey: ["email-campaign-analytics"],
  });

  const emailCampaigns = [
    // {
    //   title: "Revenue",
    //   value: "₦0",
    //   icon: <FaMoneyBills color="#D90BD9" />,
    //   background: "#FCEDFC",
    // },
    // {
    //   title: "Ticket Sales",
    //   value: "4",
    //   icon: <FaMoneyBills color="#106BD5" />,
    //   background: "#EDF4FC",
    // },
    {
      title: "Delivered",
      value: (emailAnalytics && emailAnalytics?.delivered) ?? 0,
      icon: <FaMoneyBills color="#CB1C6F" />,
      background: "#FCEDF6",
    },
    {
      title: "Opens",
      value: (emailAnalytics && emailAnalytics?.opened) ?? 0,
      icon: <FaMoneyBills color="#FF5602" />,
      background: "#FCEFE8",
    },
    {
      title: "Clicks",
      value: (emailAnalytics && emailAnalytics?.clicked) ?? 0,
      icon: <FaMoneyBills color="#199FFF" />,
      background: "#F0F7FC",
    },
    {
      title: "Unsubscribed",
      value: (emailAnalytics && emailAnalytics?.unsubscribed) ?? 0,
      icon: <FaMoneyBills color="#B61C9D" />,
      background: "#FCF0FA",
    },
    {
      title: "Bounced",
      value: (emailAnalytics && emailAnalytics.hard_bounced) ?? 0,
      icon: <FaMoneyBills color="#7431B8" />,
      background: "#F5EDFC",
    },
  ];

  if (isLoading) return <PrimaryLoading />;

  return (
    <>
      {!emailCampaign?.length ? (
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
                    Let&apos;s build your email campaign from scratch!✨
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
            {emailCampaigns?.map((item: any, i: number) => (
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
            <div className="w-full overflow-x-scroll">
              <table className="w-full text-xs md:text-sm">
                <thead className="h-[50px]">
                  <tr className="py-3 px-4 bg-[#FBFAFC]">
                    <th className="w-[30%] text-left">Campaigns</th>
                    <th className="text-left">Opened</th>
                    <th className="text-left">Clicked</th>
                    <th className="text-left">Status</th>
                    {/* <th></th> */}
                  </tr>
                </thead>
                <tbody>
                  {emailCampaign?.map((item: any) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-3">
                        <div className="flex items-center space-x-5">
                          <div className="h-[72px] w-[72px] relative rounded overflow-hidden">
                            <Image
                              fill
                              src={activeEvent?.img}
                              alt={activeEvent?.name}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">{item?.name}</h4>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">{item?.opened}</td>
                      <td className="p-3">{item?.clicked}</td>
                      <td>
                        <p
                          className={`p-3 rounded-[15px] w-[100px] text-center  ${
                            item?.status === "Sent"
                              ? "bg-[#EDFCF6] text-[#308760]"
                              : " text-[#df4951]"
                          }`}
                        >
                          {item?.status}
                        </p>
                      </td>
                      {/* <td>
                        <Menu
                          direction="left"
                          menuStyle={{
                            backgroundColor: "white",
                            border: "1px solid #E7E4EB",
                            borderRadius: 8,
                            zIndex: 50,
                            width: 230,
                            height: 240,
                            padding: 6,
                            boxShadow:
                              "0px 4px 6px -2px #88868A0D, 0px 12px 16px -4px #88868A1A",
                          }}
                          // arrow
                          menuButton={
                            <MenuButton style={{ background: "transparent" }}>
                              <div className="text-gray-800 text-xl h-11 w-11 rounded-full hover:bg-gray-100 grid place-content-center cursor-pointer">
                                <IoIosMore />
                              </div>
                            </MenuButton>
                          }
                          transition
                        >
                          <MenuGroup>
                            {actionOptions.map((opt, index) => (
                              <MenuItem
                                className="py-2 cursor-pointer pl-3 hover:bg-lightPurple"
                                key={opt.title}
                              >
                                <div className="flex items-center w-full space-x-3 py-1">
                                  {index === 2 ? (
                                    <>
                                      <div
                                        className={`${
                                          item.status === 2
                                            ? "text-red-500"
                                            : "text-[#706D73]"
                                        } text-base`}
                                      >
                                        {opt.icon}
                                      </div>
                                      <p
                                        className={`${
                                          item.status === 2
                                            ? "text-red-500 "
                                            : "text-[#706D73]"
                                        } text-sm text-center`}
                                      >
                                        {item.status === 1
                                          ? opt.title
                                          : "Make event active"}
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <div className="text-gray-500 text-base">
                                        {opt.icon}
                                      </div>

                                      <p className="text-[#706D73] text-sm text-center">
                                        {opt.title}
                                      </p>
                                    </>
                                  )}
                                </div>
                              </MenuItem>
                            ))}
                          </MenuGroup>
                        </Menu>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailCampaign;
