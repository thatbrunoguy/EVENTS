"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
const SignUp = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isProgressed, setIsProgressed] = useState(false);
  return (
    <section className="w-screen h-screen flex items-center justify-between p-3 md:p-6">
      {/* LEFT */}
      <div className="w-full md:basis-1/2 ">
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
            <h3 className="font-semibold text-2xl md:text-3xl mt-1 md:mt-3">
              Welcome back!
            </h3>
          </header>
          <div>
            <div className="mb-4 md:mb-6">
              <label className="text-sm text-gray-800" htmlFor="organizerName">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
              />
            </div>
            {!isProgressed && (
              <button
                onClick={() => setIsProgressed(true)}
                className="bg-primaryPurple w-full h-14 hover:bg-opacity-70 rounded-md text-sm text-white"
              >
                <p>Continue</p>
              </button>
            )}
          </div>
          {isProgressed && (
            <div>
              <div className="flex items-center space-x-6 ">
                <div className="basis-1/2">
                  <label
                    className="text-sm text-gray-800"
                    htmlFor="organizerName"
                  >
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
                  />
                </div>
                <div className="basis-1/2">
                  <label
                    className="text-sm text-gray-800"
                    htmlFor="organizerName"
                  >
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
                  />
                </div>
              </div>
              <div className="my-6">
                <label
                  className="text-sm text-gray-800 mb-2 block"
                  htmlFor="organizerName"
                >
                  Create password <span className="text-red-500">*</span>
                </label>

                <div className="h-[56px] w-full flex items-center rounded-lg pr-4 bg-[#F8F8F8] focus-within:border-[2px]  focus-within:border-purple-600 ">
                  <input
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
              <Link href="/auth/otp">
                <button className="bg-primaryPurple w-full h-14 hover:bg-opacity-70 rounded-md text-sm text-white">
                  <p>Continue</p>
                </button>
              </Link>
            </div>
          )}
          <div className="flex items-center space-x-4 my-4 md:my-5">
            <div className="basis-1/2 h-[.8px] bg-[#E7E4EB]" />
            <p className="text-sm text-[#706D73] ">or</p>
            <div className="basis-1/2 h-[.8px] bg-[#E7E4EB]" />
          </div>

          <div className="border rounded-lg h-12 flex items-center justify-center space-x-3">
            <div className="text-2xl">
              <FcGoogle />
            </div>
            <p>Sign up with Google</p>
          </div>

          <div className="mt-6 md:mt-11 text-sm">
            <p>
              Already have an account?{" "}
              <span className="text-primaryPurple font-medium hover:underline hover:underline-offset-2">
                <Link href="/auth/login">Log in</Link>
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT */}

      <div className="hidden md:block   basis-1/2 h-screen p-6">
        <div className="relative w-full h-full overflow-hidden rounded-[20px]">
          <Image
            fill
            src="/assets/register.png"
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

export default SignUp;
