"use client";

import PrimaryLoading from "@/app/components/loaders/PrimaryLoading";
import { signOut } from "next-auth/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const TeamAccept = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  const handleSignOutClick = async () => {
    try {
      await signOut({ callbackUrl: `/auth/login?${searchParams}` });
      setLoading(false);
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };
  const param1 = searchParams.get("exists");

  if (param1 == "0") {
    setLoading(false);
    redirect(`/auth/sign-up/?${searchParams}`);
  } else {
    handleSignOutClick();
  }
  if (loading) {
    return <PrimaryLoading />;
  }

  return <PrimaryLoading />;
};

export default TeamAccept;
