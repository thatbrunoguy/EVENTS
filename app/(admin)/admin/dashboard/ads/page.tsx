"use client";

import AdminSidebar from "@/app/components/sidebar/AdminSidebar";
import { TabsComponent2 } from "@/app/components/tabs/Tabs";
import { adsFn } from "@/app/utils/endpoints/admin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import StatisticsModal from "./StatisticsModal";
import PreviewModal from "./PreviewModal";
import { formatDate, formatTime } from "@/app/helpers";
import moment from "moment";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { adminStatus } from "@/app/constants";
import PrimaryLoading from "@/app/components/loaders/PrimaryLoading";

type StatusRenderProps = {
  status: number;
  updateStatus?: any;
  campaignId: string;
};

const StatusRender = ({
  status,
  updateStatus,
  campaignId,
}: StatusRenderProps) => {
  const statusObj = [
    { name: "New", value: 1, className: "text-[#CB1C6F] bg-[#FCEDF6]" },
    { name: "Start", value: 2, className: "text-[#039855] bg-[#EDFCF6]" },
    { name: "End", value: 4, className: "text-[#D90BD9] bg-[#FCEDFC]" },
    { name: "Blocked", value: 3, className: "text-[#CC0000] bg-[#FCEDED]" },
  ];

  const activeStat = useMemo(() => {
    return statusObj.find((stat) => stat.value === status);
  }, [status]);

  return (
    <Menu
      menuButton={
        <MenuButton className="flex items-center gap-3">
          <p
            className={`text-sm font-medium p-2 rounded-xl ${activeStat?.className}  flex items-center justify-center capitalize`}
          >
            {adminStatus[status]}
          </p>
          <BiChevronDown size={20} />
        </MenuButton>
      }
      transition
    >
      {statusObj.map((item) => (
        <MenuItem
          value={item.value}
          onClick={() => updateStatus(campaignId, item.value)}
          className="flex items-center gap-3"
        >
          <p
            className={`text-sm font-medium p-2 rounded-xl ${item.className}  flex items-center justify-center w-[100px] capitalize`}
          >
            {item.name}
          </p>
          {status === item.value && <img src="/assets/done.svg" alt="." />}
        </MenuItem>
      ))}
    </Menu>
  );
};

const AdsCampaign = () => {
  const [tablist, setTablist] = useState([
    {
      title: "New",
      isActive: true,
      status: 1,
    },
    {
      title: "Ongoing",
      isActive: false,
      status: 2,
    },
    {
      title: "Done",
      isActive: false,
      status: 4,
    },
    {
      title: "Blocked",
      isActive: false,
      status: 3,
    },
  ]);
  const [openStatisticsModal, setOpenStatisticsModal] =
    useState<boolean>(false);
  const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);
  const [selectedCampaign, setSelectedCampaign] = useState({});
  const [filter, setFilter] = useState({ status: 1 });
  const queryClient = useQueryClient();

  const {
    data: adsCampaign,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-ads-campaign"],
    queryFn: () => adsFn.getCampaigns(filter),
    select: (data) => {
      const selectedCampaign = data.events.map((campaign: any) => {
        const startDate = campaign.start_date
          ? `${formatDate(campaign.start_date)} | ${formatTime(
              campaign.start_date
            )}`
          : null;
        const endDate = campaign.end_date
          ? `${formatDate(campaign.end_date)} | ${formatTime(
              campaign.end_date
            )}`
          : null;
        const img = campaign.event.medias[0]?.original || null;
        const status = campaign.status;
        const targetCity = campaign.target_city;
        const targetCountry = campaign.target_country;
        const submissionDate = moment(campaign.created_at).format("YYYY-MM-DD");
        const address = campaign.event.address;
        const email = campaign.event.account.owner[0].email;

        return {
          id: campaign.id || null,
          name: campaign.event.name || null,
          submissionDate,
          startDate,
          img,
          endDate,
          status,
          targetCity,
          targetCountry,
          token: campaign.token || null,
          address,
          email,
        };
      });

      return selectedCampaign;
    },
  });

  const updateCampaign = useMutation({
    mutationFn: adsFn.updateCampaign,
    onError: async (error, variables, context) => {},
    onSuccess: async (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["admin-ads-campaign"] });
    },
  });

  //handles status update
  const handleUpdate = (campaignId: any, status: any) => {
    updateCampaign.mutate({ campaignId, status });
  };

  //handle tab switching
  const handleClick = (index: number, item: any) => {
    setTablist((prevTablist) => {
      const updatedTablist = prevTablist.map((item, idx) => {
        if (idx === index) {
          return { ...item, isActive: true };
        } else {
          return { ...item, isActive: false };
        }
      });
      setFilter((prev) => ({ ...prev, status: item.status }));
      return updatedTablist;
    });
  };

  //refetch the getAdCampaign when filter changes
  useEffect(() => {
    refetch();
  }, [filter]);

  if (isLoading) return <PrimaryLoading />;

  return (
    <section className="flex">
      <AdminSidebar />

      <main className="h-screen w-full relative overflow-y-auto overflow-x-auto md:overflow-x-hidden">
        <div className="h-10 w-full border-b border-[#eaeaea]"></div>
        <div className="xl:w-[60%] mt-5 sticky top-0 bg-white">
          <div>
            <div className="flex items-center text-center border-b">
              {tablist.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleClick(index, item)}
                  className={`${
                    item.isActive
                      ? "border-b-[2px] border-primaryPurple  text-primaryPurple"
                      : "border-none text-lightText"
                  } cursor-pointer md:px-4 py-4 transition-all basis-1/2 duration-300 ease-in-out text-xs md:text-base `}
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[95%] mx-auto overflow-x-scroll overflow-y-auto">
          <table className="w-full md:min-w-[1200px] text-xs md:text-sm mt-4">
            <thead className="h-[50px] font-normal">
              <tr className="py-3 px-4 bg-[#FBFAFC]">
                <th className="text-left font-normal">Date submitted</th>
                <th className="text-left font-normal">Client email</th>
                <th className="text-left font-normal">Event</th>
                <th className="text-left font-normal">Campaign start date</th>
                <th className="text-left font-normal">Campaign end date</th>
                <th className="text-left font-normal">Token</th>
                <th className="text-left font-normal">Images</th>
                <th className="text-left font-normal">Status</th>
                <th className="text-left font-normal"></th>
              </tr>
            </thead>
            <tbody>
              {adsCampaign?.map((ads: any, index: number) => (
                <tr key={index} className="bg-white border-b border-[#eaeaea]">
                  <td className="py-4">{ads?.submissionDate}</td>
                  <td className="py-4">
                    <div className="flex flex-col">
                      <p className="text-sm">{ads?.email}</p>
                      <a
                        href={`mailto:${ads?.email}`}
                        className="bg-lightPurple text-primaryPurple hover:text-lightPurple hover:bg-primaryPurple p-2 w-[100px] flex justify-center items-center rounded-lg gap-3 cursor-pointer"
                      >
                        Send email
                      </a>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex gap-3 items-center">
                      <p>{ads.name}</p>
                      {/* <BiChevronDown size={20} /> */}
                    </div>
                  </td>
                  <td className="py-4">{ads?.startDate}</td>
                  <td className="py-4">{ads.endDate}</td>
                  <td className="py-4">{ads.token}</td>
                  <td className="py-4">
                    <div className="flex gap-3 items-center">
                      <img
                        src={ads?.img}
                        className="h-[72px] w-[72px] rounded-lg"
                        alt={ads.name}
                      />
                      <a
                        href={ads.img}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-lightPurple text-primaryPurple hover:text-lightPurple hover:bg-primaryPurple p-2 w-[100px] flex justify-center items-center rounded-lg gap-3 cursor-pointer"
                      >
                        Download
                      </a>
                    </div>
                  </td>
                  <td className="py-4">
                    <StatusRender
                      status={ads?.status}
                      updateStatus={handleUpdate}
                      campaignId={ads?.id}
                    />
                  </td>
                  <td className="py-4">
                    <div
                      onClick={() => {
                        setSelectedCampaign(ads);
                        setOpenPreviewModal(true);
                      }}
                      className="text-sm font-semibold text-primaryPurple cursor-pointer"
                    >
                      view
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      {openStatisticsModal && (
        <StatisticsModal setIsModalOpen={setOpenStatisticsModal} />
      )}

      {openPreviewModal && (
        <PreviewModal
          setIsModalOpen={setOpenPreviewModal}
          selectedOrder={selectedCampaign}
        />
      )}
    </section>
  );
};

export default AdsCampaign;
