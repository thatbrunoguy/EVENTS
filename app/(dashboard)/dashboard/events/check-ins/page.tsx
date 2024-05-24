"use client";

import Header from "@/app/components/header/Header";
import Sidebar from "@/app/components/sidebar/Sidebar";
import React, { useState } from "react";
import Tabs from "./Tabs";
import Image from "next/image";
import { HiOutlinePlusSm } from "react-icons/hi";
import CheckInModal from "./CheckInModal";
import MobileFooter from "@/app/components/footer/MobileFooter";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  eventsManagamentFunctions,
  guestFunctions,
} from "@/app/utils/endpoints";
import { useRouter } from "next/navigation";
import { PrimaryLoading2 } from "@/app/components/loaders/PrimaryLoading";

const CheckIns = () => {
  const [customerId, setCustomerId] = useState("");
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({
    name: "",
    eventId: "",
  });

  const checkInAttendee = useMutation({
    mutationFn: eventsManagamentFunctions.checkInAttendee,
    onError: async (error, variables, context) => {},
    onSuccess: async (data, variables, context) => {
      // console.log("checkin-attendee", data);
    },
  });

  const { data: attendeeList, isLoading } = useQuery({
    queryFn: guestFunctions.getAttendeeList,
    queryKey: ["get-attendee-list"],
  });

  const filteredAttendeeList = attendeeList?.orders?.events?.filter(
    (attendee: any) => attendee.status === 2
  );

  return (
    <div className="flex pb-20 md:pb-0">
      <Sidebar />
      <MobileFooter />

      <main className="w-full h-screen overflow-y-scroll">
        <Header
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
        {isModalOpen && (
          <CheckInModal
            setIsModalOpen={setIsModalOpen}
            checkInAttendee={checkInAttendee}
            selectedEventId={selectedEvent.eventId}
          />
        )}

        {isLoading ? (
          <PrimaryLoading2 />
        ) : (
          <>
            {!filteredAttendeeList?.length ? (
              <div className="w-[351px] mx-auto flex flex-col items-center mt-[15%]">
                <Image
                  src="/assets/check.svg"
                  alt="Eventparrot logo"
                  width={165}
                  height={153}
                  priority
                />
                <p className="py-5 text-center">
                  Add attendees to keep everyone in the loop and make this event
                  a blast.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-purple-700 py-[10px] hover:bg-opacity-70 px-5 w-auto h-[41px] text-white text-sm rounded-lg flex items-center space-x-[4px]"
                >
                  <div>
                    <HiOutlinePlusSm />
                  </div>
                  <p>Check in attendee</p>
                </button>
              </div>
            ) : (
              <div className="w-[351px] mx-auto flex flex-col items-center mt-[15%]">
                <Image
                  src="/assets/check.svg"
                  alt="Eventparrot logo"
                  width={165}
                  height={153}
                  priority
                />
                <p className="py-5 text-center">
                  Add attendees to keep everyone in the loop and make this event
                  a blast.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => router.push("check-ins/attendee")}
                    className="bg-white border border-purple-500 text-purple-500 py-[10px] hover:bg-opacity-70 px-5 w-auto h-[41p text-sm rounded-lg flex items-center space-x-[4px]"
                  >
                    <p>View all attendee</p>
                  </button>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-purple-700 py-[10px] hover:bg-opacity-70 px-5 w-auto h-[41px] text-white text-sm rounded-lg flex items-center space-x-[4px]"
                  >
                    <div>
                      <HiOutlinePlusSm />
                    </div>
                    <p>Add attendee</p>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default CheckIns;
