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
import { authFunctions } from "@/app/utils/endpoints";
import moment from "moment";
import { PrimaryLoading2 } from "@/app/components/loaders/PrimaryLoading";
import PayoutModal from "./PayoutModal";
import { maskNumber } from "@/app/helpers";

const Payout = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const goBack = () => {
    router.push("/dashboard");
  };

  const {
    data,
    isLoading,
    refetch: refetchPayouts,
  } = useQuery({
    queryKey: ["payouts", { page }],
    queryFn: () => payoutFn.getPayouts({ page } as any),
  });

  const { data: walletData, refetch } = useQuery({
    queryKey: ["wallet"],
    queryFn: authFunctions.getUserToken,
  });

  const payoutData = data?.events;
  const pagination = data?.pagination;
  const totalPages = pagination?.meta?.last_page;

  const adsCampaign = [
    {
      title: "Paid",
      value: `₦${walletData?.debit || 0}`,
      icon: <FaMoneyBills color="#D90BD9" />,
      background: "#FCEDFC",
    },
    {
      title: "Net sales",
      value: `₦${walletData?.balance || 0}`,
      icon: <FaMoneyBills color="#106BD5" />,
      background: "#EDF4FC",
    },
  ];

  return (
    <section className="flex">
      <Sidebar />
      <MobileFooter />

      {isLoading ? (
        <PrimaryLoading2 />
      ) : (
        <main className="h-screen pb-24 md:pb-0 overflow-y-scroll overflow-x-hidden flex-1 ">
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
              {adsCampaign?.map((item, i) => (
                <SwiperSlide
                  key={i}
                  style={{ width: "250px" }}
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
              <SwiperSlide
                style={{ width: "350px" }}
                className=" relative p-4 h-full mb-12 bg-white shadow-lg rounded-e-md  border-[.4px] border-gray-300 flex flex-col gap-5"
              >
                <div>
                  <div>
                    <div className="text-sm">
                      Next payment -{" "}
                      <span className="font-medium">
                        {walletData?.next_payout_in
                          ? moment(walletData?.next_payout_in).format(
                              "MMMM DD, YYYY"
                            )
                          : "Not available"}
                      </span>
                    </div>
                  </div>
                  <div className="flex text-sm gap-6 items-center">
                    <button
                      onClick={() => setOpenModal(true)}
                      disabled={!walletData?.available_payout}
                      className="bg-primaryPurple text-sm text-white p-2 rounded-md w-[200px] whitespace-nowrap"
                    >
                      Withdraw earnings
                    </button>
                    <div>
                      <p className="whitespace-nowrap">
                        Available -{" "}
                        <span>
                          {walletData?.available_payout
                            ? `₦${walletData?.available_payout}`
                            : "Not available"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
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
              <tbody>
                {payoutData?.map((payout: any, i: number) => (
                  <tr
                    key={i}
                    className={` py-4 px-4 bg-white border-b border-[#eaeaea]`}
                  >
                    <td className="w-[30%] text-sm py-3">₦{payout.amount}</td>
                    <td className="text-sm py-3">
                      <div>
                        <p>{payout?.bank?.bank_name}</p>
                        <p className="text-sm py-3 text-[#706D73]">
                          {maskNumber(payout?.bank?.account_number)}
                        </p>
                      </div>
                    </td>
                    <td className="text-sm py-3">
                      {moment(payout?.created_at).format(
                        "MMMM DD, YYYY | hh:mm a"
                      )}
                    </td>
                    <td className="text-sm py-3  ">
                      <p className="bg-lightGreen text-primaryGreen rounded-xl p-3 w-[100px] flex justify-center items-center">
                        {payout.status === 1 ? "Pending" : "Successful"}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}
      {openModal && (
        <PayoutModal
          setIsModalOpen={setOpenModal}
          highestPayout={walletData?.available_payout}
        />
      )}
    </section>
  );
};

export default Payout;
