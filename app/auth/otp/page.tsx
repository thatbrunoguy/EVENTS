import Link from "next/link";
import React from "react";
import { MdEmail } from "react-icons/md";

const OTP = () => {
  return (
    <section className="flex h-screen items-center justify-center">
      <div className="w-[480px] ">
        <div className="w-[60px] h-[60px] p-7 bg-lightPurple mx-auto text-3xl text-primaryPurple rounded-full grid place-content-center mt-3">
          <MdEmail />
        </div>
        <h3 className="font-medium text-2xl my-3 text-center">
          Please check your email
        </h3>
        <p className="text-center text-gray-700">
          We have sent a code adegbulugbeisrael@gmail.com.
          <br />
          Please type it below.
        </p>

        <div className="flex items-center space-x-6 mt-6 mb-2">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div className="h-[60px] w-[60px] focus-within:border-primaryPurple border rounded-lg grid place-content-center">
              <input
                type="tel"
                maxLength={1}
                className="block w-full h-full text-center outline-none border-none"
              />
            </div>
          ))}
        </div>
        <div className="mt-2 text-sm flex justify-center">
          <p>
            Didnt&apos; get code?{" "}
            <span className="text-primaryPurple font-medium hover:underline hover:underline-offset-2">
              <Link href="/auth/sign-up">Resend</Link>
            </span>
          </p>
        </div>
        <button className="bg-primaryPurple w-full h-14 mt-6 hover:bg-opacity-70 rounded-md text-sm text-white">
          <p>Verify</p>
        </button>
      </div>
    </section>
  );
};

export default OTP;
