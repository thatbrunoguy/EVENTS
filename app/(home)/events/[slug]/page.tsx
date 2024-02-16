"use client";

import { EventData } from "@/app/(dashboard)/dashboard/event/page";
import HomeEvents from "@/app/components/home/Events";
import FaqComponent from "@/app/components/home/FaqComponent";
import { formatDate, formatDate2, formatTime } from "@/app/helpers";
import { guestFunctions } from "@/app/utils/endpoints";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiAlarmOn, CiCalendar, CiLocationOn } from "react-icons/ci";

const data = {
  rows: [
    {
      title: "Why should I use email campaigns for my event?",
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
                ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
                In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
                Fusce sed commodo purus, at tempus turpis.`,
    },
  ],
};

const EventDetails = ({ params }: { params: { slug: string } }) => {
  const [faqs, setFaqs] = useState<any>(null);
  const {
    data: event,
    isError,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["events-guest", params.slug],
    queryFn: () => guestFunctions.getEventsById(params.slug),
    select: (data) => {
      const faqs = data?.faqs || [];

      const modifiedEvent = {
        ...data,
        faqs: faqs.map((faq: any) => ({
          title: faq.question || "",
          content: faq.answer || "",
        })),
      };

      return modifiedEvent;
    },
  });

  if (event && status === "success") {
    (() => {
      const faqs = event.faqs;

      if (!faqs || !Array.isArray(faqs)) {
        return { rows: [] };
      }

      const rows = faqs.map((faq) => ({
        title: faq.question || "",
        content: faq.answer || "",
      }));
      return { rows };
    })();
  }

  console.log("events", event);

  return (
    <div>
      <div className="w-full py-6">
        <div className="w-[92%] mx-auto relative overflow-hidden rounded-2xl h-[60vh]">
          {event && event?.medias[0]?.original && (
            <Image
              className="object-cover"
              src={event?.medias[0].original}
              alt={event?.name}
              fill
              priority
            />
          )}
        </div>
        <div className="mt-[84px] pb-[84px] w-full flex items-center">
          <div className="w-[90%] mx-auto flex justify-between">
            {/* LEFT */}
            <div className="w-[95%] md:w-[55%]">
              <p className="text-xl md:text-5xl font-semibold">
                {/* {events?.name} */}
              </p>
              <div className="mt-9  ">
                <p className="text-xl md:text-2xl font-semibold">
                  Details of the event
                </p>
                <div className="mt-5 mb-9 font-light">
                  <div className="flex items-center gap-6">
                    <div className="min-w-16 h-16 hover:bg-primaryPurple transition-all duration-300 ease-linear hover:text-white rounded-full grid place-content-center text-primaryPurple bg-lightPurple">
                      <CiCalendar size={36} />
                    </div>
                    <p>
                      {formatDate2(event?.start_date)} -{" "}
                      {formatDate2(event?.end_date)}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 my-4">
                    <div className="min-w-16 h-16 hover:bg-primaryPurple transition-all duration-300 ease-linear hover:text-white rounded-full grid place-content-center text-primaryPurple bg-lightPurple">
                      <CiAlarmOn size={36} />
                    </div>
                    <p>
                      {formatTime(event?.start_date)} WAT -{" "}
                      {formatTime(event?.end_date)} WAT
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="min-w-16 h-16 hover:bg-primaryPurple transition-all duration-300 ease-linear hover:text-white rounded-full grid place-content-center text-primaryPurple bg-lightPurple">
                      <CiLocationOn size={36} />
                    </div>
                    <p>{event?.locations[0]?.address || "Online"}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-semibold ">
                  Description of the Event
                </p>
                <div className="mt-4 font-light w-full text-sm md:text-base md:w-[90%]">
                  <div
                    className="w-full"
                    dangerouslySetInnerHTML={{
                      __html: event?.description,
                    }}
                  ></div>
                </div>
              </div>
              <div className="my-9">
                <p className="text-xl md:text-2xl font-semibold">
                  Faqs of the Event
                </p>
                <div className="mt-4">
                  <FaqComponent data={{ rows: event?.faqs }} />
                </div>
              </div>

              <div>
                <p className="text-xl md:text-2xl font-semibold mb-8">
                  Organizer of the Event
                </p>
                <div className=" bg-white rounded-lg w-full h-[300px] flex flex-col shadow-2xl items-center justify-center">
                  <div className="relative w-[113px] bg-lightPurple h-[113px] grid place-content-center rounded-full overflow-hidden">
                    <p className="text-4xl text-primaryPurple font-medium">
                      {event?.organizer?.name.charAt(0).toUpperCase()}
                    </p>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-lg md:text-2xl mb-3">
                      {event?.organizer?.name}
                    </p>
                    <p className="font-light">{event?.organizer?.phone}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* RIGHT */}
            <div className="w-[25%] hidden md:block ">
              <div className="w-[80px] text-sm md:text-base ml-auto mb-12 grid place-content-center h-8 bg-[#FCEDF6] text-[#CB1C6F] rounded">
                Free
              </div>
              <p className="text-[24px] hidden md:block mb-6">
                Checkout page of the Event
              </p>

              <Link href={`${params.slug}/checkout`}>
                <button className="text-white hidden md:grid hover:bg-opacity-60 rounded-lg transition-all duration-300 ease-linear bg-primaryPurple w-full h-12  place-content-center">
                  <p>Get a Ticket</p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
