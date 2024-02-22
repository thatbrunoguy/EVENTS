"use client";

import { Login } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import PrimaryLoading from "@/app/components/loaders/PrimaryLoading";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { storeData } from "@/app/utils/localstorage";
import { EVENTSPARROT_USER } from "@/app/constants";
import { useMutation } from "@tanstack/react-query";
import { authFunctions } from "@/app/utils/endpoints";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const forgotPassword = useMutation({
    mutationFn: authFunctions.forgotPassword,
    onError: async (error, variables, context) => {},
    onSuccess: async (data, variables, context) => {
      // console.log("forgot-password", data);
      router.push("/auth/reset-password");
    },
  });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgotPassword.mutate({ email: email });
  };

  return (
    <section className="w-screen h-screen flex items-center justify-between p-3 md:p-6">
      {/* {status === "loading" && <PrimaryLoading />} */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* LEFT */}
      <form onSubmit={submitHandler} className="w-full md:basis-1/2 ">
        <div className=" w-full md:w-[518px] mx-auto">
          <header className="w-full flex flex-col items-center mb-10">
            <div className="relative w-[120px] md:w-[200px] h-9 md:h-[42px]">
              <Image
                src="/assets/eventparrot-logo.svg"
                alt="Eventparrot logo"
                fill
                priority
              />
            </div>
            <h3 className="font-semibold text-2xl md:text-3xl mt-3">
              Welcome back!
            </h3>
          </header>

          <div className="my-5 text-sm text-red-500 text-center">
            Enter account email to reset password
          </div>

          <div className="mb-5">
            <label className="text-sm text-gray-800" htmlFor="organizerName">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            />
          </div>

          <button
            disabled={forgotPassword.isPending}
            type="submit"
            className={`${
              forgotPassword.isPending ? "bg-opacity-50 cursor-wait" : ""
            } bg-primaryPurple w-full h-14 hover:bg-opacity-70 rounded-md text-sm text-white`}
          >
            <p>Continue</p>
          </button>

          <div className="mt-11 text-sm">
            <p>
              Don&apos;t have an account?{" "}
              <span className="text-primaryPurple font-medium hover:underline hover:underline-offset-2">
                <Link href="/auth/sign-up">Sign up</Link>
              </span>
            </p>
          </div>
        </div>
      </form>

      {/* RIGHT */}

      <div className=" hidden md:block basis-1/2 h-screen p-6">
        <div className="relative w-full h-full overflow-hidden rounded-[20px]">
          <Image
            fill
            src="/assets/login.png"
            alt="login event"
            className="object-cover"
            //   width={200}
            //   height={42}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
