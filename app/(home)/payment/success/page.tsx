"use client";

import {
  SolidButton,
  TransparentButton,
} from "@/app/components/buttons/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Confetti from "react-confetti";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

// type Iprops = {
//   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
// };

const PaymentSuccess = ({ setIsModalOpen }: any) => {
  const router = useRouter();
  return (
    <>
      <div
        // onClick={() => setIsModalOpen(false)}
        className="bg-primaryPurple backdrop-blur-sm fixed z-20  top-0 left-0 right-0 bottom-0"
        aria-label="backdrop"
      />
      <div className="w-[94%] md:w-[533px] h-[342px] flex flex-col items-center justify-center rounded-md p-6 pb-3 bg-white z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="absolute top-0 left-0 botto right-0">
          <Confetti width={533} height={342} />
        </div>
        <h2 className="mb-2 text-2xl font-medium">Payment Successful</h2>

        <p className="text-lightText text-center md:text-left">
          {" "}
          You have successfully purchased the ticket for the event
        </p>

        <Image
          width={136}
          height={136}
          alt="Successful payment check"
          src="/assets/success-check.svg"
        />

        <Link className="w-[60%] mt-3" href="/">
          <button className="w-full text-white hover:bg-opacity-50 bg-primaryPurple h-12 flex items-center justify-center gap-2">
            <div>
              <MdOutlineKeyboardBackspace />
            </div>{" "}
            <p>Return home</p>
          </button>
        </Link>
      </div>
    </>
  );
};

export default PaymentSuccess;
