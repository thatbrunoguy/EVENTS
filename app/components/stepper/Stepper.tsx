"use client";

import { getData } from "@/app/utils/localstorage";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";

export interface Step {
  title: string;
  path: string;
  isComplete: boolean;
  isActive: boolean;
}

type Iprops = {
  steps: Step[];
};
const Stepper = ({ steps }: Iprops) => {
  return (
    <section>
      <div className="w-[249px] hidden md:flex h-[428px]  px-7 space-x-5 items-center rounded-lg border-[0.5px] border-gray-500 relative">
        <p className="text-xs text-lightText absolute top-10 right-8">1/3</p>
        <div className="h-[85%] flex flex-col justify-between items-center ">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col items-center gap-1">
              <div
                className={`w-9 h-9 text-sm rounded-full grid place-content-center ${
                  (step.isActive && step.isComplete) || step.isComplete
                    ? "bg-[#039855] text-white"
                    : step.isActive
                    ? "bg-primaryPurple text-white"
                    : "bg-gray-100 text-black"
                } `}
              >
                {step.isComplete ? (
                  <div>
                    <FiCheck />
                  </div>
                ) : (
                  <p>{index + 1}</p>
                )}
              </div>
              {index <= 1 && (
                <div
                  className={`w-[2px] h-[118px] rounded-full ${
                    (step.isActive && step.isComplete) || step.isComplete
                      ? "bg-[#039855]"
                      : step.isActive
                      ? "bg-primaryPurple"
                      : "bg-[#F8F8F8]"
                  } `}
                />
              )}
            </div>
          ))}
        </div>
        <div className="h-[83%] flex flex-col justify-between items-start">
          {steps.map((step, index) => (
            <div key={step.title}>{step.title}</div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Stepper;
