"use client";

import Image from "next/image";
import Sidebar from "../../../components/sidebar/Sidebar";
import { HiOutlinePlusSm, HiPencil } from "react-icons/hi";
import Link from "next/link";
import { IoIosCopy, IoIosMore } from "react-icons/io";
import { useState } from "react";
import MobileFooter from "../../../components/footer/MobileFooter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { eventsManagamentFunctions } from "../../../utils/endpoints";
import PrimaryLoading, {
  PrimaryLoading2,
} from "../../../components/loaders/PrimaryLoading";
import { formatDate, formatTime } from "../../../helpers";
import { Menu, MenuButton, MenuGroup, MenuItem } from "@szhsin/react-menu";
import { MdHideSource } from "react-icons/md";
import { IoTrash } from "react-icons/io5";
import { useCopyToClipboard } from "@/app/hooks";
import toast from "react-hot-toast";
import { IoMdSettings } from "react-icons/io";
import ConfirmDeleteModal from "@/app/components/modals/ConfirmDelete";
import { Location, Media, Ticket } from "@/app/types";
import { useRouter } from "next/navigation";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Pagination from "@/app/components/pagination/Pagination";

export type EventData = {
  id: string;
  account_id: string;
  name: string;
  start_date: string;
  end_date: string;
  timezone: string;
  registration_requirements: {
    name: string;
    required: boolean;
  }[];
  description: string;
  medias: Media[];
  status: number;
  tickets: Ticket[];
  locations: Location[];
  slug: string;
};
type FormattedEvent = {
  id: string;
  name: string;
  startDate: string;
  quantity: number;
  price: number;
  desc: string;
  img: string;
};

export default function Event() {
  const [copiedText, copy] = useCopyToClipboard();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const router = useRouter();

  const queryClient = useQueryClient();

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        toast.success("Event link copied");
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };
  const toggleEventStatus = useMutation({
    mutationFn: eventsManagamentFunctions.toggleEventStatus,
    onError: async (error, variables, context) => {
      // An error happened!
      // console.log(` ${error}`);
    },
    onSuccess: async (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      // console.log("data", data);
    },
  });

  const deleteEvent = useMutation({
    mutationFn: eventsManagamentFunctions.deleteEvent,
    onError: async (error, variables, context) => {},
    onSuccess: async (data, variables, context) => {},
  });

  const handleEventStatusChange = (status: number, id: string) => {
    toggleEventStatus.mutate({ status: status, eventId: id });
  };

  const {
    data: events,
    isLoading,
    refetch: refetchEvent,
  } = useQuery({
    queryKey: ["events", { page }],
    queryFn: () => eventsManagamentFunctions.getEvents({ page } as any),
    select: (data) => {
      const selectedEvents: EventData[] = data?.events.map(
        (event: EventData) => {
          const startDate = event.start_date
            ? `${formatDate(event.start_date)} | ${formatTime(
                event.start_date
              )}`
            : null;
          const quantity =
            event.tickets[0]?.stock_qty != null
              ? event.tickets[0].stock_qty
              : null;
          const lowestPrice = Math.min(
            ...event.tickets.map((ticket: any) => ticket.price)
          );
          const highestPrice = Math.max(
            ...event.tickets.map((ticket: any) => ticket.price)
          );
          const desc = event.tickets[0]?.description || null;
          const img = event.medias[0]?.original || null;
          const address = event.locations[0]?.address || "Online";
          const status = event.status;

          return {
            id: event.id || null,
            name: event.name || null,
            startDate,
            quantity,
            desc,
            img,
            address,
            status,
            lowestPrice,
            highestPrice,
            slug: event.slug || null,
          };
        }
      );

      return {
        events: selectedEvents,
        pagination: data.pagination,
      };
    },
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const deleteEventHandler = (id: string) => {
    deleteEvent.mutate({ eventId: id });
    refetchEvent();
  };

  const actionOptions = [
    {
      icon: <HiPencil />,
      title: "Edit event",
    },
    {
      icon: <IoMdSettings />,
      title: "Manage event",
    },
    {
      icon: <MdHideSource />,
      title: "Make event inactive",
      callback: () => console.log("edit event"),
    },
    {
      icon: <IoTrash />,
      title: "Delete event",
      callback: () => setIsDeleteModalOpen(true),
    },
  ];

  const lastOption = {
    icon: <IoIosCopy />,
    title: "Copy event link",
  };

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
            {events === undefined || events?.events?.length < 1 ? (
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
                <div className="w-full overflow-x-scroll">
                  <table className="w-full text-xs md:text-sm">
                    <thead className="h-[50px]">
                      <tr className="py-3 px-4 bg-[#FBFAFC]">
                        <th className="w-[30%] text-left">Ticket name</th>
                        <th className="text-left">Ticket quantity</th>
                        <th className="text-left">Ticket price</th>
                        <th className="text-left"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {events?.events?.map((e: any) => (
                        <tr key={e.id} className="border-b">
                          <td className="p-3">
                            <div className="flex items-center w-full space-x-5">
                              <div className="h-[72px] w-[72px] relative rounded overflow-hidden">
                                <Image
                                  fill
                                  src={e.img}
                                  alt={e.name}
                                  className="object-cover"
                                />
                              </div>
                              <div className="w-full  text-xs md:text-sm">
                                <h4 className="font-semibold mb-1 whitespace-nowrap">
                                  {e.name}
                                </h4>
                                <p className="text-lightText whitespace-nowrap">
                                  {e.address}
                                </p>
                                <p className="text-lightText whitespace-nowrap">
                                  {e.startDate}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>{e.quantity || "unlimited"}</td>
                          <td>
                            {e.highestPrice === e.lowestPrice
                              ? `₦${e.lowestPrice}`
                              : "Multiple"}
                          </td>
                          <td>
                            <Menu
                              direction="left"
                              menuStyle={{
                                backgroundColor: "white",
                                border: "1px solid #E7E4EB",
                                borderRadius: 8,
                                zIndex: 50,
                                width: 230,
                                height: 240,
                                padding: 6,
                                boxShadow:
                                  "0px 4px 6px -2px #88868A0D, 0px 12px 16px -4px #88868A1A",
                              }}
                              // arrow
                              menuButton={
                                <MenuButton
                                  style={{ background: "transparent" }}
                                >
                                  <div className="text-gray-800 text-xl h-11 w-11 rounded-full hover:bg-gray-100 grid place-content-center cursor-pointer">
                                    <IoIosMore />
                                  </div>
                                </MenuButton>
                              }
                              transition
                            >
                              <MenuGroup>
                                {actionOptions.map((opt, index) => (
                                  <MenuItem
                                    className="py-2 cursor-pointer pl-3 hover:bg-lightPurple"
                                    key={opt.title}
                                  >
                                    <div
                                      onClick={
                                        index === 0
                                          ? () =>
                                              router.push(
                                                `/dashboard/event/edit-event/${e?.id}`
                                              )
                                          : index === 1
                                          ? () =>
                                              router.push(
                                                `/dashboard/event/preview/${e?.slug}`
                                              )
                                          : index === 2
                                          ? () =>
                                              handleEventStatusChange(
                                                e.status,
                                                e.id
                                              )
                                          : opt.callback
                                      }
                                      className="flex items-center w-full space-x-3 py-1"
                                    >
                                      {index === 2 ? (
                                        <>
                                          <div
                                            className={`${
                                              e.status === 2
                                                ? "text-red-500"
                                                : "text-[#706D73]"
                                            } text-base`}
                                          >
                                            {opt.icon}
                                          </div>
                                          <p
                                            className={`${
                                              e.status === 2
                                                ? "text-red-500 "
                                                : "text-[#706D73]"
                                            } text-sm text-center`}
                                          >
                                            {e.status === 1
                                              ? opt.title
                                              : "Make event active"}
                                          </p>
                                        </>
                                      ) : (
                                        <>
                                          <div className="text-gray-500 text-base">
                                            {opt.icon}
                                          </div>

                                          <p className="text-[#706D73] text-sm text-center">
                                            {opt.title}
                                          </p>
                                        </>
                                      )}
                                    </div>
                                  </MenuItem>
                                ))}
                              </MenuGroup>

                              <MenuItem className="py-2 cursor-pointer pl-4 hover:bg-lightPurple mx-auto border-t">
                                <div
                                  onClick={handleCopy(
                                    `https://eventsparrot.vercel.app/events/${e.slug}`
                                  )}
                                  className="flex items-center w-full cursor-pointer  space-x-3 py-1"
                                >
                                  <div className="text-gray-500 text-base">
                                    {lastOption.icon}
                                  </div>
                                  <p className="text-[#706D73]  text-sm text-center">
                                    {lastOption.title}
                                  </p>
                                </div>
                              </MenuItem>
                            </Menu>
                            {isDeleteModalOpen && (
                              <ConfirmDeleteModal
                                title="Are you sure want to delete this event?"
                                setIsDeleteModalOpen={setIsDeleteModalOpen}
                                deleteTicket={() => deleteEventHandler(e.id)}
                              />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {events?.pagination?.meta?.last_page > 1 ? (
                    <Pagination
                      currentPage={page}
                      totalPages={events?.pagination?.meta?.last_page}
                      onPageChange={handlePageChange}
                    />
                  ) : null}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </section>
  );
}
