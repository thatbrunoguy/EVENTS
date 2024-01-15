import Image from "next/image";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import { HiOutlinePlusSm } from "react-icons/hi";
import Link from "next/link";

export default function Sales() {
  return (
    <section className="flex">
      <Sidebar />
      <main className="h-screen flex-1">
        <Header />
        <div className="flex justify-center items-center w-full h-[80%]">
          <div className="w-[351px] flex flex-col items-center">
            <Image
              src="/assets/sales.svg"
              alt="Eventparrot logo"
              width={210}
              height={180}
              priority
            />
            <p className="py-5 text-center w-[60%] text-lightText">
              Sales and payouts will appear here
            </p>
          </div>
        </div>
      </main>
    </section>
  );
}
