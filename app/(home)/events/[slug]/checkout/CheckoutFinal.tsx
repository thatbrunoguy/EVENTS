"use client";

import { formatDate } from "@/app/helpers";
import { guestFunctions } from "@/app/utils/endpoints";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { FaMinus, FaPlus } from "react-icons/fa6";

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
      if (
        error.message.includes(
          "Cannot read properties of undefined (reading 'url')"
        )
      ) {
        toast.success("You have successfully registered for the Free ticket");
        router.push(`/events/${eventId}`);
      }
      console.log(` ${error}`);
    },
    onSuccess: async (data, variables, context) => {
      console.log("dddddd", data);

      router.push(data);
      //   router.push("/");
    },
  });

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
      return tickets
        .filter((ticket: any) => ticket.quantity > 0)
        .map((ticket: any) => {
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
    if (finalOrder.length) {
      bookEvent.mutate({ myData, eventId });
    } else {
      toast.error("Kindly select a ticket at least to checkout");
    }
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
        disabled={bookEvent.isPending}
        onClick={checkoutHandler}
        className={` ${
          bookEvent.isPending ? "bg-opacity-50 cursor-wait" : ""
        } bg-purple-700 mt-9 py-[10px] px-5 w-full md:w-[244px] h-12 hover:bg-opacity-70 text-white text-sm rounded-lg grid place-content-center`}
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
