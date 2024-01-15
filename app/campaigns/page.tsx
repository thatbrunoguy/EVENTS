"use client";

import Image from "next/image";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import { HiOutlinePlusSm } from "react-icons/hi";
import Link from "next/link";
import TabsComponent from "../components/tabs/Tabs";
import { PiSpeakerHighLight } from "react-icons/pi";

export default function Campaigns() {
  return (
    <section className="flex">
      <Sidebar />
      <main className="h-screen flex-1">
        <Header />
        {/* <h3 className="font-semibold text-2xl ml-12 mt-12">Campaigns</h3> */}
        <TabsComponent />
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
              href="/campaigns/create"
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
    </section>
  );
}
