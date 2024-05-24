"use client";

import {
  SolidButton,
  TransparentButton,
} from "@/app/components/buttons/button";
import {
  eventsManagamentFunctions,
  guestFunctions,
} from "@/app/utils/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

type Iprops = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  checkInAttendee?: any;
  selectedEventId?: string;
};

type ticketDetail = {
  attendee?: string;
  ticket_type?: string;
};

const CheckInModal = ({ setIsModalOpen, selectedEventId }: Iprops) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [customerId, setCustomerId] = useState("");
  const [scanCode, setScanCode] = useState(false);
  const [ticketDetail, setTicketDetail] = useState<ticketDetail>({});
  const [errorState, setErrorState] = useState(false);

  const checkInAttendee = useMutation({
    mutationFn: eventsManagamentFunctions.checkInAttendeeWithCode,
    onError: async (error, variables, context) => {},
    onSuccess: async (data, variables, context) => {
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["get-attendee-list"] });
    },
  });

  const getTicketDetail = useMutation({
    mutationFn: guestFunctions.getTicketInfo,
    onError: async (error, variables, context) => {
      setErrorState(true);
    },
    onSuccess: async (data, variables, context) => {
      setErrorState(false);
      setTicketDetail(data);
    },
  });

  return (
    <>
      <div
        onClick={() => setIsModalOpen(false)}
        className="bg-black bg-opacity-50 backdrop-blur-sm fixed z-20  top-0 left-0 right-0 bottom-0"
        aria-label="backdrop"
      />
      <div className="w-[96%] md:w-[760px] h-auto rounded-md bg-white z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="py-4 px-6 border-b">
          <p className="text-xl font-medium">Check in attendee</p>
        </div>

        <div className="w-[90%] mx-auto mb-28">
          <div className="my-6 ">
            <label
              className="text-sm mb-2 block text-gray-800"
              htmlFor="organizerName"
            >
              Customer ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              onChange={(e) => setCustomerId(e.target.value)}
              value={customerId}
              className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            />
          </div>

          <div className="flex items-center space-x-4 my-5">
            <div className="basis-1/2 h-[.8px] bg-[#E7E4EB]" />
            <p
              className="text-sm text-[#706D73] whitespace-nowrap cursor-pointer"
              onClick={() => setScanCode(true)}
            >
              or <span className="text-primaryPurple">SCAN QR code</span>
            </p>
            <div className="basis-1/2 h-[.8px] bg-[#E7E4EB]" />
          </div>

          <>
            {scanCode && (
              <QrReader
                constraints={{ facingMode: "environment" }}
                onResult={(result, error) => {
                  if (!!result) {
                    //@ts-ignore
                    const res = JSON.parse(result.text);
                    setCustomerId(res.ticket_number);
                    setScanCode((prev) => (prev = false));
                  }

                  if (!!error) {
                    console.info(error);
                  }
                }}
                //@ts-ignore
                style={{ width: "100%" }}
              />
            )}
          </>
          {ticketDetail?.attendee ? (
            <div className="">
              <div className="rounded-md bg-purple-50 py-3 px-3  flex justify-between">
                <p className="text-sm basis-1/2">Attendee</p>
                <p className="text-sm basis-1/2">Ticket type</p>
              </div>
              <div className="flex justify-between items-center mt-8 border-b-[.6px] pb-8 px-4">
                <p className="basis-1/2">{ticketDetail?.attendee}</p>
                <div className="  p-2 basis-1/2">
                  <div className="rounded-md bg-lightPurple w-[100px] p-2 flex justify-center text-xs text-primaryPurple">
                    <p>{ticketDetail?.ticket_type}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {errorState ? (
            <div className="bg-lightOrange text-sm text-primaryOrange p-3 rounded-xl">
              Ticket not valid
            </div>
          ) : null}
        </div>

        <footer className="h-[70px] fixed bottom-0 left-0 bg-white shadow-lg right-0 px-2 md:pr-9 flex justify-center md:justify-end space-x-6 items-center border-t-[.8px] border-gray-300">
          <TransparentButton
            onClickHandler={() => setIsModalOpen(false)}
            title="Cancel"
            styles={{
              borderColor: "#7431B8",
              color: "#7431B8",
              width: "160px",
              height: "41px",
            }}
          />
          {ticketDetail?.attendee ? (
            <SolidButton
              onClickHandler={() => {
                checkInAttendee.mutate(customerId);
              }}
              title="Admit Attendee"
              styles={{ width: "160px", height: "41px" }}
            />
          ) : (
            <SolidButton
              onClickHandler={() => {
                setIsModalOpen(true);
                getTicketDetail.mutate(customerId);
              }}
              title="Allow"
              styles={{ width: "160px", height: "41px" }}
            />
          )}
        </footer>
      </div>
    </>
  );
};

export default CheckInModal;
