"use client";

import React, { useState } from "react";
import { PiCreditCard } from "react-icons/pi";
import { IoMdMore } from "react-icons/io";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { GoPlus } from "react-icons/go";
import AddTicketType from "@/app/components/ticketType/AddTicketType";
import { IoEyeSharp } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ConfirmDeleteModal from "@/app/components/modals/ConfirmDelete";
import { updateLocalStorageField } from "@/app/utils/localstorage";
import { useRouter } from "next/navigation";
import MainFooter from "@/app/components/footer/MainFooter";

const options = [
  { icon: <IoEyeSharp />, title: "View ticket type" },
  { icon: <RiDeleteBin6Fill />, title: "Delete ticket type" },
];
const Ticket = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const nextHandler = () => {
    updateLocalStorageField("event-creation", "ticket", "isComplete", true);

    // router.push("/event");
  };
  const backHandler = () => {
    router.push("/create/details");
  };
  return (
    <div>
      {/* {isModalOpen && (
        <AddTicketType
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )} */}
      {/* {isDeleteModalOpen && (
        <ConfirmDeleteModal setIsDeleteModalOpen={setIsDeleteModalOpen} />
      )} */}
      <div className="mt-8">
        <div className=" w-[94%] mx-auto md:w-full p-6 border-[.1px] flex justify-between border-gray-300 px-6 shadow-md rounded-md">
          <div className="flex space-x-4">
            <div className="text-[#106BD5] text-2xl  w-8 h-8 grid place-content-center rounded bg-[#EDF4FC]">
              <PiCreditCard />
            </div>
            <div>
              <p className="font-semibold text-xl">Free</p>
              <p className="text-lightText">Double pass</p>
            </div>
          </div>

          <Menu
            direction="left"
            // arrow
            menuButton={
              <MenuButton style={{ background: "transparent" }}>
                <div className="text-gray-800 text-xl h-11 w-11 rounded-full hover:bg-gray-100 grid place-content-center cursor-pointer">
                  <IoMdMore />
                </div>
              </MenuButton>
            }
            transition
          >
            {options.map((item, index) => (
              <MenuItem className="" key={item.title}>
                <div
                  onClick={
                    index === 0
                      ? () => setIsModalOpen(true)
                      : () => setIsDeleteModalOpen(true)
                  }
                  className="flex items-center w-full space-x-3 py-1"
                >
                  <div className="text-gray-500 text-lg">{item.icon}</div>
                  <p className="text-lightText">{item.title}</p>
                </div>
              </MenuItem>
            ))}
          </Menu>
        </div>
        {/* Add Ticket Type */}
        <div className="w-[94%] mx-auto md:w-full px-6 py-6 mt-9 border border-dashed border-gray-500 rounded-md">
          <p className="font-semibold ">Add Ticket type</p>
          <p className="text-lightText mt-3 mb-5 ">
            Create Your Event Experience: Select Ticket Type and Submit. You can
            add multiple ticket types
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-lightPurple text-sm flex justify-center items-center space-x-1 text-primaryPurple h-10 w-full"
          >
            <GoPlus /> <p>Add Ticket type</p>
          </button>
        </div>
      </div>
      <MainFooter nextHandler={nextHandler} backHandler={backHandler} />
    </div>
  );
};

export default Ticket;
