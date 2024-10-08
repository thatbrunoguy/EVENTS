import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eventparrot",
  description: "Generated by create next app",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
