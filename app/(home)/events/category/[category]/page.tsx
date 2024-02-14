import HomeEvents from "@/app/components/home/Events";
import Image from "next/image";
import React from "react";

const EventCategory = ({ params }: { params: { category: string } }) => {
  return (
    <div>
      <div className="w-full py-6">
        <div className="w-[92%] mx-auto  relative overflow-hidden rounded-2xl h-[55vh]">
          <Image
            className="object-cover "
            src="/assets/category-banner.jpeg"
            alt="Eventparrots Hero Banner"
            fill
            priority
          />
          <div className="absolute top-1/2 left-[56px] text-2xl md:text-6xl font-semibold text-white  transform -translate-y-1/2">
            {params.category}
          </div>
        </div>
        <div className="mt-10 md:mt-[84px] pb-[84px] w-full bg-white">
          <HomeEvents />
        </div>
      </div>
    </div>
  );
};

export default EventCategory;
