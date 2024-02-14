"use client";

import HomeEvents from "@/app/components/home/Events";
import FaqComponent from "@/app/components/home/FaqComponent";
import Image from "next/image";
import React from "react";
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
    {
      title: "What do I even write about?",
      content:
        "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
    },
    {
      title: "How many emails should I send?",
      content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
              Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
              Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
              Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
    },
    {
      title: "How do I make my emails look good?",
      content:
        "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
    },
    {
      title: "Where can I create my email campaigns?",
      content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
              Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
              Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
              Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
    },
  ],
};

const EventDetails = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <div className="w-full py-6">
        <div className="w-[92%] mx-auto relative overflow-hidden rounded-2xl h-[60vh]">
          <Image
            className="object-cover"
            src="/assets/banner-detail.png"
            alt="Eventparrots Hero Banner"
            fill
            priority
          />
        </div>
        <div className="mt-[84px] pb-[84px] w-full flex items-center">
          <div className="w-[90%] mx-auto flex justify-between">
            {/* LEFT */}
            <div className="w-[95%] md:w-[55%]">
              <p className="text-xl md:text-5xl font-semibold">
                Study Abroad Fair in Lagos Mainland 2024
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
                      Wednesday, December 20 2023 - Friday, December 22 2023
                    </p>
                  </div>
                  <div className="flex items-center gap-6 my-4">
                    <div className="min-w-16 h-16 hover:bg-primaryPurple transition-all duration-300 ease-linear hover:text-white rounded-full grid place-content-center text-primaryPurple bg-lightPurple">
                      <CiAlarmOn size={36} />
                    </div>
                    <p>3:00 PM - 9:30 PM WAT</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="min-w-16 h-16 hover:bg-primaryPurple transition-all duration-300 ease-linear hover:text-white rounded-full grid place-content-center text-primaryPurple bg-lightPurple">
                      <CiLocationOn size={36} />
                    </div>
                    <p>Car Park of All Souls Church, Lekki Phase 1</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-semibold ">
                  Description of the Event
                </p>
                <p className="mt-4 font-light w-full text-sm md:text-base md:w-[90%]">
                  PORT HARCOURT'S BIGGEST FESTIVAL Offering exclusive <br />
                  performance from over 15 Global Artists.This year&apos;s
                  festival is expanding to a new Venue with more acts and
                  performances.
                </p>
              </div>
              <div className="my-9">
                <p className="text-xl md:text-2xl font-semibold">
                  Faqs of the Event
                </p>
                <div className="mt-4">
                  <FaqComponent data={data} />
                </div>
              </div>

              <div>
                <p className="text-xl md:text-2xl font-semibold mb-8">
                  Organizer of the Event
                </p>
                <div className=" bg-white rounded-lg w-full h-[300px] flex flex-col shadow-2xl items-center justify-center">
                  <div className="relative w-[113px] h-[113px] rounded-full overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D"
                      alt="profile pic"
                      className="object-cover"
                      // width={47}
                      // height={47}
                      // style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-lg md:text-2xl mb-3">
                      Israel Adegbulugbe
                    </p>
                    <p className="font-light">09019089009</p>
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
              <button className="text-white hidden md:grid hover:bg-opacity-60 rounded-lg transition-all duration-300 ease-linear bg-primaryPurple w-full h-12  place-content-center">
                <p>Get a Ticket</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
