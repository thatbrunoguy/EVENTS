"use client";

import Image from "next/image";
import Header from "../../../components/header/Header";
import Sidebar from "../../../components/sidebar/Sidebar";
import { HiOutlinePlusSm } from "react-icons/hi";
import Link from "next/link";
import { IoIosMore } from "react-icons/io";
import { useState } from "react";
import MobileFooter from "../../../components/footer/MobileFooter";
import { useQuery } from "@tanstack/react-query";
import { eventsManagamentFunctions } from "../../../utils/endpoints";
import PrimaryLoading, {
  PrimaryLoading2,
} from "../../../components/loaders/PrimaryLoading";
import { formatDate, formatTime } from "../../../helpers";

export default function Event() {
  const [options, setOptions] = useState<any>([
    // {
    //   title: " Eko convections centre",
    //   desc: "Lekki paradise estate 3, chevron drive",
    //   date: "Saturday, October 22, 2023 | 7:30pm",
    //   quantity: "0/10000",
    //   price: "Free",
    // },
    // {
    //   title: " Eko convections centre",
    //   desc: "Lekki paradise estate 3, chevron drive",
    //   date: "Saturday, October 22, 2023 | 7:30pm",
    //   quantity: "0/10000",
    //   price: "₦20,000.00 - ₦50,000.00 ",
    // },
    // {
    //   title: " Eko convections centre",
    //   desc: "Lekki paradise estate 3, chevron drive",
    //   date: "Saturday, October 22, 2023 | 7:30pm",
    //   quantity: "0/10000",
    //   price: "Free",
    // },
    // {
    //   title: " Eko convections centre",
    //   desc: "Lekki paradise estate 3, chevron drive",
    //   date: "Saturday, October 22, 2023 | 7:30pm",
    //   quantity: "0/10000",
    //   price: "₦20,000.00",
    // },
    // {
    //   title: " Eko convections centre",
    //   desc: "Lekki paradise estate 3, chevron drive",
    //   date: "Saturday, October 22, 2023 | 7:30pm",
    //   quantity: "0/10000",
    //   price: "Free",
    // },
    // {
    //   title: " Eko convections centre",
    //   desc: "Lekki paradise estate 3, chevron drive",
    //   date: "Saturday, October 22, 2023 | 7:30pm",
    //   quantity: "0/10000",
    //   price: "₦20,000.00",
    // },
    // {
    //   title: " Eko convections centre",
    //   desc: "Lekki paradise estate 3, chevron drive",
    //   date: "Saturday, October 22, 2023 | 7:30pm",
    //   quantity: "0/10000",
    //   price: "Free",
    // },
    // {
    //   title: " Eko convections centre",
    //   desc: "Lekki paradise estate 3, chevron drive",
    //   date: "Saturday, October 22, 2023 | 7:30pm",
    //   quantity: "0/10000",
    //   price: "₦20,000.00 - ₦50,000.00 ",
    // },
  ]);
  const {
    data: events,
    isError,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["events"],
    queryFn: eventsManagamentFunctions.getEvents,
    // staleTime: Infinity,
  });
  return (
    <section className="flex">
      <Sidebar />
      <MobileFooter />

      <main className="h-screen relative overflow-y-scroll flex-1">
        {/* <Header /> */}
        {isLoading ? (
          <div>
            <PrimaryLoading2 />
          </div>
        ) : (
          <div className="w-full flex  h-full justify-center items-center ">
            {events?.length < 1 ? (
              <div className="w-[351px] flex flex-col items-center">
                <Image
                  src="/assets/one.svg"
                  alt="Eventparrot logo"
                  width={165}
                  height={153}
                  priority
                />
                <p className="py-5 text-center">
                  Get ready to make your event happen! Tap below to start
                  planning. Your perfect gathering is just a click away.
                </p>
                <Link
                  href="/dashboard/create/basic-info"
                  className="bg-purple-700 py-[10px] px-5 w-[147px] h-[41px] text-white text-sm rounded-lg flex items-center space-x-[4px]"
                >
                  <div>
                    <HiOutlinePlusSm />
                  </div>
                  <p>Create Event</p>
                </Link>
              </div>
            ) : (
              <div className="w-[90%] mt-[5%] self-start">
                <h2 className="font-semibold text-2xl">Events</h2>

                <Link
                  href="/dashboard/create/basic-info"
                  className="bg-purple-700 mb-10 ml-auto py-[10px] px-5 w-[147px] h-[41px] text-white text-sm rounded-lg flex items-center space-x-[4px]"
                >
                  <div>
                    <HiOutlinePlusSm />
                  </div>
                  <p>Create Event</p>
                </Link>
                <div className="">
                  <header className="w-full text-sm flex items-center py-3 px-4 bg-[#FBFAFC]">
                    <p className="w-[500px]">Ticket name</p>
                    <p className="w-[400px]">Ticket quantity</p>
                    <p className="w-[400px]">Ticket price</p>
                  </header>
                  {events?.map((item: any, index: number) => (
                    <div
                      key={item.id}
                      className="flex w-full border-b items-center justify-between"
                    >
                      <div className="flex items-center space-x-5 p-3 ">
                        <div className="h-[72px] w-[72px] relative rounded overflow-hidden">
                          <Image
                            fill
                            src={item.medias[0].original}
                            alt={item.name}
                            className="object-cover"
                          />
                        </div>
                        <div className="w-[378px] text-sm">
                          <h4 className="font-semibold mb-1">{item.name}</h4>
                          <p className="text-lightText">
                            {item.tickets[0].description}
                          </p>
                          <p className="text-lightText">
                            {`${formatDate(item.start_date)} | ${formatTime(
                              item.start_date
                            )}`}
                          </p>
                        </div>
                        <div className="w-[360px]">
                          {item.tickets[0].quantity || "unlimited"}
                        </div>
                        <div className="w-[310px]">
                          {item.tickets[0].price || "Free"}
                        </div>
                        <div className="text-2xl">
                          <IoIosMore />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </section>
  );
}
