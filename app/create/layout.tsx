import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Stepper from "../components/stepper/Stepper";
import BasicInfoHeader from "./basic-info/Header";
import MobileStepper from "../components/stepper/MobileStepper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="py-5 md:py-[50px] w-full md:w-[95%] lg:w-[80%] md:mx-auto">
      <BasicInfoHeader />
      {children}
      {/* <div className="flex justify-between md:space-x-16 lg:space-x-0">
        <div>
          <Stepper />
        </div>
        <main className="flex-1 lg:flex-none w-[50%] lg:w-[748px] ">
          <>
            <div className="mb-6 md:mb-0">
              <MobileStepper />
            </div>
            {children}
          </>
        </main>
      </div> */}
    </section>
  );
}
