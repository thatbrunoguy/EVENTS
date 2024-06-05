"use client";

import Image from "next/image";
import Header from "../../../components/header/Header";
import Sidebar from "../../../components/sidebar/Sidebar";

import { useState } from "react";
import { PiShareLight } from "react-icons/pi";
import DashHeader from "./Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { IoMailOpenSharp } from "react-icons/io5";
import MobileFooter from "../../../components/footer/MobileFooter";
import BuyTokenModal from "../campaigns/create/ads/BuyTokenModal";
import { authFunctions } from "@/app/utils/endpoints";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import PrimaryLoading from "@/app/components/loaders/PrimaryLoading";
import Pagination from "@/app/components/pagination/Pagination";

export default function Guestlist() {
  const [page, setPage] = useState<number>(1);
  const { data: userTransaction, isLoading } = useQuery({
    queryKey: ["getToken", { page }],
    queryFn: () => authFunctions.getUserTransactions(page as any),
  });

  const [openTokenModal, setOpenTokenModal] = useState<boolean>(false);
  const [isGuestlistModalOpen, setIsGuestlistModalOpen] =
    useState<boolean>(false);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) return <PrimaryLoading />;

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
        {!userTransaction?.events?.length ? (
          <div className="flex justify-center items-center w-full h-[80%]">
            <div className="w-[351px] flex flex-col items-center">
              <Image
                src="/assets/sales.svg"
                alt="Eventparrot logo"
                width={210}
                height={180}
                priority
              />
              <p className="py-5 text-center w-[75%] text-lightText">
                Buy token to promote campaigns of all your event
              </p>

              <button
                className="px-5 py-[10px] rounded-md bg-primaryPurple"
                onClick={() => setOpenTokenModal(true)}
              >
                <p className="text-sm text-white">Buy Token</p>
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="w-[95%] mt-6 mx-auto">
              <div className="w-full mb-9">
                <DashHeader />
              </div>
            </div>

            {/* -------- PAYMENT HISTORY --------- */}

            <div className="w-[95%] mt-12 mx-auto">
              {/* <div className="flex items-center justify-end mt-10 mb-8">
                <button
                  onClick={exportCSV}
                  className="border-primaryPurple border text-primaryPurple py-[10px] px-5 w-auto h-[41px] hover:bg-primaryPurple hover:text-white text-sm rounded-lg flex items-center space-x-[4px]"
                >
                  <div>
                    <PiShareLight />
                  </div>
                  <p>Export as CSV</p>
                </button> */}
              {/* </div> */}

              <div className="">
                <table className="w-full text-xs md:text-sm">
                  <thead className="h-[50px]">
                    <tr className="py-3 px-4 bg-[#FBFAFC]">
                      <th className="w-[30%] text-left">Transactions ID</th>
                      <th className="text-left">Payment date</th>
                      <th className="text-left">Payment method</th>
                      <th className="text-left">Amount</th>
                      <th className="text-left">Token</th>
                      <th className="text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userTransaction?.events?.map((event: any) => (
                      <tr key={event.id} className="border-b">
                        <td className="whitespace-nowrap p-3 text-sm">
                          {event?.txn_reference}
                        </td>
                        <td className="text-sm">
                          {moment(event?.created_at).format("DD MMMM YYYY")}
                        </td>
                        <td className="capitalize text-sm">
                          {event?.payment_method || "---------"}
                        </td>
                        <td className="text-sm">
                          {event?.currency}
                          {event?.amount}
                        </td>
                        <td className="text-sm">{event?.amount / 10000}</td>
                        <td className="text-sm">
                          {event?.status === 1 ? (
                            <div className="text-sm p-2 rounded-xl text-[#228056] bg-[#EDFCF6] flex items-center justify-center ">
                              Bought
                            </div>
                          ) : (
                            <div className="text-sm p-2 rounded-xl text-[#CC0000] bg-[#FCEDED] flex items-center justify-center ">
                              Failed
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {userTransaction?.pagination?.meta?.last_page > 1 ? (
                  <Pagination
                    currentPage={page}
                    totalPages={userTransaction?.pagination?.meta?.last_page}
                    onPageChange={handlePageChange}
                  />
                ) : null}
              </div>
            </div>
          </>
        )}
      </main>

      {openTokenModal && <BuyTokenModal setIsModalOpen={setOpenTokenModal} />}
    </section>
  );
}
