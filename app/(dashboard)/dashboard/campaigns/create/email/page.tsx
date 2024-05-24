"use client";

import { TabsComponent2 } from "@/app/components/tabs/Tabs";
import React, { useContext, useState } from "react";
import CreateEmailCampaignBasic from "./Basic";
import { EmailAdContext, EmailAdContextProvider } from "./EmailAdsContext";
import EmailTemplate from "./EmailTemplate";
import Image from "next/image";
import MainFooter from "@/app/components/footer/MainFooter";
import CreateEmailCampaignContent from "./Content";

const tablist_ = [
  {
    title: "Basics",
    isActive: true,
  },
  {
    title: "Content",
    isActive: false,
  },
];

const CreateEmailCampaignBody = () => {
  const [tablist, setTablist] = useState([...tablist_]);
  const { isComplete, createEmailCampaign, goBack } =
    useContext(EmailAdContext);

  return (
    <section>
      <main className="w-full min-h-screen flex">
        <div className="w-full md:w-[600px] bg-white py-7">
          <TabsComponent2 tablist={tablist} setTablist={setTablist} />
          <div className="px-3 sm:px-5 md:px-9 w-full h-full">
            {tablist[0].isActive ? (
              <CreateEmailCampaignBasic />
            ) : (
              <CreateEmailCampaignContent />
            )}
          </div>
        </div>

        {/* ---- RIGHT SIDE ---- */}
        <div className=" hidden md:w-[50%] lg:flex-1 md:block bg-[#FBFAFC] p-9">
          <EmailTemplate />
        </div>
      </main>

      <MainFooter
        isComplete={isComplete}
        nextHandler={createEmailCampaign}
        backHandler={goBack}
      />
    </section>
  );
};

const CreateEmailCampaign = () => {
  return (
    <EmailAdContextProvider>
      <CreateEmailCampaignBody />
    </EmailAdContextProvider>
  );
};

export default CreateEmailCampaign;
