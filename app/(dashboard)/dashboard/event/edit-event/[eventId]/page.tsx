"use client";

import { useParams } from "next/navigation";
import React from "react";
import CreateAndEditEvent from "../../../create/CreateAndEditEvent";

const page = () => {
  return (
    <div>
      <CreateAndEditEvent />
    </div>
  );
};

export default page;
