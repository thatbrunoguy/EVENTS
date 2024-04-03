"use client";

import React, { useState } from "react";

const page = () => {
  const [data, setData] = useState({
    firstName: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(data);
  };
  return (
    <div className="my-12 md:my-[84px] flex flex-col md:flex-row justify-between mx-auto w-[90%]">
      <div className="w-[245px]">
        <p className="w-full font-semibold text-xl md:text-3xl">Contact us</p>
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-[60%]  flex justify-end">
        <form className="w-full">
          <div className="w-full">
            <div className="flex items-center space-x-6">
              <div className="basis-1/2">
                <label
                  className="text-sm text-gray-800 block mb-2"
                  htmlFor="state"
                >
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
                  onChange={(e) =>
                    //@ts-ignore
                    setData((prev) => ({ ...prev, state: e.target.value }))
                  }
                />
              </div>
              <div className="basis-1/2">
                <label
                  className="text-sm text-gray-800 block mb-2"
                  htmlFor="organizerName"
                >
                  Postal Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
                  onChange={(e) =>
                    //@ts-ignore
                    setData((prev) => ({
                      ...prev,
                      postalCode: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="mt-8">
              <label className="text-sm text-gray-800" htmlFor="name">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Quick description of your Event name"
                className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
                onChange={(e) =>
                  //@ts-ignore
                  setData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>

            <div className="mt-8">
              <label className="text-sm text-gray-800" htmlFor="name">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Quick description of your Event name"
                className="h-[300px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
                onChange={(e) =>
                  //@ts-ignore
                  setData((prev) => ({ ...prev, message: e.target.value }))
                }
              />
            </div>

            <button
              type="submit"
              className={
                "mt-8 bg-primaryPurple w-full h-14 hover:bg-opacity-70 rounded-md text-sm text-white"
              }
              onClick={handleSubmit}
            >
              <p>Submit</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
