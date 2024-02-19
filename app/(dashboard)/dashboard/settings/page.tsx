"use client";

import Header from "../../../components/header/Header";
import Sidebar from "../../../components/sidebar/Sidebar";

import { TabsComponent2 } from "../../../components/tabs/Tabs";
import { useState } from "react";

import OrganizationProfile from "./Profile";
import TeamManagement from "./TeamManagement";
import PlanManagement from "./PlanManagement";

export type AccountInfo = {
  name: string;
  country: string;
  website: string;
  avatar: string;
};

const tablist_ = [
  {
    title: "Organization Profile",
    isActive: true,
  },
  {
    title: "Team Management",
    isActive: false,
  },
  {
    title: "Plan Management",
    isActive: false,
  },
];
export default function SettingsPage() {
  const [tablist, setTablist] = useState([...tablist_]);
  const [selectedEvent, setSelectedEvent] = useState({
    name: "",
    eventId: "",
  });

  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    name: "",
    country: "",
    website: "",
    avatar: "",
  });

  const [accountPhoto, setAccountPhoto] = useState<any>([]);
  const [imageUrl, setImageUrl] = useState("");

  return (
    <section className="flex">
      <Sidebar />
      <main className="h-screen flex-1 overflow-y-scroll">
        <Header
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
        <h3 className="font-semibold text-2xl ml-12 mt-12">
          Organization settings
        </h3>

        <div className="w-[95%] sm:w-[92%] mx-auto">
          <div className="xl:w-[60%] mt-5">
            <TabsComponent2 tablist={tablist} setTablist={setTablist} />
          </div>

          {tablist[0].isActive ? (
            <div>
              <OrganizationProfile
                accountInfo={accountInfo}
                setAccountInfo={setAccountInfo}
                accountPhoto={accountPhoto}
                setAccountPhoto={setAccountPhoto}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
              />
            </div>
          ) : tablist[1].isActive ? (
            <div>
              <TeamManagement />
            </div>
          ) : (
            <div>
              <PlanManagement />
            </div>
          )}
        </div>
      </main>
    </section>
  );
}
