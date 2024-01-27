"use client";

import {
  SolidButton,
  TransparentButton,
} from "@/app/components/buttons/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Confetti from "react-confetti";
type Iprops = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PaymentSuccess = ({ setIsModalOpen }: Iprops) => {
  const router = useRouter();
  return (
    <>
      <div
        // onClick={() => setIsModalOpen(false)}
        className="bg-black bg-opacity-50 backdrop-blur-sm fixed z-20  top-0 left-0 right-0 bottom-0"
        aria-label="backdrop"
      />
      <div className="w-[533px] h-[342px] flex flex-col items-center justify-center rounded-md p-6 bg-white z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="absolute top-0 left-0 botto right-0">
          <Confetti width={533} height={342} />
        </div>
        <h2 className="mb-2 text-2xl font-medium">Tokens bought successful</h2>

        <p className="text-lightText">
          {" "}
          You have been credited 10 Tokens for campaign
        </p>

        <Image
          width={136}
          height={136}
          alt="Successful payment check"
          src="/assets/success-check.svg"
        />
      </div>
    </>
  );
};

export default PaymentSuccess;
