"use client";

import Image from "next/image";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import { HiOutlinePlusSm } from "react-icons/hi";
import Link from "next/link";
import TabsComponent from "../components/tabs/Tabs";
import { PiSpeakerHighLight } from "react-icons/pi";
import { useState } from "react";
import Dashboard from "./Dashboard";
import EmailCampaign from "./EmailCampaign";
import AdsCampaign from "./AdsCampaign";
import MobileFooter from "../components/footer/MobileFooter";

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

  return (
    <section className="flex pb-20 md:pb-0">
      <Sidebar />
      <MobileFooter />

      <main className="h-screen overflow-y-scroll flex-1">
        <Header />
        {/* <h3 className="font-semibold text-2xl ml-12 mt-12">Campaigns</h3> */}
        <TabsComponent tablist={tablist} setTablist={setTablist} />

        {tablist[0].isActive ? (
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
        )}
      </main>
    </section>
  );
}
