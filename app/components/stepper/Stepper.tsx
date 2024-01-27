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

const Stepper = () => {
  const step: Step[] = [
    {
      title: "Basic info",
      path: "basic-info",
      isComplete: false,
      isActive: false,
    },
    { title: "Details", path: "details", isComplete: false, isActive: false },
    {
      title: "Basic Tickets",
      path: "ticket",
      isComplete: false,
      isActive: false,
    },
  ];

  const [steps, setSteps] = useState<Step[]>(step);

  const activeStepsHandler = (
    currentPath: string,
    stepsArray: Step[]
  ): Step[] => {
    const currentStepIndex = stepsArray.findIndex(
      (step) => step.path === currentPath
    );

    if (currentStepIndex !== -1) {
      // Deactivate all steps
      stepsArray.forEach((step) => {
        step.isActive = false;
      });

      // Activate the current step
      stepsArray[currentStepIndex].isActive = true;
    }

    // Return the updated steps array
    return [...stepsArray];
  };

  const currentPath = usePathname().split("/")[2];

  useEffect(() => {
    // const res = activeStepsHandler(currentPath, steps);
    const storedStep = getData("event-creation");

    if (storedStep !== null) {
      setSteps(storedStep);
      const res = activeStepsHandler(currentPath, storedStep);
      setSteps(res);
    } else {
      const res = activeStepsHandler(currentPath, steps);
      setSteps(res);
    }
  }, [currentPath]);

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
