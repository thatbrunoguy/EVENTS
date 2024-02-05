"use client";

import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaMinus, FaPlus } from "react-icons/fa6";

const Checkout = () => {
  const [tokens, setTokens] = useState<number>(0);

  return (
    <section>
      <header className="flex  justify-between items-center py-[18px] border-b px-6">
        <h3 className="font-medium text-lg">Checkout</h3>
        <div className="text p-2 hover:bg-gray-200 rounded-full cursor-pointer">
          <AiOutlineClose />
        </div>
      </header>

      <main className="flex flex-col items-center md:items-stretch md:flex-row justify-between md:pr-8 mb-6 md:mb-0 ">
        <div className="mt-8 w-[94%] md:w-[50%] md:pl-8">
          <div className="flex items-center space-x-6 ">
            <div className="basis-1/2">
              <label className="text-sm text-gray-800" htmlFor="organizerName">
                First name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
              />
            </div>
            <div className="basis-1/2">
              <label className="text-sm text-gray-800" htmlFor="organizerName">
                Last name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
              />
            </div>
          </div>

          <div className="my-6">
            <label className="text-sm text-gray-800" htmlFor="organizerName">
              Order Ticket <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center w-full space-x-6 ">
              <div className="bg-[#F8F8F8] flex items-center justify-between px-7 h-14 flex-1">
                <p>{tokens}</p>
                <p>Tickets</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setTokens((prev) => (prev += 1))}
                  className="w-14 h-14 bg-lightPurple hover:bg-primaryPurple hover:text-white text-primaryPurple rounded-md grid place-content-center"
                >
                  <p>
                    <FaPlus />
                  </p>
                </button>
                <button
                  onClick={() => setTokens((prev) => (prev -= 1))}
                  className="w-14 h-14 bg-lightPurple hover:bg-primaryPurple hover:text-white text-primaryPurple rounded-md grid place-content-center"
                >
                  <p>
                    <FaMinus />
                  </p>
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-800" htmlFor="organizerName">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            />
          </div>

          {/* ACCEPT */}

          <div className="flex items-center space-x-3 mt-3 md:mt-0">
            <input
              className="block w-4 h-4 accent-primaryPurple"
              type="checkbox"
              name=""
              id=""
            />
            <p>
              Keep me updated on more events and news from this event organizer{" "}
            </p>
          </div>

          {/* BUY TOKEN */}

          <button
            // onClick={() => setIsModalOpen(true)}
            className="bg-purple-700 mt-9 py-[10px] px-5 w-full md:w-[244px] h-12 hover:bg-opacity-70 text-white text-sm rounded-lg grid place-content-center"
          >
            <p>Buy Ticket</p>
          </button>
          <hr className="mt-12" />

          <div className="flex items-center space-x-1 justify-center mt-5">
            <p>Powered by</p>
            <Image
              src="/assets/poweredby.svg"
              alt="Eventparrot logo"
              width={67}
              height={14}
              //   priority
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="mt-8 w-[94%] md:w-auto">
          <div className="overflow-hidden relative w-full md:w-[394px] h-[200px] rounded-tl-2xl rounded-tr-2xl">
            <Image
              className="object-cover"
              src="/assets/event-img.png"
              alt="Eventparrot event"
              fill
              // width={394}
              // height={200}
              //   priority
            />
          </div>

          <div className="px-5 mt-5 bg-white shadow-md rounded-bl-2xl rounded-br-2xl">
            <h3 className="text-lg font-medium">Order summary</h3>
            <div className="flex items-center justify-between text-lightText py-4 border-b">
              <p className="">Ticket price</p>
              <p className="">₦0.00</p>
            </div>
            <div className="flex items-center justify-between text-lightText py-4 border-b">
              <p className="">Orders</p>
              <p className="">2</p>
            </div>
            <div className="flex items-center justify-between text-lightText py-4 border-b">
              <p className="">Ticket fee</p>
              <p className="">₦0.00</p>
            </div>
            <div className="flex items-center justify-between  py-6 ">
              <p className="">Total</p>
              <p className="">₦0.00</p>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Checkout;
