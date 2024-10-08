"use client";

import {
  SolidButton,
  TransparentButton,
} from "@/app/components/buttons/button";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import ReactSelectOptions from "../../../components/select/ReactSelect";
import { useMutation } from "@tanstack/react-query";
import { teammateFn } from "@/app/utils/endpoints/teammate";
type Iprops = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const InviteUser = ({ setIsModalOpen }: Iprops) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState({});
  const [email, setEmail] = useState("");
  const checks: boolean = useMemo(() => {
    return !!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/g);
  }, [email, selectedOption]);

  const inviteTeammate = useMutation({
    mutationFn: teammateFn.inviteUser,
    onError: async (error, variables, context) => {},
    onSuccess: async (data, variables, context) => {
      setIsModalOpen(false);
    },
  });

  return (
    <>
      <div
        onClick={() => setIsModalOpen(false)}
        className="bg-black bg-opacity-50 backdrop-blur-sm fixed z-20  top-0 left-0 right-0 bottom-0"
        aria-label="backdrop"
      />
      <div className="w-[760px] h-auto rounded-md bg-white z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="py-4 px-6 border-b">
          <p className="text-xl font-medium">Invite users</p>
        </div>

        <div className="w-[90%] mx-auto mb-28">
          <div className="my-6 ">
            <label
              className="text-sm mb-2 block text-gray-800"
              htmlFor="organizerName"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Input email address"
              onChange={(e) => setEmail(e.target.value)}
              className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            />
          </div>
          <div className="my-6">
            <label
              className="text-sm mb-2 block text-gray-800"
              htmlFor="organizerName"
            >
              Select role <span className="text-red-500">*</span>
            </label>

            <ReactSelectOptions
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              options={[
                { value: 1, label: "Admin (Manage everything)" },
                {
                  value: 2,
                  label: "Marketing (Manage Ads & Emails)",
                },
                {
                  value: 3,
                  label:
                    "Check-in attendees (Scan, Input & Check in attendees on the event day)",
                },
              ]}
            />
          </div>
        </div>

        <footer className="h-[70px] fixed bottom-0 left-0 bg-white shadow-lg right-0 px-2 pr-9 flex justify-end space-x-6 items-center border-t-[.8px] border-gray-300">
          <TransparentButton
            onClickHandler={() => setIsModalOpen(false)}
            title="Cancel"
            styles={{
              borderColor: "#7431B8",
              color: "#7431B8",
              width: "160px",
              height: "41px",
            }}
          />
          <SolidButton
            onClickHandler={() =>
              inviteTeammate.mutate({
                email,
                //@ts-ignore
                role: selectedOption.value,
              })
            }
            title="Add"
            styles={{ width: "160px", height: "41px" }}
            isComplete={checks}
          />
        </footer>
      </div>
    </>
  );
};

export default InviteUser;
