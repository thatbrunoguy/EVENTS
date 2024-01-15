import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Stepper from "../components/stepper/Stepper";
import BasicInfoHeader from "./basic-info/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="py-[50px] w-[80%] mx-auto">
      <BasicInfoHeader />

      <div className="flex justify-between">
        <div>
          <Stepper />
        </div>
        <main className="w-[748px]">{children}</main>
      </div>
    </section>
  );
}
