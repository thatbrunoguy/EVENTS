"use client";

import React, { useEffect, useState } from "react";
import { SolidButton, TransparentButton } from "../buttons/button";
import ReactSelectOptions from "../select/ReactSelect";

const activeStyle = {
  borderColor: "#7431B8",
  color: "#7431B8",
  font: 600,
  backgroundColor: "#F5EDFC",
  height: "42px",
};

type TicketType = {
  value: string;
  label: string;
};

export type TicketInfo = {
  type: number;
  name: string;
  stock: string;
  stock_qty?: number;
  purchase_limit: number | null;
  price: number;
  description?: string;
};

type IProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tickets: any;
  setTickets: React.Dispatch<React.SetStateAction<any>>;
  ticketInfo: TicketInfo;
  setTicketInfo: React.Dispatch<React.SetStateAction<TicketInfo>>;
  setViewTicketIndex: React.Dispatch<any>;
  viewTicketIndex: number;
};

const AddTicketType = ({
  setIsModalOpen,
  tickets,
  setTickets,
  viewTicketIndex,
  setViewTicketIndex,
  ticketInfo,
  setTicketInfo,
}: IProps) => {
  const options: TicketType[] = [
    { value: "limited", label: "Limited stock" },
    { value: "unlimited", label: "Unlimited stock" },
  ];

  const [isComplete, setIsComplete] = useState(false);
  const saveTicket = () => {
    // console.log("TicketInfo", ticketInfo);
    setTickets((prevTickets: any) => {
      if (
        viewTicketIndex !== null &&
        viewTicketIndex >= 0 &&
        viewTicketIndex < prevTickets.length
      ) {
        // Update existing ticket
        const updatedTickets = [...prevTickets];
        updatedTickets[viewTicketIndex] = {
          ...ticketInfo,
        };

        return updatedTickets;
      } else {
        return [...prevTickets, { ...ticketInfo }];
      }
    });

    resetForm();
  };

  const resetForm = () => {
    setTicketInfo({
      type: 1,
      name: "",
      stock: "",
      stock_qty: 0,
      purchase_limit: null,
      price: 0,
      description: "",
    });
    setViewTicketIndex(null);
    setIsModalOpen(false);
  };

  const isTicketInfoValid = () => {
    const { type, name, stock, stock_qty, purchase_limit, price, description } =
      ticketInfo;

    if (type === 1) {
      // For type 1, only name, stock, and description are required
      return (
        name?.trim() !== "" && stock?.trim() !== ""
        // && description.trim() !== ""
      );
    } else if (type === 2) {
      // For type 2, all fields are required
      return (
        name?.trim() !== "" &&
        stock?.trim() !== "" &&
        // stock_qty !== 0 &&
        purchase_limit !== 0 &&
        price !== 0
        // &&
        // description.trim() !== ""
      );
    } else {
      // Invalid type
      return false;
    }
  };

  useEffect(() => {
    setIsComplete(isTicketInfoValid());
  }, [
    ticketInfo.description,
    ticketInfo.name,
    ticketInfo.price,
    ticketInfo.purchase_limit,
    ticketInfo.stock,
    ticketInfo.stock_qty,
    ticketInfo.type,
  ]);

  return (
    <section>
      <div
        onClick={resetForm}
        className="bg-black bg-opacity-50 fixed z-20  top-0 left-0 right-0 bottom-0"
        aria-label="backdrop"
      />
      <div className=" w-[96%] mx-auto md:w-[664px] md:min-h-[676px] z-50 bg-white rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <header className="font-semibold px-6 text-xl mb-8 border-b-[.8px] border-gray-300 py-6">
          Add a ticket type
        </header>
        <main className="px-3 md:px-8 max-h-[70vh] overflow-y-scroll">
          <p className="text-sm font-semibold text-gray-800">
            Which kind of ticket is it? <span className="text-red-500">*</span>
          </p>
          <div className="mt-2 mb-6 flex items-center space-x-3 md:space-x-6">
            <div className="basis-1/2 md:w-[160px]">
              <TransparentButton
                title="Free"
                styles={
                  ticketInfo.type === 1 ? activeStyle : { height: "42px" }
                }
                onClickHandler={() => {
                  // setIsFree(true);
                  setTicketInfo((prevTicketInfo) => ({
                    ...prevTicketInfo,
                    type: 1,
                  }));
                }}
              />
            </div>
            <div className="basis-1/2 md:w-[160px]">
              <TransparentButton
                title="Paid"
                styles={
                  ticketInfo.type === 2 ? activeStyle : { height: "42px" }
                }
                onClickHandler={() => {
                  // setIsFree(false);
                  setTicketInfo((prevTicketInfo) => ({
                    ...prevTicketInfo,
                    type: 2,
                  }));
                }}
              />
            </div>
          </div>

          {/* Ticket name */}

          <div className="flex items-center space-x-6 mt-7">
            <div className="basis-1/2">
              <label className="text-sm text-gray-800" htmlFor="ticketName">
                Ticket name <span className="text-red-500">*</span>
              </label>
              <input
                value={ticketInfo.name}
                onChange={(e) =>
                  setTicketInfo((prev) => ({ ...prev, name: e.target.value }))
                }
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
                selectedOption={options.find(
                  (opt) => opt.value === ticketInfo.stock
                )}
                setSelectedOption={(selected: any) =>
                  setTicketInfo((prev) => ({
                    ...prev,
                    stock: selected?.value || "",
                  }))
                }
                options={options}
              />
            </div>
          </div>

          {/* Ticket stock / Price */}

          <div className="flex items-center space-x-6 mt-7">
            {ticketInfo.stock === "limited" && (
              <div className="basis-1/2">
                <label
                  className="text-sm text-gray-800"
                  htmlFor="ticketStockCount"
                >
                  How many ticket stock?{" "}
                  <span className="text-red-500">{/* * */}</span>
                </label>
                <input
                  value={ticketInfo.stock_qty}
                  onChange={(e) => {
                    if (/^\d*$/.test(e.target.value)) {
                      setTicketInfo((prev) => ({
                        ...prev,
                        stock_qty: Number(e.target.value),
                      }));
                    }
                  }}
                  id="ticketStockCount"
                  type="tel"
                  className="h-12 text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
                />
              </div>
            )}
            {ticketInfo.type === 2 && (
              <div
                className={`${
                  ticketInfo.stock === "unlimited" ? "basis-full" : "basis-1/2"
                } relative`}
              >
                <label className="text-sm text-gray-800" htmlFor="ticketPrice">
                  Ticket price <span className="text-red-500">*</span>
                </label>

                <div className="w-full pl-4 h-12 flex items-center gap-1 bg-[#F8F8F8] rounded-lg text-gray-600  mt-2 focus-within:ring-2 ring-purple-600">
                  <p className="">₦</p>
                  <input
                    value={ticketInfo.price}
                    onChange={(e) => {
                      if (/^\d*$/.test(e.target.value)) {
                        setTicketInfo((prev) => ({
                          ...prev,
                          price: Number(e.target.value),
                        }));
                      }
                    }}
                    id="ticketPrice"
                    type="tel"
                    className="h-full bg-transparent text-sm w-full  block  px-2 outline-none border-none "
                  />
                </div>
              </div>
            )}
          </div>

          {/* Ticket Purchase Limit */}

          {ticketInfo.type === 2 && (
            <div className="my-6">
              <label
                className="text-sm text-gray-800"
                htmlFor="ticketPurchaseLimit"
              >
                Ticket purchase limit <span className="text-red-500">*</span>
              </label>
              <input
                value={ticketInfo.purchase_limit}
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value)) {
                    setTicketInfo((prev) => ({
                      ...prev,
                      purchase_limit: Number(e.target.value),
                    }));
                  }
                }}
                id="ticketPurchaseLimit"
                type="tel"
                className="h-12 text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
              />
            </div>
          )}

          {/* Ticket Description */}

          <div className="mb-8 mt-6">
            <label
              className="text-sm text-gray-800"
              htmlFor="ticketDescription"
            >
              Ticket description <span className="text-red-500">{/* * */}</span>
            </label>
            <textarea
              value={ticketInfo.description}
              onChange={(e) =>
                setTicketInfo((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              id="ticketDescription"
              className="max-h-[142px] min-h-[142px] h-[14px] p-2 text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            />
          </div>
        </main>
        <footer className="h-[68px] px-2 flex justify-end space-x-6 items-center border-t-[.8px] border-gray-300">
          <TransparentButton
            onClickHandler={resetForm}
            title="Cancel "
            styles={{
              borderColor: "#7431B8",
              color: "#7431B8",
              width: "160px",
            }}
          />
          <SolidButton
            onClickHandler={saveTicket}
            title="Save"
            isComplete={isComplete}
            styles={{ width: "160px" }}
          />
        </footer>
      </div>
    </section>
  );
};

export default AddTicketType;
