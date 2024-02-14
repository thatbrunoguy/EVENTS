"use client";

import React from "react";
import HomeHeader from "../components/home/Header";
import Image from "next/image";
import HomeCategories from "../components/home/Categories";
import HomeEvents from "../components/home/Events";
import VirtualEvents from "../components/home/VirtualEvents";
import HomeFooter from "../components/home/Footer";
import LocationSearchBar from "../components/home/LocationSearchBar";

const Home = () => {
  return (
    <section>
      {/* HERO */}
      <div className="w-[98%] mx-auto">
        <div className="relative h-[50vh] mt-6">
          <div className="h-full relative w-full rounded-lg overflow-hidden ">
            <Image
              className="object-cover"
              src="/assets/external-hero.jpeg"
              alt="Eventparrots Hero Banner"
              fill
              priority
            />
          </div>
          <div className="absolute w-[95%] md:w-[80%] -bottom-10 z-10 transform left-1/2 -translate-x-1/2">
            <LocationSearchBar />
          </div>
        </div>
      </div>

      <div className="">
        <HomeCategories />
      </div>

      <div className="md:mt-[84px]  md:pb-[84px] w-full bg-white">
        <HomeEvents />
      </div>
      <div className=" w-full pb-[84px] bg-[#FBFAFC]">
        <VirtualEvents />
      </div>
    </section>
  );
};

export default Home;
