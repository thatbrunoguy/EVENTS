import {
  SolidButton,
  TransparentButton,
} from "@/app/components/buttons/button";
import React, { useState } from "react";
import { FcContacts } from "react-icons/fc";

type Iprops = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenNextModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAccountType: React.Dispatch<React.SetStateAction<string>>;
  accountType: string;
};

const AccountType = ({
  setIsModalOpen,
  setOpenNextModal,
  accountType,
  setAccountType,
}: Iprops) => {
  const handleNext = () => {
    setOpenNextModal(true);
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(false)}
        className="bg-black bg-opacity-50 backdrop-blur-sm fixed z-20  top-0 left-0 right-0 bottom-0"
        aria-label="backdrop"
      />

      <div className="w-[96%] md:w-[760px] h-auto rounded-md bg-white z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="py-4 px-6 border-b">
          <p className="text-xl font-medium">Select account type</p>
        </div>

        <div className="w-[90%] mx-auto mb-28">
          <div className="flex items-center gap-10 mt-4">
            <div
              className={`flex gap-3 w-[338px] h-[104px] items-center border ${
                accountType === "individual"
                  ? "border-primaryPurple"
                  : "border-[#eaeaea]"
              } pr-3 rounded-xl cursor-pointer`}
              onClick={() => setAccountType("individual")}
            >
              <div
                className={`${
                  accountType === "individual"
                    ? "bg-lightPurple"
                    : "bg-gray-100"
                } h-[100%] flex items-center rounded-l-xl w-[30%]`}
              >
                <img src="/assets/contact.svg" alt="." />
              </div>
              <div className="text-sm">
                <p className="font-medium">Individual</p>
                <p className="text-gray-700 text-sm">
                  Used for payouts going to an individual&apos;s account.
                </p>
              </div>
              <input
                type="radio"
                name="individual"
                id="individual"
                checked={accountType === "individual"}
              />
            </div>
            <div
              className={`flex gap-3 w-[338px] h-[104px] items-center border ${
                accountType === "organization"
                  ? "border-primaryPurple"
                  : "border-[#eaeaea]"
              } pr-2 rounded-xl cursor-pointer`}
              onClick={() => setAccountType("organization")}
            >
              <div
                className={`${
                  accountType === "organization"
                    ? "bg-lightPurple"
                    : "bg-gray-100"
                } h-[100%] flex items-center rounded-l-xl w-[35%] p-2`}
              >
                <img src="/assets/love-people.svg" alt="." />
              </div>
              <div className="text-sm">
                <p className="font-medium">Organization</p>
                <p className="text-gray-700 text-sm">
                  Used for payouts going to a company, business, or other
                  established entity.
                </p>
              </div>
              <input
                type="radio"
                name="individual"
                id="individual"
                checked={accountType === "organization"}
              />
            </div>
          </div>
        </div>

        <footer className="h-[70px] fixed bottom-0 left-0 bg-white shadow-lg right-0 px-2 md:pr-9 flex justify-center md:justify-end space-x-6 items-center border-t-[.8px] border-gray-300">
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
            onClickHandler={handleNext}
            title="Next"
            styles={{ width: "160px", height: "41px" }}
          />
        </footer>
      </div>
    </>
  );
};

export default AccountType;
