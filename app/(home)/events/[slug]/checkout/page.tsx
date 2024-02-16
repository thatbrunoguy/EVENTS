"use client";

import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaMinus, FaPlus } from "react-icons/fa6";
import CheckoutFinal from "./CheckoutFinal";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { guestFunctions } from "@/app/utils/endpoints";
import { formatDate2, formatTime } from "@/app/helpers";

const Checkout = ({ params }: { params: { slug: string } }) => {
  const [tickets, setTickets] = useState<any>([]);
  const [isFirst, setIsFirst] = useState(true);

  const router = useRouter();

  console.log("slug", params.slug);

  const {
    data: ticket,
    isError,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["events-guest", params.slug],
    queryFn: () => guestFunctions.getEventsById(params.slug),
    select: (data) => {
      const selectedData = {
        name: data.name || null,
        img: data?.medias?.[0]?.original || null,
        tickets: data?.tickets || [],
        address: data.locations[0]?.address || "Online",
        startDate: data.start_date
          ? `${formatDate2(data.start_date)} | ${formatTime(data.start_date)}`
          : null,
        endDate: data.start_date || null,
      };

      return selectedData;
    },
  });

  const [userCheckoutInfo, setUserCheckoutInfo] = useState({
    quantity: 0,
    attendee: {
      first_name: "",
      last_name: "",
      email: "",
    },
  });

  const handleMovetoFinalCheckout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("userCheckoutInfo", userCheckoutInfo);

    setIsFirst(false);
  };

  return (
    <section className="mb-16 mt-8">
      <header className="flex  justify-between items-center py-[18px] border-b px-6">
        <h3 className="font-medium text-lg">Checkout</h3>
        <div
          onClick={() => router.back()}
          className="text p-2 hover:bg-gray-200 rounded-full cursor-pointer"
        >
          <AiOutlineClose />
        </div>
      </header>

      <main className="flex flex-col items-center md:items-stretch md:flex-row justify-between md:pr-8 mb-6 md:mb-0 ">
        {isFirst ? (
          <form
            onSubmit={handleMovetoFinalCheckout}
            className="mt-8 w-[94%] md:w-[50%] md:pl-8"
          >
            <div className="flex items-center space-x-6 ">
              <div className="basis-1/2">
                <label
                  className="text-sm text-gray-800"
                  htmlFor="organizerName"
                >
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  value={userCheckoutInfo.attendee.first_name}
                  onChange={(e) =>
                    setUserCheckoutInfo((prev) => ({
                      ...prev,
                      attendee: {
                        ...prev.attendee,
                        first_name: e.target.value,
                      },
                    }))
                  }
                  type="text"
                  required
                  className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
                />
              </div>
              <div className="basis-1/2">
                <label
                  className="text-sm text-gray-800"
                  htmlFor="organizerName"
                >
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  value={userCheckoutInfo.attendee.last_name}
                  onChange={(e) =>
                    setUserCheckoutInfo((prev) => ({
                      ...prev,
                      attendee: { ...prev.attendee, last_name: e.target.value },
                    }))
                  }
                  type="text"
                  required
                  className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
                />
              </div>
            </div>

            {/* <div className="my-6">
              <label className="text-sm text-gray-800" htmlFor="organizerName">
                Order Ticket <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center w-full space-x-6 ">
                <div className="bg-[#F8F8F8] flex items-center justify-between px-7 h-14 flex-1">
                  <p>{tokens}</p>
                  <p>Tickets</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setTokens((prev) => (prev += 1))}
                    className="w-14 h-14 bg-lightPurple hover:bg-primaryPurple hover:text-white text-primaryPurple rounded-md grid place-content-center"
                  >
                    <p>
                      <FaPlus />
                    </p>
                  </button>
                  <button
                    onClick={() => setTokens((prev) => (prev -= 1))}
                    className="w-14 h-14 bg-lightPurple hover:bg-primaryPurple hover:text-white text-primaryPurple rounded-md grid place-content-center"
                  >
                    <p>
                      <FaMinus />
                    </p>
                  </button>
                </div>
              </div>
            </div> */}

            <div className="my-6">
              <label className="text-sm text-gray-800" htmlFor="organizerName">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                value={userCheckoutInfo.attendee.email}
                onChange={(e) =>
                  setUserCheckoutInfo((prev) => ({
                    ...prev,
                    attendee: { ...prev.attendee, email: e.target.value },
                  }))
                }
                type="text"
                required
                className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
              />
            </div>

            {/* ACCEPT */}

            <div className="flex items-center font-light text-sm  space-x-3 mt-3 md:mt-9">
              <input
                required
                className="block w-4 h-4 accent-primaryPurple"
                type="checkbox"
                name=""
                id=""
              />
              <p>
                Keep me updated on more events and news from this event
                organizer{" "}
              </p>
            </div>
            <div className="flex items-center font-light text-sm space-x-3 mt-3 md:mt-3">
              <input
                required
                className="block w-4 h-4 accent-primaryPurple"
                type="checkbox"
                name=""
                id=""
              />
              <p>
                Send me emails about the best events happening nearby or online
              </p>
            </div>

            <p className="text-sm font-light mt-8">
              By selecting Buy Ticket, I agree to the{" "}
              <Link
                className="underline underline-offset-2 text-primaryPurple"
                href="/terms"
              >
                Eventsparrot Terms of Service
              </Link>
            </p>

            {/* BUY TOKEN */}

            <button
              type="submit"
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
                //   priority
              />
            </div>
          </form>
        ) : (
          <CheckoutFinal
            ticketsData={ticket}
            userCheckoutInfo={userCheckoutInfo}
            tickets={tickets}
            setTickets={setTickets}
            eventId={params.slug}
          />
        )}

        {/* RIGHT */}
        <div className="mt-8 w-[94%] md:w-auto">
          <div className="overflow-hidden relative w-full md:w-[394px] h-[200px] rounded-tl-2xl rounded-tr-2xl">
            {ticket && ticket?.img && (
              <Image
                className="object-cover"
                src={ticket.img}
                alt="Eventparrot event"
                fill
                // width={394}
                // height={200}
                //   priority
              />
            )}
          </div>

          {isFirst ? (
            <div className="px-5 mt-5 bg-white md:w-[394px] shadow-md rounded-bl-2xl rounded-br-2xl">
              <h3 className="text-lg font-medium">Event Summary</h3>
              <div className="flex flex-col justify-between  py-4 border-b">
                <p className="">Event name</p>
                <p className="text-lightText">{ticket?.name}</p>
              </div>
              <p className="mt-2">Venue</p>
              <div className="flex items-center justify-between text-lightText py-4 border-b">
                <p className="text-wrap">{ticket?.address}</p>
              </div>
              <p className="mt-2">Event Date</p>
              <div className="flex items-center justify-between text-lightText py-4 border-b">
                <p className="">{ticket?.startDate}</p>
              </div>
              {/* <div className="flex items-center justify-between  py-6 ">
                <p className="">Total</p>
                <p className="">₦0.00</p>
              </div> */}
            </div>
          ) : (
            <div className="px-5 mt-5 bg-white shadow-md rounded-bl-2xl rounded-br-2xl">
              <h3 className="text-lg font-medium">Order summary</h3>
              {tickets?.map((item: any) => (
                <div key={item.ticket_id}>
                  <div className="flex items-center justify-between text-lightText py-4 border-b">
                    <p className="">Ticket price</p>
                    <p className="">{item.price ? `₦${item.price}` : "Free"}</p>
                  </div>
                  <div className="flex items-center justify-between text-lightText py-4 border-b">
                    <p className="">Orders</p>
                    <p className="">{item.quantity}</p>
                  </div>
                  <div className="flex items-center justify-between text-lightText py-4 border-b">
                    <p className="">Ticket fee</p>
                    <p className="">
                      {item.price >= 2000
                        ? `₦${item.price * 0.05 + 100}`
                        : item.price < 2000
                        ? `₦${item.price * 0.05}`
                        : item.price === 0
                        ? "Free"
                        : ""}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between  py-6 ">
                <p className="">Total</p>
                <p className="">₦0.00</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </section>
  );
};

export default Checkout;
