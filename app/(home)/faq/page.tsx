"use client";

import Image from "next/image";
import React from "react";
import FaqComponent from "@/app/components/home/FaqComponent";
const data = {
  rows: [
    {
      title: "How can I promote my event on Eventsparrot?",
      content: `To promote your event, just sign up to create your account, input all the required details and you are signed in. Just navigate to the Event tab and create your event by filling in the required details about your event, adding eye-catching visuals and relevant tags to enhance visibility. Once submitted, our platform will feature your event for our community to discover.`,
    },
    {
      title: "How does Eventsparrot work?",
      content:
        "As a vendor, you can list your events and share the link to your events which event attendees can then register for. As an event attendee, you can discover events through our user-friendly search and recommendation features. You can filter events based on location, date, and category. Additionally, our platform sends personalised event recommendations to users based on your interests and past attendance. It's a seamless way for event organizers to connect with their target audience.",
    },
    {
      title: "Why should I use Eventsparrot for my event?",
      content: `Eventsparrot gives you the opportunity to reach a wider audience for your events. We provide tools to increase attendance for your event. We provide an easily shareable link so you can also promote your event by sharing your event link on social media or your website. Eventsparrot is available to everyone to create events and sell their tickets seamlessly. `,
    },
    {
      title: "Can I sell tickets to all types of events on Eventsparrot?",
      content:
        "Yes. You can sell tickets to both free and paid events on Eventsparrot. Events ranging from local meetups to online webinars, concerts, parties or business events, can be promoted on Eventsparrot. We support all types of events that bring people together.",
    },
    {
      title: "How do I get the funds from my ticket sales?",
      content: `To get the funds from your ticket sales, you have to first link a bank account to your Eventsparrot account. You will get your funds within 3 days after your event, which will be sent to your registered bank account. `,
    },
    {
      title: "Can I create multiple ticket types on Eventsparrot?",
      content:
        "Yes. Eventsparrot allows you to create multiple ticket types for each event. We are aware that most events allow for multiple ticket options like early bird, regular, VIP, table, based on various budget.",
    },
    {
      title: "Can Eventsparrot help in promoting my events?",
      content: `To get more event attendees, you can make use of Eventsparrot's sponsored promotion option. We will market your event to prospective attendees. `,
    },
  ],
};

const Faq = () => {
  return (
    <div className="py-6">
      <div className="w-[96%] mx-auto relative overflow-hidden rounded-lg h-[55vh]">
        <Image
          className="object-cover"
          src="/assets/category-banner.jpeg"
          alt="Eventparrots Hero Banner"
          fill
          priority
        />
        <div className="absolute top-1/2 left-[56px] text-2xl md:text-6xl font-semibold text-white  transform -translate-y-1/2">
          Frequently Asked Questions
        </div>
      </div>
      <div className="my-12 md:my-[84px] flex flex-col md:flex-row justify-between mx-auto w-[90%]">
        <div className="w-[245px]">
          <p className="w-full font-semibold text-xl md:text-3xl">
            Generally Asked Questions
          </p>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-[60%]  flex justify-end">
          <div className=" ">
            <FaqComponent data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
