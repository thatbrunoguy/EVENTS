"use client";

import AdminSidebar from "@/app/components/sidebar/AdminSidebar";
import { TabsComponent2 } from "@/app/components/tabs/Tabs";
import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

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
  console.log(status);
  return (
    <div className="flex gap-3">
      {status === "new" ? (
        <button className="text-sm text-[CB1C6F] bg-[#FCEDF6] flex items-center justify-center">
          New
        </button>
      ) : null}

      <BiChevronDown size={20} />
    </div>
  );
};

const AdsCampaign = () => {
  const [tablist, setTablist] = useState([...tablist_]);
  return (
    <section className="flex">
      <AdminSidebar />

      <main className="w-full">
        <div className="h-10 w-full border-b border-[#eaeaea]"></div>
        <div className="xl:w-[60%] mt-5">
          <TabsComponent2 tablist={tablist} setTablist={setTablist} />
        </div>
        <div className="w-[95%] mx-auto">
          <table className="w-full text-xs md:text-sm mt-4 overflow-x-scroll">
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
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </section>
  );
};

export default AdsCampaign;
