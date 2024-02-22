"use client";

import { EventData } from "@/app/(dashboard)/dashboard/event/page";
import HomeEvents from "@/app/components/home/Events";
import FaqComponent from "@/app/components/home/FaqComponent";
import { formatDate, formatDate2, formatTime } from "@/app/helpers";
import { guestFunctions } from "@/app/utils/endpoints";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
      const lowestPrice = Math.min(
        ...data.tickets.map((ticket: any) => ticket.price)
      );
      const highestPrice = Math.max(
        ...data.tickets.map((ticket: any) => ticket.price)
      );

      const modifiedEvent = {
        ...data,
        faqs: faqs.map((faq: any) => ({
          title: faq.question || "",
          content: faq.answer || "",
        })),
        lowestTicketPrice: lowestPrice,
        highestTicketPrice: highestPrice,
      };

      return modifiedEvent;
    },
  });

  useEffect(() => {
    if (params.slug === "uisu_variety_night_mr_and_miss_ui") {
      router.push("/events/9b5e11ae-9719-46a8-a2a7-610fd4ade13d");
    }
  }, [params.slug]);

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

  // console.log("events", event);

  return (
    <div>
      <div className="w-full py-6">
        <div className="w-[92%] mx-auto relative overflow-hidden rounded-2xl h-[36vh] md:h-[60vh]">
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
        <div className="md:mt-[84px] pb-[84px] w-full flex items-center">
          <div className=" w-[94%] md:w-[90%] mx-auto flex justify-between">
            {/* LEFT */}
            <div className="w-full mx-auto md:mx-0 md:w-[55%]">
              <p className="text-xl md:text-5xl font-semibold">
                {/* {events?.name} */}
              </p>
              <div className="mt-9  ">
                <p className="text-lg md:text-2xl font-medium md:font-semibold">
                  Details of the event
                </p>
                <div className="mt-5 mb-9 font-light">
                  <div className="flex items-center gap-6">
                    <div className="min-w-12 h-12 text-lg md:text-4xl md:min-w-16 md:h-16 hover:bg-primaryPurple transition-all duration-300 ease-linear hover:text-white rounded-full grid place-content-center text-primaryPurple bg-lightPurple">
                      <CiCalendar />
                    </div>
                    <p className="text-sm md:text-base">
                      {formatDate2(event?.start_date)} -{" "}
                      {formatDate2(event?.end_date)}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 my-4">
                    <div className="min-w-12 h-12 text-lg md:text-4xl md:min-w-16 md:h-16 hover:bg-primaryPurple transition-all duration-300 ease-linear hover:text-white rounded-full grid place-content-center text-primaryPurple bg-lightPurple">
                      <CiAlarmOn />
                    </div>
                    <p className="text-sm md:text-base">
                      {formatTime(event?.start_date)} WAT -{" "}
                      {formatTime(event?.end_date)} WAT
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="min-w-12 h-12 text-lg md:text-4xl md:min-w-16 md:h-16 hover:bg-primaryPurple transition-all duration-300 ease-linear hover:text-white rounded-full grid place-content-center text-primaryPurple bg-lightPurple">
                      <CiLocationOn />
                    </div>
                    <p className="text-sm md:text-base">
                      {event?.locations[0]?.address || "Online"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="">
                <p className="text-lg md:text-2xl font-medium md:font-semibold ">
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
                <p className="text-lg md:text-2xl font-medium md:font-semibold">
                  Faqs of the Event
                </p>
                <div className="mt-4">
                  <FaqComponent data={{ rows: event?.faqs }} />
                </div>
              </div>

              <div className="">
                <p className="text-lg md:text-2xl text-center md:text-left font-medium md:font-semibold mb-8">
                  Organizer of the Event
                </p>
                <div className=" bg-white rounded-lg w-[90%] mx-auto md:mx-0 md:w-full h-[300px] flex flex-col shadow-2xl items-center justify-center">
                  <div className="relative w-[113px] bg-lightPurple h-[113px] grid place-content-center rounded-full overflow-hidden">
                    <p className="text-4xl text-primaryPurple font-medium">
                      {event?.organizer?.name.charAt(0).toUpperCase()}
                    </p>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-lg md:text-2xl mb-3">
                      {event?.organizer?.name}
                    </p>
                    {/* <p className="font-light">{event?.organizer?.phone}</p>
                     */}
                  </div>
                </div>
              </div>
            </div>
            {/* RIGHT */}
            <div className="w-[25%] hidden md:block ">
              <div className="text-sm md:text-lg hidden md:block mb-6">
                {event?.lowestTicketPrice === event?.highestTicketPrice ? (
                  <span>
                    {`${
                      event?.lowestTicketPrice === 0
                        ? "Free"
                        : `₦${event?.lowestTicketPrice || 0}`
                    }`}
                  </span>
                ) : (
                  <div className="flex items-center gap-3 ">
                    <div>From</div>
                    {"   "} ₦{event?.lowestTicketPrice || 0}
                  </div>
                )}
              </div>

              <Link href={`${params.slug}/checkout`}>
                <button className="text-white hidden md:grid hover:bg-opacity-60 rounded-lg transition-all duration-300 ease-linear bg-primaryPurple w-full h-12  place-content-center">
                  <p>Get a Ticket</p>
                </button>
              </Link>
            </div>
            <div className=" md:hidden   h-24 fixed left-0 right-0 bg-white border-t flex items-center justify-center bottom-0">
              <Link href={`${params.slug}/checkout`}>
                <button className="h-10 w-[186px] rounded-md bg-primaryPurple hover:bg-opacity-50 text-sm text-white  grid place-content-center">
                  <p>Get a ticket</p>
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
