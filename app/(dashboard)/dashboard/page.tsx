"use client";

import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Link from "next/link";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { GoInfo } from "react-icons/go";
import { useEffect, useMemo, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMoneyBills,
  FaTelegram,
  FaXTwitter,
} from "react-icons/fa6";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";
import MobileFooter from "../../components/footer/MobileFooter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  authFunctions,
  eventsManagamentFunctions,
} from "../../utils/endpoints";
import { addToLocalStorage, getData } from "../../utils/localstorage";
import { EVENTSPARROT_USER } from "../../constants";
import GlobalTable from "@/app/components/table/GlobalTable";
import { SalesAnalyticsData } from "./sales/page";
import toast from "react-hot-toast";
import { useCopyToClipboard } from "@/app/hooks";
import { PrimaryLoading2 } from "@/app/components/loaders/PrimaryLoading";
import RequestPayoutModal from "./payout/RequestPayoutModal";
import AccountType from "./payout/AccountType";
import AccountSubmission from "./payout/AccountSubmission";
import VerificationPending from "./payout/VerificationPending";
import { IoIosAlert } from "react-icons/io";

const emailCampaign = [
  {
    title: "Net Sales",
    value: "₦0.00",
    icon: <FaMoneyBills color="#D90BD9" />,
    background: "#FCEDFC",
  },
  {
    title: "Tickets sold",
    value: "0/30",
    icon: <FaMoneyBills color="#106BD5" />,
    background: "#EDF4FC",
  },

  {
    // title: "Page views",
    title: "Free tickets",
    value: "16",
    icon: <FaMoneyBills color="#FF5602" />,
    background: "#FCEFE8",
  },
];

export default function Dashboard() {
  const [selectedEvent, setSelectedEvent] = useState({
    name: "",
    eventId: "",
    slug: "",
  });
  const [copiedText, copy] = useCopyToClipboard();
  const eventURL = `https://eventsparrot.com/events/${
    selectedEvent.slug ? selectedEvent.slug : selectedEvent.eventId
  }`;
  const [openRequestPayout, setOpenRequestPayout] = useState(false);
  const [openAccountSelect, setOpenAccountSelect] = useState<boolean>(false);
  const [openBankDetails, setOpenBankDetails] = useState<boolean>(false);
  const [openPending, setOpenPending] = useState<boolean>(false);
  const [accountType, setAccountType] = useState("individual");

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        toast.success("Event link copied");
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };

  const recommended = [
    "Send announcements to your registrants ",
    "Send announcements to your registrants ",
    "Send announcements to your registrants ",
    "Send announcements to your registrants ",
    "Send announcements to your registrants ",
    "Send announcements to your registrants ",
    "Send announcements to your registrants ",
  ];

  const salesColumns = [
    { key: "name", name: "Ticket name" },
    { key: "quantity", name: "Total Tickets sold" },
    { key: "revenue", name: "Total Sales revenue" },
    { key: "fees", name: "Fees" },
    { key: "net", name: "Net sales revenue" },
  ];

  const {
    data: userAccount,
    isError,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["user-account"],
    queryFn: authFunctions.getUserAccount,
    staleTime: Infinity,
  });

  if (status === "success") {
    const activeAccount = getData(EVENTSPARROT_USER)?.account;
    const updatedAccount = activeAccount ? activeAccount : userAccount[0];
    addToLocalStorage(EVENTSPARROT_USER, "account", updatedAccount);
  }

  const {
    data: salesAnalytics,
    isError: isSalesError,
    isLoading: isSalesLoading,
    status: salesStatus,
  } = useQuery({
    queryKey: ["events-sales-analytics", selectedEvent.eventId],
    queryFn: () =>
      eventsManagamentFunctions.getEventSalesAnalytics(selectedEvent?.eventId),
    enabled: selectedEvent.eventId ? true : false,
    select: (data): SalesAnalyticsData => {
      let type1Count = 0;
      let type2Count = 0;
      let totalCount = 0;
      let netSales = 0;
      let totalRevenue = 0;
      const salesData = data.map((item: any) => {
        if (item.ticket.type === 1) {
          type1Count += item.order_count;
        } else if (item.ticket.type === 2) {
          type2Count += item.order_count;
        }
        totalCount += item.order_count;

        const netTicketSales = item.total_sales_revenue + item.total_sales_fee;
        netSales += netTicketSales;
        totalRevenue += item.total_sales_revenue;

        return {
          ticket: {
            ticket_id: item.ticket.ticked_id,
            name: item.ticket.name,
            price: item.ticket.price,
            type: item.ticket.type,
          },
          order_count: item.order_count,
          total_sales_revenue: item.total_sales_revenue,
          total_sales_fee: item.total_sales_fee,
          netSales: netTicketSales,
          totalRevenue: totalRevenue,
        };
      });

      return {
        salesData,
        totalCount,
        type1Count,
        type2Count,
        netSales,
        totalRevenue,
      };
    },
  });

  const salesDataFormatted = useMemo(() => {
    if (!salesAnalytics) return [];

    return salesAnalytics.salesData.map((item) => ({
      name: item.ticket.name,
      quantity: item.order_count,
      revenue: item.total_sales_revenue,
      fees: item.total_sales_fee,
      net: item.netSales,
    }));
  }, [salesAnalytics]);

  return (
    <section className="flex ">
      <Sidebar />
      <MobileFooter />
      {isSalesLoading ? (
        <div>
          <PrimaryLoading2 />
        </div>
      ) : (
        <main className="h-screen pb-24 md:pb-0 overflow-y-scroll flex-1">
          <Header
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
          />
          <h3 className="font-semibold text-2xl ml-4 sm:ml-6 xl:ml-12 mt-6">
            Dashboard
          </h3>
          <div className="flex flex-col xl:flex-row justify-between w-[92%] mx-auto">
            <div className="w-full xl:w-[60%]">
              <h3 className="text-lg mt-8 mb-5 font-medium">Overview</h3>

              <div className="flex w-full overflow-x-scroll pb-4   scrollbar-hide items-center space-x-2 justify-between">
                {emailCampaign.map((item, i) => (
                  <div
                    key={i}
                    className=" min-w-[221px] w-auto relative p-4 h-[140px] bg-white shadow-lg rounded-e-md  border-[.4px] border-gray-300"
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

                    <p className="font-medium md:font-semibold text-2xl my-2">
                      {i === 0
                        ? `₦${salesAnalytics?.netSales || 0} `
                        : i === 1
                        ? `${salesAnalytics?.totalCount || 0} `
                        : `${salesAnalytics?.type1Count || 0}`}
                    </p>
                    <div className="flex gap-2 items-center justify-between">
                      <p className="text-sm text-lightText">{item.title}</p>

                      {i === 1 && (
                        <p className="text-xs overflow-ellipsis text-[#706D73]">
                          {`${salesAnalytics?.type1Count || 0} Free  ${
                            salesAnalytics?.type2Count || 0
                          } Paid `}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className=" my-5 md:my-7 flex flex-col md:flex-row items-center gap-4">
                <div className=" w-full md:basis-1/2 ">
                  <p className="text-lg font-medium">Payouts</p>

                  <div className="flex items-center mt-3 md:mt-5">
                    <div className=" bg-white min-h-[122px] h-auto w-full border-[.6px] shadow-lg p-4 pb-2 rounded-md">
                      <div className="flex space-x-4">
                        <div className="basis-1/2 border-r border-dashed">
                          <h3 className="font-medium md:font-semibold text-2xl mb-2">
                            ₦0.00
                          </h3>
                          <p className="text-sm text-lightText">Paid</p>
                        </div>

                        <div>
                          <h3 className="font-medium md:font-semibold text-2xl mb-2">
                            ₦{salesAnalytics?.totalRevenue || 0}
                          </h3>
                          <p className="text-sm text-lightText">Remaining</p>
                        </div>
                      </div>
                      {/* Request payout */}
                      {/* <p
                        className="text-primaryPurple text-sm py-3 cursor-pointer"
                        onClick={() => setOpenRequestPayout(true)}
                      >
                        Request payout
                      </p> */}

                      {/* Payment under verification */}
                      {/* <p
                        className="text-sm p-1 my-4 flex items-center gap-2 bg-lightOrange rounded-md"
                        onClick={() => setOpenRequestPayout(true)}
                      >
                        <IoIosAlert color="#FF5602" />
                        <p className="text-sm text-[#332F2F]">
                          Payout is undergoing verification
                        </p>
                      </p> */}

                      {/* Payment verified */}
                      <div
                        className="text-sm p-1 my-4 flex items-center justify-between bg-lightGreen rounded-md"
                        onClick={() => setOpenRequestPayout(true)}
                      >
                        <div className="flex gap-1 items-center">
                          <img src="/assets/done.svg" alt="" />
                          <p className="text-sm text-[#332F2F]">
                            Payout verified
                          </p>
                        </div>
                        <p className="cursor-pointer text-primaryPurple text-sm">
                          View
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SHARE */}

                <div className="w-full lg:basis-1/2">
                  <p className="text-lg font-medium">Share</p>

                  <div className="mt-3 md:mt-5 rounded-md bg-white min-h-[122px] h-auto shadow-lg p-4 border-[.6px]">
                    <p className="text-xs text-lightText mb-1">Event Url</p>
                    <div className="">
                      <div className="w-full  overflow-x-hidden">
                        <p
                          title="click to copy url"
                          onClick={handleCopy(eventURL)}
                          className="text-sm text-primaryPurple cursor-pointer"
                        >
                          {`${
                            eventURL.length > 50
                              ? `${eventURL.substring(0, 50 - 3)}...`
                              : eventURL
                          } `}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 ">
                      <p className="text-xs text-lightText mb-1">Share on</p>
                      <div className="flex items-center space-x-6 text-2xl text-gray-500">
                        <FacebookShareButton
                          url={eventURL}
                          title={`Hi, Checkout out our latest event ${selectedEvent?.name} on Eventsparrot`}
                          hashtag={`#${selectedEvent?.name}`}
                        >
                          <FaFacebook className="hover:text-[#0866FF]" />
                        </FacebookShareButton>

                        <LinkedinShareButton
                          url={eventURL}
                          title={`Hi, Checkout out our latest event ${selectedEvent?.name} on Eventsparrot`}
                        >
                          <FaLinkedin className="hover:text-[#0077B5]" />
                        </LinkedinShareButton>

                        <TwitterShareButton
                          url={eventURL}
                          hashtags={[`#${selectedEvent.name}`, `#Eventsparrot`]}
                          title={`Hi, Checkout out our latest event ${selectedEvent?.name} on Eventsparrot`}
                        >
                          <FaXTwitter className="hover:text-black" />
                        </TwitterShareButton>

                        <TelegramShareButton
                          url={eventURL}
                          title={`Hi, Checkout out our latest event ${selectedEvent?.name} on Eventsparrot`}
                        >
                          <FaTelegram className="hover:text-[#27A7E7]" />
                        </TelegramShareButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="w-full hidden  xl:w-[30%]">
              <h3 className="text-lg mt-4 mb-5 font-medium">Recommended</h3>

              <div>
                {recommended.map((item, i) => (
                  <div key={i} className="flex space-x-3  mb-5 items-center">
                    <div className="text-3xl">
                      <div className="text-sm text-primaryPurple">
                        <HiOutlineSpeakerWave />
                      </div>
                    </div>
                    <p className="text-sm w-[80%]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 md:mt-10 mb-8  w-[92%] mx-auto">
            <h2 className="font-medium md:font-semibold text-xl md:text-2xl">
              Sales
            </h2>

            <Link href="/dashboard/sales">
              <p className="text-primaryPurple text-xs md:text-sm">View all</p>
            </Link>
          </div>

          <div className="w-[95%] mx-auto">
            <div className="mb-6">
              <GlobalTable columns={salesColumns} rows={salesDataFormatted} />
            </div>
          </div>
        </main>
      )}

      {openRequestPayout && (
        <RequestPayoutModal
          setIsModalOpen={setOpenRequestPayout}
          setOpenNextModal={setOpenAccountSelect}
        />
      )}

      {openAccountSelect && (
        <AccountType
          setIsModalOpen={setOpenAccountSelect}
          setOpenNextModal={setOpenBankDetails}
          accountType={accountType}
          setAccountType={setAccountType}
        />
      )}

      {openBankDetails && (
        <AccountSubmission
          setIsModalOpen={setOpenBankDetails}
          accountType={accountType}
          setOpenNextModal={setOpenPending}
        />
      )}

      {openPending && <VerificationPending setIsModalOpen={setOpenPending} />}
    </section>
  );
}
