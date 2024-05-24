"use client";

import Image from "next/image";
import Header from "../../../components/header/Header";
import Sidebar from "../../../components/sidebar/Sidebar";
import { HiOutlinePlusSm, HiPencil } from "react-icons/hi";
import Link from "next/link";
import TabsComponent from "../../../components/tabs/Tabs";
import { PiSpeakerHighLight } from "react-icons/pi";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { campaignFn } from "@/app/utils/endpoints/campaign";
import { formatDate, formatTime } from "@/app/helpers";
import PrimaryLoading from "@/app/components/loaders/PrimaryLoading";
import { Menu, MenuButton, MenuGroup, MenuItem } from "@szhsin/react-menu";
import { IoIosMore } from "react-icons/io";
import { FaMoneyBills } from "react-icons/fa6";
import { GoInfo } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import { VscThumbsupFilled } from "react-icons/vsc";
import { LiaVoteYeaSolid } from "react-icons/lia";
import { HiCursorArrowRipple } from "react-icons/hi2";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { BsPersonRolodex } from "react-icons/bs";
import { adminStatus } from "@/app/constants";

const tablist_ = [
  {
    title: "Dashboard",
    isActive: false,
  },
  {
    title: "Email Campaign",
    isActive: false,
  },
  {
    title: "Ads Campaign",
    isActive: true,
  },
];

const actionOptions = [
  {
    icon: <HiPencil />,
    title: "Edit campaign",
  },
];

const statusMap: { [key: number]: string } = {
  1: "pending",
  2: "ongoing",
  3: "blocked",
  4: "done",
};

export default function AdsCampaign() {
  const [tablist, setTablist] = useState([...tablist_]);

  const { data: adCampaign, isLoading } = useQuery({
    queryKey: ["ad-campaign"],
    queryFn: campaignFn.getAdsCampaign,
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
        const img = campaign.event.medias[0]?.original || null;
        const status = campaign.status;

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

  const { data: adsAnalytics } = useQuery({
    queryFn: campaignFn.getAdCampaignsAnalytics,
    queryKey: ["ad-campaign-analytics"],
  });

  const adsCampaign = [
    {
      title: "Impression",
      value: adsAnalytics?.impressions,
      icon: <BsPersonRolodex color="#D90BD9" />,
      background: "#FCEDFC",
    },
    {
      title: "Reach",
      value: adsAnalytics?.reach,
      icon: <VscThumbsupFilled color="#106BD5" />,
      background: "#EDF4FC",
    },
    {
      title: "Page views",
      value: adsAnalytics?.page_views,
      icon: <LiaVoteYeaSolid color="#CB1C6F" />,
      background: "#FCEDF6",
    },
    {
      title: "Sign up",
      value: adsAnalytics?.signups,
      icon: <HiCursorArrowRipple color="#FF5602" />,
      background: "#FCEFE8",
    },
  ];

  if (isLoading) return <PrimaryLoading />;

  return (
    <section className="flex">
      {adCampaign?.length > 0 ? (
        <div className="w-full flex  h-full items-center justify-between ">
          <div className="md:space-x-4 md:px-8 mt-[5%] w-full">
            <div className="w-full mb-14">
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={"5%"}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="h-auto"
              >
                {adsCampaign.map((item, i) => (
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
            </div>
            <Link
              href="/dashboard/campaigns/create/ads"
              className="bg-purple-700 mb-10 ml-auto py-[10px] px-5 w-[160px] h-[41px] text-white text-sm rounded-lg flex items-center space-x-[4px]"
            >
              <div>
                <HiOutlinePlusSm />
              </div>
              <p>New campaign</p>
            </Link>
            <div className="w-full overflow-x-scroll">
              <table className="w-full text-xs md:text-sm">
                <thead className="h-[50px]">
                  <tr className="py-3 px-4 bg-[#FBFAFC]">
                    <th className="w-[30%] text-left">Campaigns</th>
                    <th className="text-left">Start date</th>
                    <th className="text-left">End date</th>
                    <th className="text-left">Status</th>
                    {/* <th></th> */}
                  </tr>
                </thead>
                <tbody>
                  {adCampaign?.map((item: any) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-3">
                        <div className="flex items-center space-x-5">
                          <div className="h-[72px] w-[72px] relative rounded overflow-hidden">
                            <Image
                              fill
                              src={item?.img}
                              alt={item?.name}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">{item?.name}</h4>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">{item?.startDate}</td>
                      <td className="p-3">{item?.endDate}</td>
                      <td>
                        <p
                          className={`p-3 rounded-[15px] w-[100px] text-center  ${
                            item?.status === 4
                              ? "bg-[#EDFCF6] text-[#308760]"
                              : item?.status === 2
                              ? "bg-[#F5EDFC] text-[#802280]"
                              : item?.status === 3
                              ? "text-[#803C19] bg-[#FCEFE8]"
                              : " text-[#df4951]"
                          }`}
                        >
                          {statusMap[item?.status]}
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
      ) : (
        <main className="h-screen flex-1">
          <div className="flex justify-center items-center w-full h-[70%]">
            <div className="w-[351px] flex flex-col items-center">
              <Image
                src="/assets/campaign.svg"
                alt="Eventparrot logo"
                width={180}
                height={180}
                priority
              />
              <p className="py-5 text-center text-lightText w-[80%]">
                ✨ Elevate Your Event! Create Your Campaign Page Now. ✨
              </p>
              <div className="flex space-x-3">
                <div className="text-xl mt-1 text-primaryPurple">
                  <PiSpeakerHighLight />
                </div>
                <p className="text-sm text-lightText">
                  <span className="text-gray-800 font-semibold">
                    Boost awareness{" "}
                  </span>{" "}
                  Boost awareness by displaying your ads to a broader audience.
                </p>
              </div>
              <div className="flex space-x-3 mt-4">
                <div className="text-xl mt-1 text-primaryPurple">
                  <PiSpeakerHighLight />
                </div>
                <p className="text-sm text-lightText">
                  <span className="text-gray-800 font-semibold">
                    Get more people to visit your site
                  </span>{" "}
                  by showing your ad to those who are likely to click.
                </p>
              </div>
              <Link
                href="/dashboard/campaigns/create/ads"
                className="bg-purple-700 py-[10px] mt-8 px-5 w-[197px] h-[41px] text-white text-sm rounded-lg flex items-center space-x-[4px]"
              >
                <div>
                  <HiOutlinePlusSm />
                </div>
                <p>Start your campaign</p>
              </Link>
            </div>
          </div>
        </main>
      )}
    </section>
  );
}
