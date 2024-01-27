"use client";

import { usePathname } from "next/navigation";
import React from "react";

const BasicInfoHeader = () => {
  const pathname = usePathname();
  const isBasicInfo = pathname.split("/")[2] === "basic-info";
  return (
    <main>
      {isBasicInfo && (
        <header className="mb-12 w-[94%] mx-auto md:w-full">
          <h2 className="text-[40px] font-semibold">Hi Christian 👋🏼</h2>
          <p className="text-lightText">
            Ready to arrange your event? It'll just take a few minutes.
          </p>
        </header>
      )}
    </main>
  );
};

export default BasicInfoHeader;
