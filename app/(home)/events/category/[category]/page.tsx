"use client";

import { EventData } from "@/app/(dashboard)/dashboard/event/page";
import HomeEvents from "@/app/components/home/Events";
import { formatDate2, formatTime } from "@/app/helpers";
import { guestFunctions } from "@/app/utils/endpoints";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

const EventCategory = ({ params }: { params: { category: string } }) => {
  const {
    data: events,
    isError,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["events-guest", params.category],
    queryFn: () => guestFunctions.getEventByCategories(params.category),
    select: (data) => {
      const selectedEvents: EventData[] = data.map((event: EventData) => {
        const startDate = event.start_date
          ? `${formatDate2(event.start_date)} | ${formatTime(event.start_date)}`
          : null;
        const quantity = event.tickets[0]?.stock_qty ?? null;
        const price = event.tickets[1]?.price ?? null;
        const desc = event.tickets[0]?.description ?? null;
        const img = event.medias[0]?.original ?? null;
        const address = event.locations[0]?.address ?? null;

        return {
          id: event.id,
          name: event.name,
          startDate,
          quantity,
          price,
          desc,
          img,
          address,
        };
      });

      return selectedEvents;
    },
  });

  console.log("events - category", events);

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
          <div className="absolute capitalize top-1/2 left-[56px] text-2xl md:text-6xl font-semibold text-white  transform -translate-y-1/2">
            {params.category}
          </div>
        </div>
        <div className="mt-10 md:mt-[84px] pb-[84px] w-full bg-white">
          <HomeEvents events={events?.length ? events : []} />
        </div>
      </div>
    </div>
  );
};

export default EventCategory;
