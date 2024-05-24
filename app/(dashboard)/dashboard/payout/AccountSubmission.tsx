import {
  SolidButton,
  TransparentButton,
} from "@/app/components/buttons/button";
import React, { useState } from "react";
import { IoIosAlert } from "react-icons/io";

type Iprops = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenNextModal: React.Dispatch<React.SetStateAction<boolean>>;
  accountType: string;
};

const AccountSubmission = ({
  setIsModalOpen,
  setOpenNextModal,
  accountType,
}: Iprops) => {
  const [page, flipPage] = useState(1);
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState(0);
  const [cacNumber, setCacNumber] = useState(0);

  const handleVerify = () => {
    setOpenNextModal(true);
    setIsModalOpen(false);
  };

  const handleFliPage = () => {
    flipPage((prev) => (prev = 2));
  };

  return (
    <>
      <div
        // onClick={() => setIsModalOpen(false)}
        className="bg-black bg-opacity-50 backdrop-blur-sm fixed z-20  top-0 left-0 right-0 bottom-0"
        aria-label="backdrop"
      />

      <div className="w-[96%] md:w-[760px] h-auto rounded-md bg-white z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="py-4 px-6 border-b">
          <p className="text-xl font-medium">
            {page === 2
              ? "Confirm Individual name"
              : "Submit your Payout bank details"}
          </p>
        </div>

        <div className="w-[90%] mx-auto mb-28">
          {page === 2 && (
            <div className="my-6 bg-lightPurple flex gap-3 items-center p-2 rounded-lg text-sm">
              <IoIosAlert color="#7431B8" />
              <p>Ensure your name matches with your bank details</p>
            </div>
          )}
          <div className="my-6 ">
            <label
              className="text-sm mb-2 block text-gray-800"
              htmlFor="organizerName"
            >
              Bank name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              onChange={(e) => setAccountName(e.target.value)}
              className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            />
          </div>
          <div className="my-6 ">
            <label
              className="text-sm mb-2 text-gray-800 flex justify-between"
              htmlFor="organizerName"
            >
              <p>
                Bank Account Number <span className="text-red-500">*</span>
              </p>
              {page == 2 ? (
                <p className="flex gap-2 items-center">
                  <img src="/assets/done.svg" alt="" />
                  <span className="text-sm text-green-700">Oni usman</span>
                </p>
              ) : null}
            </label>
            <input
              type="text"
              onChange={(e) => setAccountNumber(Number(e.target.value))}
              className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            />
          </div>
          {accountType === "organization" ? (
            <div className="my-6 ">
              <label
                className="text-sm mb-2 text-gray-800 flex justify-between"
                htmlFor="organizerName"
              >
                <p>
                  CAC Number <span className="text-red-500">*</span>
                </p>
                {page == 2 ? (
                  <p className="flex gap-2 items-center">
                    <img src="/assets/done.svg" alt="" />
                    <span className="text-sm text-green-700">Oni usman</span>
                  </p>
                ) : null}
              </label>
              <input
                type="text"
                onChange={(e) => setAccountNumber(Number(e.target.value))}
                className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
              />
            </div>
          ) : null}
        </div>
        {page === 1 ? (
          <footer className="h-[70px] fixed bottom-0 left-0 bg-white shadow-lg right-0 px-2 md:pr-9 flex justify-center md:justify-end space-x-6 items-center border-t-[.8px] border-gray-300">
            <SolidButton
              onClickHandler={handleFliPage}
              title="Submit"
              styles={{ width: "160px", height: "41px" }}
            />
          </footer>
        ) : (
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
              onClickHandler={handleVerify}
              title="Verify"
              styles={{ width: "160px", height: "41px" }}
            />
          </footer>
        )}
      </div>
    </>
  );
};

export default AccountSubmission;
