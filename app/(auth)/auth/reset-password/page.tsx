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
import { authFunctions } from "@/app/utils/endpoints";
import { useMutation } from "@tanstack/react-query";

const ResetPassword = () => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [loginCredential, setLoginCredential] = useState<{
    email: string;
    password: string;
    code: string;
  }>({
    email: "",
    password: "",
    code: "",
  });

  const resetPassword = useMutation({
    mutationFn: authFunctions.resetPassword,
    onError: async (error, variables, context) => {},
    onSuccess: async (data, variables, context) => {
      console.log("reset-password", data);
      router.push("/auth/login");
    },
  });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    resetPassword.mutate(loginCredential);
  };

  return (
    <section className="w-screen h-screen flex items-center justify-between p-3 md:p-6">
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
            Enter code sent to your email
          </div>

          <div>
            <label className="text-sm text-gray-800" htmlFor="code">
              Code <span className="text-red-500">*</span>
            </label>
            <input
              value={loginCredential.code}
              onChange={(e) =>
                setLoginCredential((prev) => ({
                  ...prev,
                  code: e.target.value,
                }))
              }
              id="code"
              type="text"
              required
              className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            />
          </div>

          <div className="mt-5">
            <label className="text-sm text-gray-800" htmlFor="organizerName">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              value={loginCredential.email}
              onChange={(e) =>
                setLoginCredential((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              type="email"
              required
              className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            />
          </div>

          <div className="my-6">
            <label
              className="text-sm text-gray-800 mb-2 block"
              htmlFor="organizerName"
            >
              Enter new password <span className="text-red-500">*</span>
            </label>

            <div className="h-[56px] w-full flex items-center rounded-lg pr-4 bg-[#F8F8F8] focus-within:border-[2px]  focus-within:border-purple-600 ">
              <input
                value={loginCredential.password}
                onChange={(e) =>
                  setLoginCredential((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                required
                type={isPasswordVisible ? "text" : "password"}
                className="h-full text-sm w-full text-gray-600 px-3  block  bg-transparent outline-none border-none"
              />

              <div
                className="cursor-pointer"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
              >
                {isPasswordVisible ? <FiEye /> : <FiEyeOff />}
              </div>
            </div>
          </div>

          <button
            disabled={resetPassword.isPending}
            type="submit"
            className={`${
              resetPassword.isPending ? "bg-opacity-50 cursor-wait" : ""
            } bg-primaryPurple w-full h-14 hover:bg-opacity-70 rounded-md text-sm text-white`}
          >
            <p>Continue</p>
          </button>
          {/* </Link> */}

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

export default ResetPassword;
