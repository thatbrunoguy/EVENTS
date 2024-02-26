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
import { useQuery } from "@tanstack/react-query";
import { eventsManagamentFunctions } from "@/app/utils/endpoints";
import { PrimaryLoading2 } from "@/app/components/loaders/PrimaryLoading";

export interface OrderData {
  name: string;
  quantity: number;
  buyerName: string;
  orderNumber: string;
  date: string;
  email: string;
  stockQuantity: number;
  amount: number;
  fees: number;
  stat?: any;
}

export default function Guestlist() {
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

  // console.log("selectedEvent-Guestlist", selectedEvent);
  const {
    data: guestlistOrders,
    isError,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["event-guestlist", selectedEvent.eventId],
    queryFn: () =>
      eventsManagamentFunctions.getEventGuestlist(selectedEvent?.eventId),
    enabled: selectedEvent.eventId ? true : false,
    select: (data): OrderData[] => {
      return data.map((item: any) => {
        const { user, ticket, order_number, created_at, quantity } = item;
        const amount = ticket.price * quantity;
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
          const { ticket } = item;
          const ticketName = ticket.name;
          ticketCounts[ticketName] = (ticketCounts[ticketName] || 0) + 1;
        });

        const stat = Object.entries(ticketCounts).map(
          ([ticketName, count]) => ({
            ticketName,
            count,
          })
        );

        return {
          name: ticket.name,
          quantity: ticket.stock_qty,
          buyerName: `${user.first_name} ${user.last_name}`,
          orderNumber: order_number,
          date: new Date(created_at).toLocaleDateString(),
          email: user.email,
          price: ticket.price,
          stockQuantity: ticket.stock_qty,
          amount: amount,
          fees: fees,
          stat: stat,
        };
      });
    },
  });

  // console.log("guestlistOrders-with stat", guestlistOrders);

  const exportCSV = () => {
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
                    <DashHeader stat={guestlistOrders[0].stat} />
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
                  >
                    <div>
                      <PiShareLight />
                    </div>
                    <p>Export as CSV</p>
                  </button>
                  <div className="w-full overflow-x-scroll">
                    <div className="w-[250vw] lg:w-full ">
                      <header className="w-full bg-[#FBFAFC] text-sm grid grid-flow-col  py-3 px-4 ">
                        <p className="col-span-3">Ticket name</p>
                        <p className="">Ticket quantity</p>
                        <p className="col-span-4 justify-self-center">
                          Buyer name
                        </p>
                        <p className="col-span-2">Order number</p>
                        <p className="">Order date</p>
                        <p className="w-1/6"></p>
                      </header>
                      {guestlistOrders &&
                        guestlistOrders?.map((item: any, index: number) => (
                          <div
                            key={index}
                            className="w-full border-b grid grid-flow-col  p-3 py-4 text-sm"
                          >
                            <h4 className="font-semibold col-span-3">
                              {item.name}
                            </h4>
                            <p className="text-lightText ml-20">
                              {item.quantity}
                            </p>
                            <p className="text-lightText col-span-4 justify-self-center">
                              {item.buyerName}
                            </p>
                            <div className="col-span-2">{item.orderNumber}</div>
                            <div className="">{item.date}</div>
                            <div
                              onClick={() => {
                                setSelectedOrder(item);
                                setIsGuestlistModalOpen(true);
                              }}
                              className="text-sm font-semibold text-primaryPurple cursor-pointer"
                            >
                              view
                            </div>
                          </div>
                        ))}
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
