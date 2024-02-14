"use client";

import { TabsComponent2 } from "@/app/components/tabs/Tabs";
import React, { useState } from "react";
import CreateEmailCampaignBasic from "./Basic";
import CreateEmailCampaignContent from "./Content";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import { FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from "react-icons/fa";

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

const socials = [
  { title: "facebook", icon: <FaFacebookF />, url: "/" },
  { title: "x", icon: <FaXTwitter />, url: "/" },
  { title: "linkedin", icon: <FaLinkedinIn />, url: "/" },
  { title: "instagram", icon: <FaInstagram />, url: "/" },
  { title: "tiktok", icon: <FaTiktok />, url: "/" },
  { title: "youtube", icon: <FaYoutube />, url: "/" },
];
const CreateEmailCampaign = () => {
  const [tablist, setTablist] = useState([...tablist_]);
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
          <div className="w-full flex items-center justify-between mb-9">
            <h2 className="text-[24px] font-semibold ">Drixster</h2>
            <button>
              <p className="text-primaryPurple hover:bg-primaryPurple hover:text-white bg-lightPurple h-10  px-5 grid place-content-center rounded-md">
                Send test email
              </p>
            </button>
          </div>

          <div className="w-full bg-white shadow-lg p-6 text-sm">
            <p className="mb-2">
              <span className="text-lightText">Subject:</span> You&apos;re
              invited to ROI Listening Session (December 6, 2023)
            </p>
            <p>
              <span className="text-lightText">From: </span>
              The ROI Team
            </p>
            <div className="h-[308px] w-full mt-12">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVldGluZ3xlbnwwfHwwfHx8MA%3D%3D"
              />
            </div>

            <div className="h-[272px] w-full flex items-center justify-center text-center">
              <div className="w-[450px]">
                <h2 className="text-2xl font-semibold my-3  ">Email Header</h2>
                <p className="text-lightText">
                  Don&apos;t miss out! Fill in the email below with a
                  captivating description of these must-attend events.
                </p>
              </div>
            </div>

            <div className="w-full lg:w-[550px] mx-auto">
              <img
                className="w-full h-full object-cover rounded-[4px]"
                src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1lZXRpbmd8ZW58MHx8MHx8fDA%3D"
              />

              <div className="flex items-center justify-between p-6 bg-white shadow-md rounded-bl-md rounded-br-md">
                <div>
                  <h2 className="text-2xl font-medium mb-1">
                    Eko convections centre
                  </h2>
                  <p className="text-lightText text-sm mb-1">
                    Lekki paradise estate 3, chevron drive
                  </p>
                  <p className="text-lightText text-sm">
                    Saturday, October 22, 2023 | 7:30pm
                  </p>
                </div>
                {/* REGISTR BUTTON */}
                <button className="bg-primaryPurple grid place-content-center text-sm text-white py-[10px] px-5 rounded-md">
                  <p>Register</p>
                </button>
              </div>
            </div>
            <div className="w-full lg:w-[550px] mx-auto mt-16">
              <img
                className="w-full h-full object-cover rounded-[4px]"
                src="https://plus.unsplash.com/premium_photo-1682608389369-e029b03c80d6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fG1lZXRpbmd8ZW58MHx8MHx8fDA%3D"
              />

              <div className="flex items-center justify-between p-6 bg-white shadow-md rounded-bl-md rounded-br-md">
                <div>
                  <h2 className="text-2xl font-medium mb-1">
                    Eko convections centre
                  </h2>
                  <p className="text-lightText text-sm mb-1">
                    Lekki paradise estate 3, chevron drive
                  </p>
                  <p className="text-lightText text-sm">
                    Saturday, October 22, 2023 | 7:30pm
                  </p>
                </div>
                {/* REGISTR BUTTON */}
                <button className="bg-primaryPurple grid place-content-center text-sm text-white py-[10px] px-5 rounded-md">
                  <p>Register</p>
                </button>
              </div>
            </div>

            <footer className="bg-[#FBFAFC] w-full py-5 text-[#312F33] mt-16">
              <div className="flex items-center justify-center space-x-6 text-2xl text-primaryPurple">
                {socials.map((social) => (
                  <div key={social.title}>{social.icon}</div>
                ))}
              </div>
              <div className="w-full lg:w-[450px] text-center mx-auto mt-8">
                <p>The ROI Team</p>
                <p className="my-3">
                  Lekki Paradise Estate 3, Chevron drive Lagos, Island 200125
                  Nigeria
                </p>
                <p>Unsubscribe | Privacy Policy</p>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </section>
  );
};

export default CreateEmailCampaign;
