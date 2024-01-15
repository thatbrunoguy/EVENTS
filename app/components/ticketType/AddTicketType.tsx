"use client";

import React, { useState } from "react";
import { SolidButton, TransparentButton } from "../buttons/button";
import ReactSelectOptions from "../select/ReactSelect";

type Iprops = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddTicketType = ({ isModalOpen, setIsModalOpen }: Iprops) => {
  const [isFree, setIsFree] = useState(true);
  const activeStyle = {
    borderColor: "#7431B8",
    color: "#7431B8",
    font: 600,
    backgroundColor: "#F5EDFC",
    height: "42px",
    width: "160px",
  };
  return (
    <section>
      <div
        onClick={() => setIsModalOpen(false)}
        className="bg-black bg-opacity-50 fixed top-0 left-0 right-0 bottom-0"
        aria-label="backdrop"
      />
      <div className="w-[664px] min-h-[676px] bg-white rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <header className="font-semibold px-6 text-xl mb-8 border-b-[.8px] border-gray-300 py-6">
          Add a ticket type
        </header>
        <main className="px-8 max-h-[70vh] overflow-y-scroll">
          <p className="text-sm font-semibold text-gray-800">
            Which kind of ticket is it? <span className="text-red-500">*</span>
          </p>
          <div className="mt-2 mb-6 flex items-center space-x-6">
            <TransparentButton
              title="Free"
              styles={isFree ? activeStyle : { height: "42px", width: "160px" }}
              onClickHandler={() => setIsFree(true)}
            />
            <TransparentButton
              title="Paid"
              styles={
                !isFree ? activeStyle : { height: "42px", width: "160px" }
              }
              onClickHandler={() => setIsFree(false)}
            />
          </div>

          {/* Ticket name */}

          <div className="flex items-center space-x-6 mt-7">
            <div className="basis-1/2">
              <label className="text-sm text-gray-800" htmlFor="ticketName">
                Ticket name <span className="text-red-500">*</span>
              </label>
              <input
                id="ticketName"
                type="text"
                className="h-10 text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
              />
            </div>
            <div className="basis-1/2">
              <label
                className="text-sm mb-2 block text-gray-800"
                htmlFor="ticketStock"
              >
                Ticket stock <span className="text-red-500">*</span>
              </label>
              <ReactSelectOptions
                options={[
                  { value: "limited", label: "Limited stock" },
                  { value: "unlimited", label: "Unlimited stock" },
                ]}
              />
              {/* <input
                id="ticketStock"
                type="text"
                className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
              /> */}
            </div>
          </div>

          {/* Ticket stock / Price */}

          <div className="flex items-center space-x-6 mt-7">
            <div className="basis-1/2">
              <label
                className="text-sm text-gray-800"
                htmlFor="ticketStockCount"
              >
                How many ticket stock? <span className="text-red-500">*</span>
              </label>
              <input
                id="ticketStockCount"
                type="text"
                className="h-12 text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
              />
            </div>
            <div className="basis-1/2">
              <label className="text-sm text-gray-800" htmlFor="ticketPrice">
                Ticket price <span className="text-red-500">*</span>
              </label>
              <input
                id="ticketPrice"
                type="text"
                className="h-12 text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
              />
            </div>
          </div>

          {/* Ticket Purchase Limit */}

          <div className="my-6">
            <label
              className="text-sm text-gray-800"
              htmlFor="ticketPurchaseLimit"
            >
              Ticket purchase limit <span className="text-red-500">*</span>
            </label>
            <input
              id="ticketPurchaseLimit"
              type="text"
              className="h-12 text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            />
          </div>

          {/* Ticket Description */}

          <div className="mb-8">
            <label
              className="text-sm text-gray-800"
              htmlFor="ticketDescription"
            >
              Ticket description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="ticketDescription"
              className="max-h-[142px] min-h-[142px] h-[14px] p-2 text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            />
          </div>
        </main>
        <footer className="h-[68px] px-2 flex justify-end space-x-6 items-center border-t-[.8px] border-gray-300">
          <TransparentButton
            onClickHandler={() => setIsModalOpen(false)}
            title="Cancel "
            styles={{
              borderColor: "#7431B8",
              color: "#7431B8",
              width: "160px",
            }}
          />
          <SolidButton title="Save" styles={{ width: "160px" }} />
        </footer>
      </div>
    </section>
  );
};

export default AddTicketType;
