"use client";

import Image from "next/image";
import Header from "../../../components/header/Header";
import Sidebar from "../../../components/sidebar/Sidebar";
import { HiOutlinePlusSm } from "react-icons/hi";
import Link from "next/link";
import { IoIosMore } from "react-icons/io";
import { useState } from "react";
import { PiShareLight } from "react-icons/pi";
import DashHeader from "./Header";
import GuestlistModal from "./Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { IoMailOpenSharp } from "react-icons/io5";
import MobileFooter from "../../../components/footer/MobileFooter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  eventsManagamentFunctions,
  guestFunctions,
} from "@/app/utils/endpoints";
import { PrimaryLoading2 } from "@/app/components/loaders/PrimaryLoading";
import { formatDate, formatDate2, formatTime } from "@/app/helpers";

export interface OrderData {
  name: string;
  quantity: number;
  buyerName: string;
  orderNumber: string;
  date: string;
  email: string;
  stockQuantity: number;
  amount: number | string;
  fees: number;
  stat?: any;
}

export default function Guestlist() {
  const queryClient = useQueryClient();
  const [isGuestlistModalOpen, setIsGuestlistModalOpen] =
    useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState({
    name: "",
    eventId: "",
    location: "",
    date: "",
    img: "",
  });

  const [selectedOrder, setSelectedOrder] = useState<OrderData>();
  const [downloadCsv, setDownloadCsv] = useState(false);

  //export csv fn
  const { isLoading: loadingDownloadCsv, data } = useQuery({
    queryKey: ["export-guestList-csv"],
    queryFn: eventsManagamentFunctions.downloadGuestListCsv,
    enabled: downloadCsv,
  });

  // ticket sale data
  const { data: ticketsData } = useQuery({
    queryKey: ["ticket-data"],
    queryFn: guestFunctions.getTicketsData,
  });

  const { data: guestlistOrders, isLoading } = useQuery({
    queryKey: ["events-guestlist-order"],
    queryFn: () =>
      eventsManagamentFunctions.getEventGuestlist(selectedEvent?.eventId),
    enabled: selectedEvent.eventId ? true : false,
    select: (data) => {
      const selectedData = data.map((item: any) => {
        console.log(item, "item");
        const { user, tickets, order_number, order_date, quantity } = item;
        const amount = tickets[0].price * quantity;
        let fees = 0;

        if (amount === 0) {
          fees = 0;
        } else if (amount >= 2000) {
          fees = amount * 0.05 + 100;
        } else if (amount < 2000) {
          fees = amount * 0.05;
        }

        const ticketCounts: { [ticketName: string]: number } = {};

        data.forEach((item: any) => {
          const { tickets } = item;
          const ticketName = tickets[0].ticket.name;
          ticketCounts[ticketName] = (ticketCounts[ticketName] || 0) + 1;
        });

        const stat = Object.entries(ticketCounts).map(
          ([ticketName, count]) => ({
            ticketName,
            count,
          })
        );

        return {
          name: tickets[0].ticket?.name,
          quantity: tickets.length,
          buyerName: user.full_name,
          orderNumber: order_number,
          date: new Date(order_date).toLocaleDateString(),
          email: user.email,
          price: tickets[0].ticket.price,
          stockQuantity: tickets[0].stock_qty,
          amount: amount,
          fees: fees,
          stat: stat,
        };
      });
      console.log("selectedData", selectedData);
      return selectedData;
    },
  });

  console.log("guestlistOrders", guestlistOrders);
  const exportCSV = () => {
    setDownloadCsv((prev) => (prev = true));
    if (data.status) {
      queryClient.invalidateQueries({ queryKey: ["export-guestList-csv"] });
      setDownloadCsv(false);
      toast(
        <div className="flex gap-4 p-6 py-4">
          <div className="min-w-9 h-9 bg-lightPurple rounded-full hover:bg-primaryPurple hover:text-white text-primaryPurple grid place-content-center">
            <IoMailOpenSharp />
          </div>
          <div>
            <h3 className="mb-3 text-black text-base">
              CSV file exported successfully
            </h3>
            <p>
              The csv format of your guestlist has been exported to your mail.
              Check spam folder if you can&apos;t see it.
            </p>
          </div>
        </div>,
        {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };

  return (
    <section className="flex">
      <ToastContainer
        toastClassName="w-[500px]"
        progressStyle={{ background: "#7431B8" }}
      />
      <Sidebar />
      <MobileFooter />

      <main className="h-screen overflow-y-scroll flex-1">
        <Header
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />

        <>
          {isLoading ? (
            <div>
              <PrimaryLoading2 />
            </div>
          ) : (
            <>
              {!guestlistOrders?.length ? (
                <div className="flex justify-center items-center w-full h-[80%]">
                  <div className="w-[351px] flex flex-col items-center">
                    <Image
                      src="/assets/guestlist.svg"
                      alt="Eventparrot logo"
                      width={180}
                      height={180}
                      priority
                    />
                    <p className="py-5 text-center text-lightText w-[76%]">
                      Guests who purchased your ticket will appear here
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-[95%] mt-6 mx-auto">
                  <div className="w-full mb-9">
                    <DashHeader stat={ticketsData} />
                  </div>
                  {isGuestlistModalOpen && (
                    <GuestlistModal
                      selectedEvent={selectedEvent}
                      selectedOrder={selectedOrder}
                      setIsGuestlistModalOpen={setIsGuestlistModalOpen}
                    />
                  )}
                  <h2 className="font-semibold text-2xl">Guestlist</h2>

                  <button
                    onClick={exportCSV}
                    className="bg-purple-700  mb-10 ml-auto py-[10px] px-5 w-auto h-[41px] text-white text-sm rounded-lg flex items-center space-x-[4px]"
                    disabled={loadingDownloadCsv}
                  >
                    <div>
                      <PiShareLight />
                    </div>
                    <p>Export as CSV</p>
                  </button>
                  <div className="w-full overflow-x-scroll">
                    <div className="w-[250vw] lg:w-full ">
                      <table className="w-full text-xs md:text-sm">
                        <thead className="h-[50px]">
                          <tr className="py-3 px-4 bg-[#FBFAFC]">
                            <th className="text-left">Ticket name</th>
                            <th className="text-left">Ticket quantity</th>
                            <th className="text-left">Buyer name</th>
                            <th className="text-left">Order number</th>
                            <th className="text-left">Order date</th>
                            <th className="text-left"></th>
                          </tr>
                        </thead>
                        {guestlistOrders &&
                          guestlistOrders.map((item: any, index: number) => (
                            <tr key={item.id} className="border-b">
                              <td className="p-3">
                                <h4 className="font-semibold col-span-3">
                                  {item.name}
                                </h4>
                              </td>
                              <td className="p-3">{item.quantity}</td>
                              <td className="p-3">{item.buyerName}</td>
                              <td>{item.orderNumber}</td>
                              <td>{`${formatDate(item.date)} `}</td>
                              <td>
                                <div
                                  onClick={() => {
                                    setSelectedOrder(item);
                                    setIsGuestlistModalOpen(true);
                                  }}
                                  className="text-sm font-semibold text-primaryPurple cursor-pointer"
                                >
                                  view
                                </div>
                              </td>
                            </tr>
                          ))}
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      </main>
    </section>
  );
}
