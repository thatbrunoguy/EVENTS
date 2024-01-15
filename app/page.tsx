import Image from "next/image";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import { HiOutlinePlusSm } from "react-icons/hi";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex">
      <Sidebar />
      <main className="h-screen flex-1">
        <Header />
        <h3 className="font-semibold text-2xl ml-12 mt-12">Dashboard</h3>
      </main>
    </section>
  );
}
