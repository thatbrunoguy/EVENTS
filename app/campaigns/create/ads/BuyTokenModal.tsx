"use client";

import {
  SolidButton,
  TransparentButton,
} from "@/app/components/buttons/button";
import { useRouter } from "next/navigation";
import React from "react";
type Iprops = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BuyTokenModal = ({ setIsModalOpen }: Iprops) => {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => setIsModalOpen(false)}
        className="bg-black bg-opacity-50 backdrop-blur-sm fixed z-20  top-0 left-0 right-0 bottom-0"
        aria-label="backdrop"
      />
      <div className="w-[760px] h-auto rounded-md bg-white z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="py-4 px-6 border-b">
          <p className="text-xl font-medium">Buy Tokens</p>
        </div>

        <div className="w-[90%] mx-auto rounded-md border mt-8 mb-6 p-7 py-4">
          <h3 className="text-2xl font-medium">
            10 <span className="text-sm font-normal">Tokens</span>
          </h3>
        </div>

        <div className="w-[90%] mx-auto mb-28">
          <p className="text-sm mb-2">
            Currency price of Token <span className="text-red-600">*</span>
          </p>
          <div className="bg-[#F8F8F8]  flex items-center justify-between px-7 h-14 flex-1">
            <p className="text-gray-700">100,000</p>
            <p>Naira</p>
          </div>
        </div>

        <footer className="h-[70px] fixed bottom-0 left-0 bg-white shadow-lg right-0 px-2 pr-9 flex justify-end space-x-6 items-center border-t-[.8px] border-gray-300">
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
          <SolidButton
            onClickHandler={() => router.push("/payment/success")}
            title="Buy Now"
            styles={{ width: "160px", height: "41px" }}
          />
        </footer>
      </div>
    </>
  );
};

export default BuyTokenModal;
