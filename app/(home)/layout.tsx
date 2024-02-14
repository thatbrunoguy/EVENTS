import type { Metadata } from "next";
import "@/app/globals.css";
import HomeHeader from "../components/home/Header";
import HomeFooter from "../components/home/Footer";
export const metadata: Metadata = {
  title: "Eventparrot",
  description: "Start creating your events today",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <HomeHeader />
      <div>{children}</div>
      <HomeFooter />
    </section>
  );
}
