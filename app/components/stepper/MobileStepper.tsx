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

const MobileStepper = () => {
  const step: Step[] = [
    {
      title: "Basic info",
      path: "basic-info",
      isComplete: false,
      isActive: false,
    },
    { title: "Details", path: "details", isComplete: false, isActive: false },
    {
      title: "Tickets",
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
      <div className=" flex-col space-y-5 md:hidden  px-2 items-center rounded-lg relative w-full">
        <div className="flex flex-row justify-between  w-full items-center ">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-row items-center justify-between gap-1"
            >
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
                  className={`h-[2px] min-w-[118px] sm:w-[30vw] rounded-full ${
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
        <div className=" flex text-xs flex-row justify-between items-start">
          <p className="text-xs text-lightText absolute bottom-1 left-[26%] sm:left-32">
            1/3
          </p>
          {steps.map((step, index) => (
            <div key={step.title}>{step.title}</div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default MobileStepper;
