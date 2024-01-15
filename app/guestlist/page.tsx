"use client";

import Image from "next/image";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
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

export default function Guestlist() {
  const [tickets, setTickets] = useState<any>([
    {
      name: " Eko convections centre",
      quantity: 3,
      buyerName: "Emmanuel Adeseye Adediran",
      orderNumber: "T2LQR0JAYZ",
      date: "Nov 11, 2024",
    },
    {
      name: " Eko convections centre",
      quantity: 3,
      buyerName: "Emmanuel Adeseye Adediran",
      orderNumber: "T2LQR0JAYZ",
      date: "Nov 11, 2024",
    },
    {
      name: " Eko convections centre",
      quantity: 3,
      buyerName: "Emmanuel Adeseye Adediran",
      orderNumber: "T2LQR0JAYZ",
      date: "Nov 11, 2024",
    },
    {
      name: " Eko convections centre",
      quantity: 3,
      buyerName: "Emmanuel Adeseye Adediran",
      orderNumber: "T2LQR0JAYZ",
      date: "Nov 11, 2024",
    },
    {
      name: " Eko convections centre",
      quantity: 3,
      buyerName: "Emmanuel Adeseye Adediran",
      orderNumber: "T2LQR0JAYZ",
      date: "Nov 11, 2024",
    },
    {
      name: " Eko convections centre",
      quantity: 3,
      buyerName: "Emmanuel Adeseye Adediran",
      orderNumber: "T2LQR0JAYZ",
      date: "Nov 11, 2024",
    },
    {
      name: " Eko convections centre",
      quantity: 3,
      buyerName: "Emmanuel Adeseye Adediran",
      orderNumber: "T2LQR0JAYZ",
      date: "Nov 11, 2024",
    },
    {
      name: " Eko convections centre",
      quantity: 3,
      buyerName: "Emmanuel Adeseye Adediran",
      orderNumber: "T2LQR0JAYZ",
      date: "Nov 11, 2024",
    },
    {
      name: " Eko convections centre",
      quantity: 3,
      buyerName: "Emmanuel Adeseye Adediran",
      orderNumber: "T2LQR0JAYZ",
      date: "Nov 11, 2024",
    },
    {
      name: " Eko convections centre",
      quantity: 3,
      buyerName: "Emmanuel Adeseye Adediran",
      orderNumber: "T2LQR0JAYZ",
      date: "Nov 11, 2024",
    },
    {
      name: " Eko convections centre",
      quantity: 3,
      buyerName: "Emmanuel Adeseye Adediran",
      orderNumber: "T2LQR0JAYZ",
      date: "Nov 11, 2024",
    },
    {
      name: " Eko convections centre",
      quantity: 3,
      buyerName: "Emmanuel Adeseye Adediran",
      orderNumber: "T2LQR0JAYZ",
      date: "Nov 11, 2024",
    },
  ]);

  const [isGuestlistModalOpen, setIsGuestlistModalOpen] =
    useState<boolean>(false);

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
      <main className="h-screen overflow-y-scroll flex-1">
        <Header />
        {!tickets.length ? (
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
                Guests who purchased your ticket will appear her
              </p>
            </div>
          </div>
        ) : (
          <div className="w-[95%] mt-6 mx-auto">
            <div className="w-full mb-9">
              <DashHeader />
            </div>
            {isGuestlistModalOpen && (
              <GuestlistModal
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
            <div className="">
              <header className="w-full bg-[#FBFAFC] text-sm grid grid-flow-col  py-3 px-4 ">
                <p className="col-span-3">Ticket name</p>
                <p className="">Ticket quantity</p>
                <p className="col-span-4 justify-self-center">Buyer name</p>
                <p className="col-span-2">Order number</p>
                <p className="">Order date</p>
                <p className="w-1/6"></p>
              </header>
              {tickets.map((item: any, index: number) => (
                <div
                  key={index}
                  className="w-full border-b grid grid-flow-col  p-3 py-4 text-sm"
                >
                  <h4 className="font-semibold col-span-3">{item.name}</h4>
                  <p className="text-lightText">{item.quantity}</p>
                  <p className="text-lightText col-span-4 justify-self-center">
                    {item.buyerName}
                  </p>
                  <div className="col-span-2">{item.orderNumber}</div>
                  <div className="">{item.date}</div>
                  <div
                    onClick={() => setIsGuestlistModalOpen(true)}
                    className="text-sm font-semibold text-primaryPurple cursor-pointer"
                  >
                    view
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </section>
  );
}
