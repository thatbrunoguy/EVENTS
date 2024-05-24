"use client";

import MobileFooter from "@/app/components/footer/MobileFooter";
import Header from "@/app/components/header/Header";
import Sidebar from "@/app/components/sidebar/Sidebar";
import { Pagination } from "@/app/types";
import { guestFunctions } from "@/app/utils/endpoints";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

interface Event {
  id: string;
  ticket_number: string;
  checked_in_at: string | null;
  created_at: string;
  status: number;
  ticket: {
    id: string;
    name: string;
    description: string;
    price: number;
  };
  ticket_id: string;
  user: {
    id: string;
    full_name: string;
    email: string;
  };
}

interface OrdersData {
  orders: {
    total: number;
    events: Event[];
    pagination: Pagination;
  };
}

const ticketType = {
  All: "All",
  Free: 1,
  Paid: 2,
};

const AttendeeList = () => {
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState({
    name: "",
    eventId: "",
  });
  const [activeTab, setActiveTab] = useState<string>("All");
  const changeTab = (tab: string) => {
    setActiveTab(tab);
  };

  const { data: attendeeList, isLoading } = useQuery<OrdersData>({
    queryFn: guestFunctions.getAttendeeList,
    queryKey: ["get-attendee-list"],
  });

  const filteredAttendeeList = useMemo(() => {
    if (activeTab === "All") {
      return attendeeList?.orders?.events?.filter(
        (attendee: any) => attendee.status === 2
      );
    } else {
      return attendeeList?.orders?.events?.filter(
        (attendee: any) =>
          attendee.status === 2 &&
          //@ts-ignore
          attendee.ticket.type === ticketType[activeTab]
      );
    }
  }, [attendeeList, activeTab, ticketType]);

  return (
    <div className="flex pb-20 md:pb-0">
      <Sidebar />
      <MobileFooter />

      <main className="w-full h-screen overflow-y-scroll">
        <Header
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
        <div className="w-[95%] mt-6 mx-auto">
          <div className="flex justify-between">
            <button
              onClick={() => router.back()}
              className="bg-white border border-purple-500 text-purple-500 py-[10px] hover:bg-opacity-70 px-5 w-auto h-[41px] text-sm rounded-lg flex items-center space-x-[4px]"
            >
              <p>Back</p>
            </button>
            <div className="bg-gray-100 p-0.5 h-[41px] text-sm rounded-lg">
              <div className="flex">
                <button
                  className={`px-5 py-2 rounded-lg ${
                    activeTab === "All" ? "bg-[#fff]" : ""
                  }`}
                  onClick={() => changeTab("All")}
                >
                  All
                </button>
                <button
                  className={`px-5 py-2 rounded-lg ${
                    activeTab === "Free" ? "bg-[#fff]" : ""
                  }`}
                  onClick={() => changeTab("Free")}
                >
                  Free
                </button>
                <button
                  className={`px-5 py-2 rounded-lg ${
                    activeTab === "Paid" ? "bg-[#fff]" : ""
                  }`}
                  onClick={() => changeTab("Paid")}
                >
                  Paid
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <table className="w-full text-xs md:text-sm">
              <thead className="h-[50px] font-normal">
                <tr className="py-3 px-4 bg-[#FBFAFC]">
                  <th className="text-left font-normal">Attendees</th>
                  <th className="text-left font-normal">Ticket type</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendeeList &&
                  filteredAttendeeList.map((ev: any) => (
                    <tr className="border-b" key={ev?.id}>
                      <td className="py-3">{ev?.user.full_name}</td>
                      {ev?.ticket.type === 2 ? (
                        <td className="rounded-md bg-lightPurple w-[100px] p-2 my-3 flex justify-center text-xs text-primaryPurple">
                          Paid Ticket
                        </td>
                      ) : (
                        <td className="rounded-md bg-blue-100 w-[100px] p-2 m-3 flex justify-center text-xs text-blue-500">
                          Free Ticket
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AttendeeList;
