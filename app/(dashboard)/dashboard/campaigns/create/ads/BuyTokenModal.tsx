"use client";

import {
  SolidButton,
  TransparentButton,
} from "@/app/components/buttons/button";
import { campaignFn } from "@/app/utils/endpoints/campaign";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
// import {campaignFn} from "@/app/utils/"
type Iprops = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tokenAmount?: number;
};

const BuyTokenModal = ({ setIsModalOpen, tokenAmount }: Iprops) => {
  const router = useRouter();
  const [token, setToken] = useState<any | number>(tokenAmount ?? 10);
  const [enabled, setEnabled] = useState(false);

  const { data: buy_token } = useQuery({
    queryKey: ["buyToken"],
    queryFn: () => campaignFn.buyToken({ token_qty: token }),
    enabled: enabled,
  });

  const handleBuyToken = () => {
    if (token < 5) {
      toast.error("Token  cannot be less than 5");
      return;
    } else if (token > 50) {
      toast.error("Token should not be greater than 50");
      return;
    } else if (token % 5 > 0) {
      toast.error("Token should multiple of 5");
      return;
    }
    setEnabled(true);
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(false)}
        className="bg-black bg-opacity-50 backdrop-blur-sm fixed z-20  top-0 left-0 right-0 bottom-0"
        aria-label="backdrop"
      />
      <div className="w-[94%] md:w-[760px] h-auto rounded-md bg-white z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="py-4 px-6 border-b">
          <p className="text-xl font-medium">Buy Tokens</p>
        </div>

        <div className="w-[90%] mx-auto rounded-md border mt-8 mb-6 p-7 py-4">
          <input
            type="number"
            value={token}
            onChange={(e) => setToken(Number(e.target.value))}
            className="outline-none h-[100%] text-[30px] w-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="text-sm font-normal">Tokens</span>
        </div>

        <div className="w-[90%] mx-auto mb-28">
          <p className="text-sm mb-2">
            Currency price of Token <span className="text-red-600">*</span>
          </p>
          <div className="bg-[#F8F8F8]  flex items-center justify-between px-7 h-14 flex-1">
            <p className="text-gray-700">{token * 10000}</p>
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
            onClickHandler={handleBuyToken}
            title="Buy Now"
            styles={{ width: "160px", height: "41px" }}
          />
        </footer>
      </div>
    </>
  );
};

export default BuyTokenModal;
