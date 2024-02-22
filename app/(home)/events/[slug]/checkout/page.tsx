"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaMinus, FaPlus } from "react-icons/fa6";
import CheckoutFinal from "./CheckoutFinal";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { guestFunctions } from "@/app/utils/endpoints";
import { formatDate2, formatTime } from "@/app/helpers";
import toast from "react-hot-toast";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import MobileDrawer from "./MobileDrawer";

const Checkout = ({ params }: { params: { slug: string } }) => {
  const [tickets, setTickets] = useState<any>([]);
  const [isFirst, setIsFirst] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const router = useRouter();

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
        tickets:
          data?.tickets.map((ticket: any) => {
            const amount = ticket.price;
            let fees = 0;
            if (amount >= 2000) {
              fees = amount * 0.05 + 100;
            } else {
              fees = amount * 0.05;
            }
            return {
              ...ticket,
              fees: fees,
            };
          }) || [],
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

  const totalCost = useMemo(() => {
    return tickets?.reduce((acc: number, ticket: any) => {
      let ticketCost =
        ticket.quantity * ticket.price + ticket.fees * ticket.quantity;

      return acc + ticketCost;
    }, 0);
  }, [tickets]);

  const totalFees = useMemo(() => {
    return tickets?.reduce((acc: number, ticket: any) => {
      return acc + ticket.fees * ticket.quantity;
    }, 0);
  }, [tickets]);

  const handleMovetoFinalCheckout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("userCheckoutInfo", userCheckoutInfo);

    setIsFirst(true);
  };

  const bookEvent = useMutation({
    mutationFn: guestFunctions.bookEvent,
    retry: 8,
    onError: async (error, variables, context) => {
      if (
        error.message.includes(
          "Cannot read properties of undefined (reading 'url')"
        )
      ) {
        toast.success("You have successfully registered for the Free ticket");
        router.push(`/events/${params.slug}`);
      }
      console.log(` ${error}`);
    },
    onSuccess: async (data, variables, context) => {
      console.log("dddddd", data);

      router.push(data);
      //   router.push("/");
    },
  });

  const checkoutHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("tickets", tickets);
    // const res = calculateTotalPrice();
    // console.log("Total", res);

    const filterOrderFields = () => {
      const addAttendeeTickets = tickets.map((ticket: any) => ({
        ...ticket,
        attendee: {
          ...userCheckoutInfo.attendee,
        },
      }));

      return addAttendeeTickets
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
    };

    const finalOrder = filterOrderFields();
    console.log("finalOrder", { orders: finalOrder });
    const myData = { orders: finalOrder };
    if (finalOrder.length) {
      bookEvent.mutate({ myData, eventId: params?.slug });
    } else {
      toast.error("Kindly select a ticket at least to checkout");
    }
  };

  const handleCloseModal = () => {
    if (!isFirst) {
      router.back();
    } else {
      setIsFirst(false);
    }
  };

  useEffect(() => {
    const updatedTickets = ticket?.tickets.map((ticket: any) => ({
      // startDate: ticket.startDate,
      ...ticket,
      ...userCheckoutInfo,
      ticket_id: ticket.id,
    }));
    setTickets(updatedTickets);
    console.log("updatedTickets", updatedTickets);
  }, [ticket]);
  return (
    <section className="mb-16 mt-8">
      <header className="flex  justify-between items-center py-[18px] border-b px-6">
        <h3 className="font-medium text-lg">Checkout</h3>
        <div
          onClick={handleCloseModal}
          className="text p-2 hover:bg-gray-200 rounded-full cursor-pointer"
        >
          <AiOutlineClose />
        </div>
      </header>

      <main className="flex flex-col items-center md:items-stretch md:flex-row justify-between md:pr-8 mb-6 md:mb-0 ">
        {isFirst ? (
          <form
            onSubmit={checkoutHandler}
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
                // required
                defaultChecked
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
                // required
                defaultChecked
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
              disabled={bookEvent.isPending}
              type="submit"
              // onClick={checkoutHandler}
              className={` ${
                bookEvent.isPending ? "bg-opacity-50 cursor-wait" : ""
              } bg-purple-700 mt-9  py-[10px] px-5 w-full md:w-[244px] h-12 hover:bg-opacity-70 text-white text-sm rounded-lg hidden md:grid place-content-center`}
            >
              <p>Checkout</p>
            </button>

            <hr className="mt-8 md:mt-12" />

            <div className="flex items-center space-x-1 justify-center mt-4 md:mt-5">
              <p className="text-sm md:text-base">Powered by</p>
              <Image
                src="/assets/poweredby.svg"
                alt="Eventparrot logo"
                width={67}
                height={14}
                //   priority
              />
            </div>

            <div className="block md:hidden">
              <MobileDrawer
                isMobileDrawerOpen={isMobileDrawerOpen}
                setIsMobileDrawerOpen={setIsMobileDrawerOpen}
                tickets={tickets}
                totalCost={totalCost}
                totalFees={totalFees}
              />
            </div>

            <div className=" md:hidden z-[99999] h-32 fixed left-0 right-0 bg-white border-t flex  items-center justify-center bottom-0">
              <div className="text-primaryPurple text-xs md:text-sm">
                <div className="absolute top-3 right-4 text-sm flex items-center gap-3">
                  <div
                    onClick={() => setIsMobileDrawerOpen((prev) => !prev)}
                    className="text-base"
                  >
                    {isMobileDrawerOpen ? (
                      <div>
                        <IoChevronUpOutline />
                      </div>
                    ) : (
                      <div>
                        <IoChevronDownOutline />
                      </div>
                    )}
                  </div>
                  <p onClick={() => setIsMobileDrawerOpen((prev) => !prev)}>
                    ₦{totalCost}
                  </p>
                </div>
              </div>
              <button
                disabled={bookEvent.isPending}
                type="submit"
                // onClick={checkoutHandler}
                className={` ${
                  bookEvent.isPending ? "bg-opacity-50 cursor-wait" : ""
                } bg-purple-700 h-12 w-[186px] hover:bg-opacity-70 text-white text-sm rounded-lg grid place-content-center`}
              >
                <p>Checkout</p>
              </button>
            </div>
          </form>
        ) : (
          <CheckoutFinal
            ticketsData={ticket}
            userCheckoutInfo={userCheckoutInfo}
            tickets={tickets}
            setTickets={setTickets}
            eventId={params.slug}
            handleMovetoFinalCheckout={handleMovetoFinalCheckout}
            totalCost={totalCost}
          />
        )}

        {/* RIGHT */}
        <div className="hidden md:block mt-8 w-[94%] md:w-auto">
          <div
            className={`overflow-hidden ${
              !isFirst ? "hidden md:block" : ""
            } relative w-full md:w-[394px] h-[200px] rounded-tl-2xl rounded-tr-2xl`}
          >
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

          <div
            className={`px-5 mt-5 ${
              !isFirst ? "hidden md:block" : ""
            }  bg-white shadow-md rounded-bl-2xl rounded-br-2xl`}
          >
            <h3 className="text-lg font-medium">Order summary</h3>
            {tickets?.map((item: any) => (
              <div key={item.ticket_id}>
                {item.quantity > 0 && (
                  <div className="flex items-center justify-between text-lightText py-4 border-b">
                    <p className="">{`${item.name} x ${item.quantity} `}</p>
                    <p className="">
                      {item.price ? `₦${item.price * item.quantity}` : "Free"}
                    </p>
                  </div>
                )}
              </div>
            ))}
            <div className="">
              <div className="flex items-center font-light justify-between text-sm  py-2 ">
                <p className="">Fees</p>
                <p className="">₦{totalFees}</p>
              </div>
              <div className="flex items-center justify-between text-sm  py-6 ">
                <p className="">Total</p>
                <p className="">₦{totalCost}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Checkout;
