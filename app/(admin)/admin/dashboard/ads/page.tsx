"use client";

import AdminSidebar from "@/app/components/sidebar/AdminSidebar";
import { TabsComponent2 } from "@/app/components/tabs/Tabs";
import { adsFn } from "@/app/utils/endpoints/admin";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import StatisticsModal from "./StatisticsModal";
import PreviewModal from "./PreviewModal";

const tablist_ = [
  {
    title: "New (78)",
    isActive: true,
  },
  {
    title: "Ongoing (24",
    isActive: false,
  },
  {
    title: "Done (7)",
    isActive: false,
  },
  {
    title: "Blocked (7)",
    isActive: false,
  },
];

const StatusRender = (status: any) => {
  return (
    <div className="flex items-center gap-3">
      <button className="text-sm font-medium p-2 rounded-xl text-[#CB1C6F] bg-[#FCEDF6] flex items-center justify-center">
        New
      </button>

      <BiChevronDown size={20} />
    </div>
  );
};

const AdsCampaign = () => {
  const [tablist, setTablist] = useState([...tablist_]);
  const [openStatisticsModal, setOpenStatisticsModal] =
    useState<boolean>(false);
  const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);

  // const { data: adsCampaign } = useQuery({
  //   queryKey: ["admin-ads-campaign"],
  //   queryFn: adsFn.getCampaigns,
  // });

  return (
    <section className="flex max-w-[100vw]">
      <AdminSidebar />

      <main className="w-full">
        <div className="h-10 w-full border-b border-[#eaeaea]"></div>
        <div className="xl:w-[60%] mt-5">
          <TabsComponent2 tablist={tablist} setTablist={setTablist} />
        </div>
        <div className="w-[95%] mx-auto overflow-x-scroll">
          <table className="w-full md:min-w-[1200px] text-xs md:text-sm mt-4 ">
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
              <tr>
                <td>24/09/2024</td>
                <td>
                  <div className="flex flex-col">
                    <p className="text-sm">oniademola001@gmail.com</p>
                    <a className="bg-lightPurple text-primaryPurple p-2 w-[100px] flex justify-center items-center rounded-lg gap-3 cursor-pointer">
                      Send email
                    </a>
                  </div>
                </td>
                <td>
                  <div className="flex gap-3 items-center">
                    <p>Eko convention centre</p>
                    <BiChevronDown size={20} />
                  </div>
                </td>
                <td>22/09/2024 | 07:00pm</td>
                <td>22/09/2024 | 07:00pm</td>
                <td>200</td>
                <td>
                  <div className="flex gap-3 items-center">
                    <img
                      src="/assets/banner-detail.png"
                      className="h-[72px] w-[72px] rounded-lg"
                      alt=""
                    />
                    <button className="bg-lightPurple text-primaryPurple p-2 w-[100px] flex justify-center items-center rounded-lg gap-3 cursor-pointer">
                      Download
                    </button>
                  </div>
                </td>
                <td>
                  <StatusRender status="new" />
                </td>
                <td>
                  <div
                    onClick={() => {
                      setOpenPreviewModal(true);
                    }}
                    className="text-sm font-semibold text-primaryPurple cursor-pointer"
                  >
                    view
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      {openStatisticsModal && (
        <StatisticsModal setIsModalOpen={setOpenStatisticsModal} />
      )}

      {openPreviewModal && (
        <PreviewModal setIsModalOpen={setOpenPreviewModal} />
      )}
    </section>
  );
};

export default AdsCampaign;
