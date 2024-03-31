"use client";

import Image from "next/image";
import Header from "../../../components/header/Header";
import Sidebar from "../../../components/sidebar/Sidebar";
import { HiOutlinePlusSm } from "react-icons/hi";
import Link from "next/link";
import TabsComponent from "../../../components/tabs/Tabs";
import { PiSpeakerHighLight } from "react-icons/pi";
import { useState } from "react";
import Dashboard from "./Dashboard";
import EmailCampaign from "./EmailCampaign";
import AdsCampaign from "./AdsCampaign";
import MobileFooter from "../../../components/footer/MobileFooter";

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

export default function Campaigns() {
  const [tablist, setTablist] = useState([...tablist_]);
  const [selectedEvent, setSelectedEvent] = useState({
    name: "",
    eventId: "",
  });
  return (
    <section className="flex pb-20 md:pb-0">
      <Sidebar />
      <MobileFooter />

      <main className="h-screen overflow-y-scroll flex-1">
        <Header
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />

        <div className="w-full h-[80%] flex items-center justify-center">
          <div className="w-[351px]  mx-auto my-auto flex flex-col items-center">
            <Image
              src="/assets/one.svg"
              alt="Eventparrot logo"
              width={165}
              height={153}
              priority
            />
            <p className="py-5 text-center">
              This page is currently under development, will be up shortly,
              thanks!
            </p>
            <Link
              href="/dashboard/create/basic-info"
              className="bg-purple-700 py-[10px] px-5 w-[147px] h-[41px] text-white text-sm rounded-lg flex items-center space-x-[4px]"
            >
              <div>
                <HiOutlinePlusSm />
              </div>
              <p>Create Event</p>
            </Link>
          </div>
        </div>

        {/* <h3 className="font-semibold text-2xl ml-12 mt-12">Campaigns</h3> */}
        {/* <TabsComponent tablist={tablist} setTablist={setTablist} /> */}

        {/* {tablist[0].isActive ? (
          <div>
            <Dashboard />
          </div>
        ) : tablist[1].isActive ? (
          <div>
            <EmailCampaign />
          </div>
        ) : (
          <div>
            <AdsCampaign />
          </div>
        )} */}
      </main>
    </section>
  );
}
