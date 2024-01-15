"use client";

import React from "react";
import { GoPlus } from "react-icons/go";

const Faq = () => {
  return (
    <div>
      <div className="w-full px-6 py-6 mt-8 border border-dashed border-gray-500 rounded-md">
        <p className="font-semibold ">Add FAQ section to your event page</p>
        <p className="text-lightText mt-3 mb-5 ">
          Make your event stand out even more. These sections help attendees
          find information and answer their questions -which means more ticket
          sales and less time answering messages.
        </p>
        <button className="bg-lightPurple text-sm flex justify-center items-center space-x-1 text-primaryPurple h-10 w-full">
          <GoPlus /> <p>Add Question</p>
        </button>
      </div>
    </div>
  );
};

export default Faq;
