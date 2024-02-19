import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eventsparrot",
  description: "Welcome to your eventsparrot dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div>{children}</div>
    </section>
  );
}
