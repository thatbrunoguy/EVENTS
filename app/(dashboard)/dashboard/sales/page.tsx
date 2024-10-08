"use client";

import Image from "next/image";
import Header from "../../../components/header/Header";
import Sidebar from "../../../components/sidebar/Sidebar";
import { HiOutlinePlusSm } from "react-icons/hi";
import Link from "next/link";
import { IoIosMore } from "react-icons/io";
import { useMemo, useState } from "react";
import { PiShareLight } from "react-icons/pi";
import DashHeader from "./Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { IoMailOpenSharp } from "react-icons/io5";
import MobileFooter from "../../../components/footer/MobileFooter";
import GlobalTable from "../../../components/table/GlobalTable";
import { useQuery } from "@tanstack/react-query";
import { eventsManagamentFunctions } from "@/app/utils/endpoints";
import { PrimaryLoading2 } from "@/app/components/loaders/PrimaryLoading";
import MainTable from "@/app/components/table/MainTable";
import { CSVLink, CSVDownload } from "react-csv";
export type SalesAnalyticsData = {
  salesData: {
    ticket: {
      ticket_id: string;
      name: string;
      price: number;
      type: number;
    };
    order_count: number;
    total_sales_revenue: number;
    total_sales_fee: number;
    netSales: number;
  }[];
  totalCount: number;
  type1Count: number;
  type2Count: number;
  netSales: number;
  totalRevenue: number;
};

export default function Guestlist() {
  const [selectedEvent, setSelectedEvent] = useState({
    name: "",
    eventId: "",
  });

  const [tickets, setTickets] = useState<any>([
    {
      name: "Aiamond Pass",
      quantity: 127,
      revenue: "₦77,500.00",
      fees: "₦15,500.00",
      net: "₦70,000.00",
    },
    {
      name: "Biamond Pass",
      quantity: 127,
      revenue: "₦77,500.00",
      fees: "₦15,500.00",
      net: "₦70,000.00",
    },
    {
      name: "Ciamond Pass",
      quantity: 127,
      revenue: "₦77,500.00",
      fees: "₦15,500.00",
      net: "₦70,000.00",
    },
    {
      name: "Diamond Pass",
      quantity: 127,
      revenue: "₦77,500.00",
      fees: "₦15,500.00",
      net: "₦70,000.00",
    },
    {
      name: "Eiamond Pass",
      quantity: 127,
      revenue: "₦77,500.00",
      fees: "₦15,500.00",
      net: "₦70,000.00",
    },
    {
      name: "Fiamond Pass",
      quantity: 127,
      revenue: "₦77,500.00",
      fees: "₦15,500.00",
      net: "₦70,000.00",
    },
    {
      name: "Giamond Pass",
      quantity: 127,
      revenue: "₦77,500.00",
      fees: "₦15,500.00",
      net: "₦70,000.00",
    },
    {
      name: "Hiamond Pass",
      quantity: 127,
      revenue: "₦77,500.00",
      fees: "₦15,500.00",
      net: "₦70,000.00",
    },
    {
      name: "Iiamond Pass",
      quantity: 127,
      revenue: "₦77,500.00",
      fees: "₦15,500.00",
      net: "₦70,000.00",
    },
    {
      name: "Jiamond Pass",
      quantity: 127,
      revenue: "₦77,500.00",
      fees: "₦15,500.00",
      net: "₦70,000.00",
    },
    {
      name: "Kiamond Pass",
      quantity: 127,
      revenue: "₦77,500.00",
      fees: "₦15,500.00",
      net: "₦70,000.00",
    },
    {
      name: "Liamond Pass",
      quantity: 127,
      revenue: "₦77,500.00",
      fees: "₦15,500.00",
      net: "₦70,000.00",
    },
  ]);

  const paymentHistory = [
    {
      recipient: "daxlinks global",
      account: "**** **** **** 2768",
      transferFee: "₦25.00",
      payout: "₦25,500.00",
      date: "Sep 29, 2023",
    },
    {
      recipient: "daxlinks global",
      account: "**** **** **** 2768",
      transferFee: "₦25.00",
      payout: "₦25,500.00",
      date: "Sep 29, 2023",
    },
    {
      recipient: "daxlinks global",
      account: "**** **** **** 2768",
      transferFee: "₦25.00",
      payout: "₦25,500.00",
      date: "Sep 29, 2023",
    },
    {
      recipient: "daxlinks global",
      account: "**** **** **** 2768",
      transferFee: "₦25.00",
      payout: "₦25,500.00",
      date: "Sep 29, 2023",
    },
    {
      recipient: "daxlinks global",
      account: "**** **** **** 2768",
      transferFee: "₦25.00",
      payout: "₦25,500.00",
      date: "Sep 29, 2023",
    },
    {
      recipient: "daxlinks global",
      account: "**** **** **** 2768",
      transferFee: "₦25.00",
      payout: "₦25,500.00",
      date: "Sep 29, 2023",
    },
  ];

  const ticketColumns = [
    { key: "name", name: "Name" },
    { key: "quantity", name: "Quantity" },
    { key: "revenue", name: "Revenue" },
    { key: "fees", name: "Fees" },
    { key: "net", name: "Net" },
  ];

  const ticketRows = tickets.map((ticket: any, index: number) => ({
    id: index,
    ...ticket,
  }));

  const paymentColumns = [
    { key: "recipient", name: "Recipient" },
    { key: "account", name: "Account" },
    { key: "transferFee", name: "Transfer Fee" },
    { key: "payout", name: "Payout" },
    { key: "date", name: "Date" },
  ];

  const paymentRows = paymentHistory.map((payment, index) => ({
    id: index, // assuming you want to use the array index as ID
    ...payment,
  }));

  const {
    data: salesAnalytics,
    isError,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["events-sales-analytics", selectedEvent.eventId],
    queryFn: () =>
      eventsManagamentFunctions.getEventSalesAnalytics(selectedEvent?.eventId),
    enabled: selectedEvent.eventId ? true : false,
    select: (data): SalesAnalyticsData => {
      console.log("DAta--", data);
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
            ticket_id: item.ticket.id,
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
    console.log("salesAnalytics", salesAnalytics);
    if (!salesAnalytics) return [];

    return salesAnalytics.salesData.map((item) => ({
      name: item.ticket.name,
      quantity: item.order_count,
      revenue: item.total_sales_revenue,
      fees: item.total_sales_fee,
      net: item.netSales,
    }));
  }, [salesAnalytics]);
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
          <p>The csv format of your guestlist has been exported</p>
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
        toastClassName="w-[90%] md:w-[400px]"
        progressStyle={{ background: "#7431B8" }}
      />
      <Sidebar />
      <MobileFooter />

      {isLoading ? (
        <div>
          <PrimaryLoading2 />
        </div>
      ) : (
        <main className="h-screen overflow-y-scroll flex-1">
          <Header
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
          />
          {!tickets.length ? (
            <div className="flex justify-center items-center w-full h-[80%]">
              <div className="w-[351px] flex flex-col items-center">
                <Image
                  src="/assets/sales.svg"
                  alt="Eventparrot logo"
                  width={210}
                  height={180}
                  priority
                />
                <p className="py-5 text-center w-[60%] text-lightText">
                  Sales and payouts will appear here
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="w-[95%] mt-6 mx-auto">
                <div className="w-full mb-9">
                  <DashHeader
                    data={{
                      totalTicket: salesAnalytics?.totalCount,
                      totalRevenue: salesAnalytics?.totalRevenue,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between mt-10 mb-8">
                  <h2 className="font-semibold text-2xl">Sales</h2>

                  {/* <button
                    onClick={exportCSV}
                    className="border-primaryPurple border text-primaryPurple py-[10px] px-5 w-auto h-[41px] hover:bg-primaryPurple hover:text-white text-sm rounded-lg flex items-center space-x-[4px]"
                  >
                    <div>
                      <PiShareLight />
                    </div>
                    <CSVLink
                      data={salesDataFormatted}
                      headers={ticketColumns as []}
                    >
                      <p>Export as CSV</p>
                    </CSVLink>
                  </button> */}
                </div>

                <div className="h-auto">
                  <GlobalTable
                    columns={ticketColumns}
                    rows={salesDataFormatted}
                  />
                </div>
              </div>

              {/* -------- PAYMENT HISTORY --------- */}

              <div className="w-[95%] mt-12 mb-24 md:mb-5 mx-auto">
                <div className="flex items-center justify-between mt-10 mb-8">
                  <h2 className="font-semibold text-2xl">Payment History</h2>

                  {/* <button
                    onClick={exportCSV}
                    className="border-primaryPurple border text-primaryPurple py-[10px] px-5 w-auto h-[41px] hover:bg-primaryPurple hover:text-white text-sm rounded-lg flex items-center space-x-[4px]"
                  >
                    <div>
                      <PiShareLight />
                    </div>
                    <p>Export as CSV</p>
                  </button> */}
                  {/* TABLE */}
                </div>

                {/* <GlobalTable columns={paymentColumns} rows={paymentRows} /> */}
                <GlobalTable columns={paymentColumns} rows={[]} />
                {/* <MainTable /> */}
              </div>
            </>
          )}
        </main>
      )}
    </section>
  );
}
