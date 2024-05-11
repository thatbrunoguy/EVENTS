"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { IoIosMore } from "react-icons/io";
import InviteUser from "./InviteUserModal";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ConfirmDeleteModal from "../../../components/modals/ConfirmDelete";
import { BiSolidPencil } from "react-icons/bi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { roles, teammateFn } from "@/app/utils/endpoints/teammate";
import { SolidButton } from "@/app/components/buttons/button";

const TeamManagement = () => {
  const { data: teammates, refetch } = useQuery({
    queryFn: teammateFn.getTeammates,
    queryKey: ["teammates"],
  });

  const deleteMember = useMutation({
    mutationFn: teammateFn.deleteMember,
    onError: async (error, variables, context) => {
      // console.log(` ${error}`);
    },
    onSuccess: async (data, variables, context) => {
      refetch();
    },
  });

  const deleteMemberHandler = (id: string) => {
    deleteMember.mutate(id);
  };

  const more = [
    { icon: <BiSolidPencil />, title: "Edit member" },
    { icon: <RiDeleteBin6Fill />, title: "Delete member" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [memberId, setMemberId] = useState("");

  return (
    <div>
      <main className="h-screen flex-1  ">
        {/* <Header /> */}
        {isModalOpen && <InviteUser setIsModalOpen={setIsModalOpen} />}
        {isDeleteModalOpen && (
          <ConfirmDeleteModal
            title="Are you sure want to delete this member"
            content="By deleting this team member, you will lose all the user data. This action can't be undone."
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            deleteTicket={() => deleteMemberHandler(memberId)}
          />
        )}
        <div className="w-full flex  h-full justify-center">
          {!teammates?.length ? (
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
            <div className="w-full mt-[5%]">
              <div className="my-4 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className={`bg-primaryPurple h-10 hover:bg-opacity-70 rounded-md text-sm text-white w-[200px]`}
                >
                  <p>Send invite</p>
                </button>
              </div>
              <div className="">
                <table className="w-full text-xs md:text-sm">
                  <thead className="h-[50px] font-normal">
                    <tr className="py-3 px-4 bg-[#FBFAFC]">
                      <th className="text-left font-normal">Team members</th>
                      <th className="text-left font-normal">Roles</th>
                      <th className="text-left font-normal"></th>
                      <th className="text-left font-normal"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {teammates?.map((team: any) => (
                      <tr className="border-b" key={team?.id}>
                        <td className="py-3">
                          {team.first_name} {team.last_name}
                        </td>
                        <td className="py-3">
                          {
                            //@ts-ignore
                            roles[team?.user_role_on_account]
                          }
                        </td>
                        {team.user_role_on_account === 1 ? (
                          <td className="rounded-md bg-lightPurple w-[100px] p-2 my-3 flex justify-center text-xs text-primaryPurple">
                            Admin
                          </td>
                        ) : (
                          <td className="rounded-md bg-yellow-100 w-[100px] p-2 my-3 flex justify-center text-xs text-yellow-500">
                            Member
                          </td>
                        )}
                        <td>
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
                                      : () => {
                                          setIsDeleteModalOpen(true);
                                          setMemberId(team.id);
                                        }
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TeamManagement;
