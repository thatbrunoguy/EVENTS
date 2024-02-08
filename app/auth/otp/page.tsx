"use client";

import PrimaryLoading from "@/app/components/loaders/PrimaryLoading";
import { EVENTSPARROT_USER } from "@/app/constants";
import { authFunctions } from "@/app/utils/endpoints";
import { getData } from "@/app/utils/localstorage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import OtpInput from "react-otp-input";

const OTP = () => {
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    setUser(getData(EVENTSPARROT_USER));
    console.log("user", user);
  }, []);

  const [otp, setOtp] = useState("");
  const router = useRouter();

  const verifyOTPMutation = useMutation({
    mutationFn: authFunctions.verifyOTP,
    onError: async (error, variables, context) => {
      // An error happened!
      console.log(`rolling back optimistic update with id ${error}`);
    },
    onSuccess: async (data, variables, context) => {
      // Boom baby!
      console.log("data", data);
      router.push("/auth/login");
    },
  });

  const resendOTPMutation = useMutation({
    mutationFn: authFunctions.resendOTP,
    onError: async (error, variables, context) => {
      // An error happened!
      console.log(`rolling back optimistic update with id ${error}`);
    },
    onSuccess: async (data, variables, context) => {
      // Boom baby!
      console.log("data", data);
      router.push("/auth/otp");
    },
  });

  const verifyOTPHandler = () => {
    verifyOTPMutation.mutate({ code: otp });
  };
  return (
    <section className="flex h-screen items-center justify-center">
      {verifyOTPMutation.isPending && <PrimaryLoading />}
      <div className=" w-[95%] md:w-[480px] ">
        <div className="w-[60px] h-[60px] p-7 bg-lightPurple mx-auto text-3xl text-primaryPurple rounded-full grid place-content-center mt-3">
          <MdEmail />
        </div>
        <h3 className="font-medium text-2xl my-3 text-center">
          Please check your email
        </h3>
        <p className="text-center text-gray-700">
          We have sent a code to{" "}
          <span className="font-medium">{user?.user?.email}</span> .
          <br />
          Please type it below.
        </p>

        <div className="flex items-center space-x-2 md:space-x-6 mt-6 mb-2">
          <div className="w-full flex justify-between">
            <OtpInput
              value={otp}
              onChange={setOtp}
              inputType="tel"
              containerStyle={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                gap: 24,
              }}
              numInputs={6}
              // renderSeparator={<span>-</span>}
              // skipDefaultStyles
              renderInput={(props) => (
                <input
                  {...props}
                  className="h-[60px] basis-1/6 rounded-lg border border-[#B6B3BA] items-center outline-primaryPurple"
                />
              )}
            />
          </div>
        </div>
        <div className="mt-2 text-sm flex justify-center">
          <p>
            Didnt&apos; get code?{" "}
            <span className="text-primaryPurple font-medium hover:underline hover:underline-offset-2">
              <span
                className="inline  cursor-pointer"
                onClick={resendOTPMutation.mutate}
              >
                Resend
              </span>
            </span>
          </p>
        </div>
        <button
          onClick={verifyOTPHandler}
          className="bg-primaryPurple w-full h-14 mt-6 hover:bg-opacity-70 rounded-md text-sm text-white"
        >
          <p>Verify</p>
        </button>
      </div>
    </section>
  );
};

export default OTP;
