"use client";

import { formatDate } from "@/app/helpers";
import { guestFunctions } from "@/app/utils/endpoints";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaMinus, FaPlus } from "react-icons/fa6";

const dummyTickets = [
  {
    name: "Single  pass",
    type: "Paid",
    endDate: "Nov 9 2024",
    quantity: 0,
  },
  {
    name: "Single  pass",
    type: "Paid",
    endDate: "Nov 9 2024",
    quantity: 0,
  },
  {
    name: "Single  pass",
    type: "Paid",
    endDate: "Nov 9 2024",
    quantity: 0,
  },
  {
    name: "Single  pass",
    type: "Paid",
    endDate: "Nov 9 2024",
    quantity: 0,
  },
];

type Attendee = {
  first_name: string;
  last_name: string;
  email: string;
};

type Ticket = {
  created_at: string;
  description: string;
  id: string;
  name: string;
  price: number;
  status: number;
  type: number;
};

type TicketWithCheckoutInfo = Ticket & {
  quantity: number;
  attendee: Attendee;
};

type UserCheckoutInfo = {
  ticket_id: string;
  quantity: number;
  attendee: Attendee;
};

const CheckoutFinal = ({
  ticketsData,
  userCheckoutInfo,
  tickets,
  setTickets,
  eventId,
}: any) => {
  const router = useRouter();

  const bookEvent = useMutation({
    mutationFn: guestFunctions.bookEvent,
    onError: async (error, variables, context) => {
      console.log(` ${error}`);
    },
    onSuccess: async (data, variables, context) => {
      console.log("data", data);
      //   router.push("/");
    },
  });

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    tickets.forEach((ticket: any) => {
      if (ticket.price >= 2000) {
        totalPrice += ticket.price * 0.05 + 100;
      } else if (ticket.price < 2000) {
        totalPrice += ticket.price * 0.05;
      } else if (ticket.price === 0) {
        totalPrice += 0;
      }
    });

    return totalPrice;
  };

  useEffect(() => {
    const updatedTickets = ticketsData?.tickets.map((ticket: any) => ({
      startDate: ticketsData.startDate,
      ...ticket,
      ...userCheckoutInfo,
      ticket_id: ticket.id,
    }));
    setTickets(updatedTickets);
  }, [ticketsData]);

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

  const checkoutHandler = () => {
    console.log("tickets", tickets);
    // const res = calculateTotalPrice();
    // console.log("Total", res);

    function filterOrderFields() {
      return tickets.map((ticket: any) => {
        const {
          ticket_id,
          quantity,
          attendee: { first_name, last_name, email },
        } = ticket;
        return {
          ticket_id,
          quantity,
          attendee: { first_name, last_name, email },
        };
      });
    }

    const finalOrder = filterOrderFields();
    console.log("finalOrder", { orders: finalOrder });
    const myData = { orders: finalOrder };
    bookEvent.mutate({ myData, eventId });
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
              <p className=" text-xl">{ticket.name}</p>
              <p className="font-light mt-3">
                {ticket.type === 1 ? "Free" : "Paid"} | Ends on{" "}
                {formatDate(ticket.endDate)}
              </p>
            </div>

            <div className="flex items-center gap-3 ">
              <button
                onClick={() => increaseQuantity(i)}
                className="w-14 h-14 bg-lightPurple hover:bg-primaryPurple hover:text-white text-primaryPurple rounded-md grid place-content-center"
              >
                <p>
                  <FaPlus />
                </p>
              </button>
              <p className=" text-2xl">{ticket.quantity}</p>
              <button
                onClick={() => decreaseQuantity(i)}
                className="w-14 h-14 bg-lightPurple hover:bg-primaryPurple hover:text-white text-primaryPurple rounded-md grid place-content-center"
              >
                <p>
                  <FaMinus />
                </p>
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={checkoutHandler}
        className="bg-purple-700 mt-9 py-[10px] px-5 w-full md:w-[244px] h-12 hover:bg-opacity-70 text-white text-sm rounded-lg grid place-content-center"
      >
        <p>Checkout</p>
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
  );
};

export default CheckoutFinal;
