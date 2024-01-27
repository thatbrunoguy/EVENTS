"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { IoIosMore } from "react-icons/io";
import InviteUser from "./InviteUserModal";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ConfirmDeleteModal from "../components/modals/ConfirmDelete";
import { BiSolidPencil } from "react-icons/bi";

const TeamManagement = () => {
  const [options, setOptions] = useState<any>([
    // {
    //   team: "Timilehin Adegbulugbe",
    //   role: "Marketing (Manage Ads & Emails)",
    // },
    // {
    //   team: "Timilehin Adegbulugbe",
    //   role: " Check-in attendees (Scan, Input & Check in attendees on the event day)",
    // },
    {
      team: "Timilehin Adegbulugbe",
      role: "Marketing (Manage Ads & Emails)",
    },
    {
      team: "Timilehin Adegbulugbe",
      role: "Marketing (Manage Ads & Emails)",
    },
    {
      team: "Timilehin Adegbulugbe",
      role: "Marketing (Manage Ads & Emails)",
    },
  ]);

  const more = [
    { icon: <BiSolidPencil />, title: "Edit member" },
    { icon: <RiDeleteBin6Fill />, title: "Delete member" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  return (
    <div>
      <main className="h-screen flex-1  ">
        {/* <Header /> */}
        {isModalOpen && <InviteUser setIsModalOpen={setIsModalOpen} />}
        {isDeleteModalOpen && (
          <ConfirmDeleteModal
            title="Are you sure want to delete this member"
            setIsDeleteModalOpen={setIsDeleteModalOpen}
          />
        )}
        <div className="w-full flex  h-full justify-center">
          {!options.length ? (
            <div className="w-[351px] flex flex-col items-center mt-[15%]">
              <Image
                src="/assets/team.svg"
                alt="Eventparrot logo"
                width={165}
                height={153}
                priority
              />
              <p className="py-5 text-center">
                Create new custom roles and assign them to team members, or
                invite into an all access tole
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-purple-700 py-[10px] px-5 w-[147px] h-[41px] text-white text-sm rounded-lg flex items-center space-x-[4px]"
              >
                <div>
                  <HiOutlinePlusSm />
                </div>
                <p>Invite users</p>
              </button>
            </div>
          ) : (
            <div className="w-[90%] mt-[5%]">
              <div className="">
                <header className="w-full text-sm flex items-center py-3 px-4 bg-[#FBFAFC]">
                  <p className="w-[500px]">Team members</p>
                  <p className="w-[400px]">Roles</p>
                </header>
                {options.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex w-full border-b items-center justify-between"
                  >
                    <div className="flex items-center space-x-5 p-3 ">
                      <div className="w-[460px]">{item.team}</div>
                      <div className="w-[480px]">{item.role}</div>
                      {/* <div className="text-2xl">
                        <IoIosMore />
                      </div> */}
                      <Menu
                        direction="left"
                        // arrow
                        menuButton={
                          <MenuButton style={{ background: "transparent" }}>
                            <div className="text-gray-800 text-xl h-11 w-11 rounded-full hover:bg-gray-100 grid place-content-center cursor-pointer">
                              <IoIosMore />
                            </div>
                          </MenuButton>
                        }
                        transition
                      >
                        {more.map((item, index) => (
                          <MenuItem className="" key={item.title}>
                            <div
                              onClick={
                                index === 0
                                  ? () => setIsModalOpen(true)
                                  : () => setIsDeleteModalOpen(true)
                              }
                              className="flex items-center w-full space-x-3 py-1"
                            >
                              <div className="text-gray-500 text-lg">
                                {item.icon}
                              </div>
                              <p className="text-lightText">{item.title}</p>
                            </div>
                          </MenuItem>
                        ))}
                      </Menu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TeamManagement;
