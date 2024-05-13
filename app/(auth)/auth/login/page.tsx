"use client";

import { AccountInfo, Login } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import React, { useLayoutEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import PrimaryLoading from "@/app/components/loaders/PrimaryLoading";
import toast, { Toaster } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { addToLocalStorage, storeData } from "@/app/utils/localstorage";
import { EVENTSPARROT_USER } from "@/app/constants";
import { authFunctions } from "@/app/utils/endpoints";

const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [accountInfo, setAccountInfo] = useState<AccountInfo | {}>({});
  const searchParams = useSearchParams();
  const invite = searchParams.get("invite");

  const { getAccountInfo, getUserAccount } = authFunctions;

  const getAccount = async () => {
    try {
      const res = await getAccountInfo();
      if (res) {
        setAccountInfo(res);
      }
    } catch (error) {
      console.log("Unable to get account info");
    }
  };

  const getAccounts = async () => {
    try {
      const res = await getUserAccount();

      if (res) {
        addToLocalStorage(EVENTSPARROT_USER, "account", res[0]);
        await getAccount();

        if (res[0].events_count > 0) {
          router.push("/dashboard");
        } else if (res[0].events_count === 0) {
          router.push("/dashboard/event");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useLayoutEffect(() => {
    if (status === "authenticated") {
      storeData(EVENTSPARROT_USER, session.user);
      getAccounts();
    }
  }, [status]);

  const [loginCredential, setLoginCredential] = useState<Login>({
    email: "",
    password: "",
  });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    const userCred = { ...loginCredential };
    if (invite) {
      userCred.invite = invite;
    }
    const res = await signIn("credentials", {
      ...userCred,
      redirect: false,
      // callbackUrl: "/",
    });
    if (res?.ok) {
      setIsProcessing(false);
    }

    if (res?.error) {
      toast.error(res.error as string);
      setIsProcessing(false);
    }
  };

  if (status === "loading" && !accountInfo) {
    return <PrimaryLoading />;
  }

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

          <div>
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
              Enter password <span className="text-red-500">*</span>
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
            <Link href="/auth/forgot-password">
              <p className="text-xs text-red-600 mt-2 hover:underline underline-offset-4 cursor-pointer">
                forgot password
              </p>
            </Link>
          </div>

          {/* <Link href="/auth/otp"> */}
          <button
            disabled={isProcessing}
            type="submit"
            className={`${
              isProcessing ? "bg-opacity-50 cursor-wait" : ""
            } bg-primaryPurple w-full h-14 hover:bg-opacity-70 rounded-md text-sm text-white`}
          >
            <p>Continue</p>
          </button>
          {/* </Link> */}

          {/* <div className="flex items-center space-x-4 my-5">
            <div className="basis-1/2 h-[.8px] bg-[#E7E4EB]" />
            <p className="text-sm text-[#706D73] ">or</p>
            <div className="basis-1/2 h-[.8px] bg-[#E7E4EB]" />
          </div> */}

          {/* <div className="border rounded-lg h-12 flex items-center justify-center space-x-3">
            <div className="text-2xl">
              <FcGoogle />
            </div>
            <p>Sign in with Google</p>
          </div> */}

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

export default Login;
