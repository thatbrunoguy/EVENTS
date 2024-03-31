"use client";

import { formatDate } from "@/app/helpers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const CheckoutFinal = ({
  tickets,
  setTickets,
  totalCost,
  handleMovetoFinalCheckout,
}: any) => {
  const router = useRouter();

  const increaseQuantity = (index: number) => {
    const updatedTickets = [...tickets];
    updatedTickets[index].quantity = Math.max(
      0,
      updatedTickets[index].quantity + 1
    );
    setTickets(updatedTickets);
  };

  const decreaseQuantity = (index: number) => {
    const updatedTickets = [...tickets];
    updatedTickets[index].quantity = Math.max(
      0,
      updatedTickets[index].quantity - 1
    );
    setTickets(updatedTickets);
  };

  return (
    <div className=" w-[94%] md:w-[50%] md:pl-8">
      <div>
        {tickets?.map((ticket: any, i: number) => (
          <div
            key={i}
            className="flex items-center justify-between py-6 border-b"
          >
            <div>
              <p className="text-base md:text-xl">{ticket.name}</p>
              <p className="font-light mt-3 mb-1 text-sm md:text-base">
                {ticket.type === 1 ? "Free" : "Paid"} | Ends on{" "}
                {formatDate(ticket.endDate)}
              </p>
              <div className="flex items-center gap-8">
                <p className="text-primaryPurple text-xs md:text-sm">
                  ₦{ticket?.price}
                </p>
                <p className="text-primaryPurple  text-[10px] md:text-xs">
                  + Fees ₦{ticket?.fees}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 ">
              <button
                onClick={() => increaseQuantity(i)}
                className=" w-10 h-10 md:w-14 md:h-14 bg-lightPurple hover:bg-primaryPurple hover:text-white text-primaryPurple rounded-md grid place-content-center"
              >
                <p>
                  <FaPlus />
                </p>
              </button>
              <p className="text-base md:text-2xl">{ticket.quantity}</p>
              <button
                onClick={() => decreaseQuantity(i)}
                className=" w-10 h-10 md:w-14 md:h-14 bg-lightPurple hover:bg-primaryPurple hover:text-white text-primaryPurple rounded-md grid place-content-center"
              >
                <p>
                  <FaMinus />
                </p>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className=" md:hidden   h-32 fixed left-0 right-0 bg-white border-t flex  items-center justify-center bottom-0">
        <div className="text-primaryPurple text-xs md:text-sm">
          <p className="absolute top-3 right-4 text-sm">₦{totalCost}</p>
        </div>
        <button
          onClick={handleMovetoFinalCheckout}
          className="h-12 w-[186px] rounded-md bg-primaryPurple hover:bg-opacity-50 text-sm text-white  grid place-content-center"
        >
          <p>Buy Ticket</p>
        </button>
      </div>

      <div className="hidden md:block">
        <button
          onClick={handleMovetoFinalCheckout}
          className="bg-purple-700 mt-6 py-[10px] px-5 w-full md:w-[244px] h-12 hover:bg-opacity-70 text-white text-sm rounded-lg grid place-content-center"
        >
          <p>Buy Ticket</p>
        </button>
        <hr className="mt-12" />

        <div className="flex items-center space-x-1 justify-center mt-5">
          <p>Powered by</p>
          <Image
            src="/assets/poweredby.svg"
            alt="Eventparrot logo"
            width={67}
            height={14}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutFinal;
