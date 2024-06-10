"use client";

import MobileFooter from "@/app/components/footer/MobileFooter";
import Sidebar from "@/app/components/sidebar/Sidebar";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { GoInfo } from "react-icons/go";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaMoneyBills } from "react-icons/fa6";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { payoutFn } from "@/app/utils/endpoints/payout";
import { useQuery } from "@tanstack/react-query";

const Payout = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);

  const goBack = () => {
    router.push("/dashboard");
  };

  const {
    data: payoutData,
    isLoading,
    refetch: refetchEvent,
  } = useQuery({
    queryKey: ["payouts", { page }],
    queryFn: () => payoutFn.getPayouts({ page } as any),
    // select: (data) => {
    //   const selectedEvents: = data?.events.map(
    //     (event) => {
    //       const startDate = event.start_date
    //         ? `${formatDate(event.start_date)} | ${formatTime(
    //             event.start_date
    //           )}`
    //         : null;
    //       const quantity =
    //         event.tickets[0]?.stock_qty != null
    //           ? event.tickets[0].stock_qty
    //           : null;
    //       const lowestPrice = Math.min(
    //         ...event.tickets.map((ticket: any) => ticket.price)
    //       );
    //       const highestPrice = Math.max(
    //         ...event.tickets.map((ticket: any) => ticket.price)
    //       );
    //       const desc = event.tickets[0]?.description || null;
    //       const img = event.medias[0]?.original || null;
    //       const address = event.locations[0]?.address || "Online";
    //       const status = event.status;

    //       return {
    //         id: event.id || null,
    //         name: event.name || null,
    //         startDate,
    //         quantity,
    //         desc,
    //         img,
    //         address,
    //         status,
    //         lowestPrice,
    //         highestPrice,
    //         slug: event.slug || null,
    //       };
    //     }
    //   );

    //   return {
    //     events: selectedEvents,
    //     pagination: data.pagination,
    //   };
    // },
  });

  console.log("payoutData", payoutData);

  const adsCampaign = [
    {
      title: "Paid",
      value: "₦266,679.00",
      icon: <FaMoneyBills color="#D90BD9" />,
      background: "#FCEDFC",
    },
    {
      title: "Net sales",
      value: 30,
      icon: <FaMoneyBills color="#106BD5" />,
      background: "#EDF4FC",
    },
  ];

  return (
    <section className="flex">
      <Sidebar />
      <MobileFooter />

      <main className="h-screen pb-24 md:pb-0 overflow-y-scroll flex-1 ">
        <div className="h-10 border-b w-full" />
        <div
          className="flex gap-3 items-center mx-[24px] my-3 font-medium cursor-pointer"
          onClick={goBack}
        >
          <BiArrowBack />
          <p className="text-primaryPurple">Go back</p>
        </div>

        <div className="w-full mb-14 mx-[24px]">
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={"5%"}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="h-auto"
          >
            {adsCampaign.map((item, i) => (
              <SwiperSlide
                key={i}
                style={{ width: "300px" }}
                className=" relative p-4 h-[140px] mb-12 bg-white shadow-lg rounded-e-md  border-[.4px] border-gray-300"
              >
                <div className="absolute cursor-pointer top-4 right-4 text-sm">
                  <GoInfo />
                </div>
                <div
                  style={{ backgroundColor: item.background }}
                  className="h-11 w-11 text-xl rounded-full grid place-content-center"
                >
                  {item.icon}
                </div>

                <p className="font-semibold text-2xl my-2">{item.value}</p>
                <p className="text-sm text-lightText">{item.title}</p>
              </SwiperSlide>
            ))}
          </Swiper>

          <table className="w-full text-xs md:text-sm">
            <thead className="h-[50px]">
              <tr className="py-3 px-4 bg-[#FBFAFC]">
                <th className="w-[30%] text-left text-sm font-medium">
                  Amount
                </th>
                <th className="text-left text-sm font-medium">Payout to</th>
                <th className="text-left text-sm font-medium">Date</th>
                <th className="text-left text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </main>
    </section>
  );
};

export default Payout;
