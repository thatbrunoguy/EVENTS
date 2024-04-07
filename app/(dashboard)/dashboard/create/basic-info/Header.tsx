"use client";

import { usePathname } from "next/navigation";
import React from "react";

const BasicInfoHeader = () => {
  const pathname = usePathname();
  const isBasicInfo = pathname.split("/")[3] === "basic-info";
  return (
    <main>
      {isBasicInfo && (
        <header className="mb-6 md:mb-12 w-[94%] mx-auto md:w-full">
          <h2 className="text-[30px] font-medium">Hi Friend 👋🏼</h2>
          <p className="text-lightText">
            Ready to arrange your event? It&apos;ll take just a few minutes.
          </p>
        </header>
      )}
    </main>
  );
};

export default BasicInfoHeader;
