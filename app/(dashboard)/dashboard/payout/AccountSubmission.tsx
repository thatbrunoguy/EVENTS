import {
  SolidButton,
  TransparentButton,
} from "@/app/components/buttons/button";
import ReactSelectOptions from "@/app/components/select/ReactSelect";
import { banks } from "@/app/utils/endpoints/banks";
import { payoutFn } from "@/app/utils/endpoints/payout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
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
  const router = useRouter();
  const [pageCAC, flipPageCAC] = useState(1);
  const [pageAccount, flipPageAccount] = useState(1);
  const [businessName, setBusinessName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [cacNumber, setCacNumber] = useState(0);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [accountData, setAccountData] = useState<any>({});
  const [error, setError] = useState(false);

  const validateCac = useMutation({
    mutationFn: payoutFn.verifyCac,
    onError: async (error, variables, context) => {
      //@ts-ignore
      toast.error(error.response.data.message);
      setError(true);
    },
    onSuccess: async (data, variables, context) => {
      flipPageCAC((prev) => (prev = 2));
    },
  });

  const getBank = useMutation({
    mutationFn: payoutFn.getBank,
    onError: async (error, variables, context) => {
      toast.error(error.message);
      setError(true);
    },
    onSuccess: async (data, variables, context) => {
      setAccountData(data);
      flipPageAccount((prev) => (prev = 2));
    },
  });

  const saveBank = useMutation({
    mutationFn: payoutFn.saveBankDetails,
    onError: async (error, variables, context) => {},
    onSuccess: async (data, variables, context) => {
      setIsModalOpen(false);
      router.push("/dashboard/payout");
    },
  });

  const handleVerify = () => {
    saveBank.mutate({
      bank_code: selectedOption?.value,
      account_number: accountNumber,
      bank_name: selectedOption?.label,
    });
  };

  const handleFliPage = () => {
    if (accountType === "organization") {
      validateCac.mutate({
        business_name: businessName,
        rc_number: cacNumber,
      });
      getBank.mutate({
        bank_code: selectedOption?.value,
        account_number: accountNumber,
      });
    } else if (accountType === "individual") {
      getBank.mutate({
        bank_code: selectedOption?.value,
        account_number: accountNumber,
      });
    }
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
            {pageAccount === 2
              ? "Confirm Individual na           me"
              : "Submit your Payout bank details"}
          </p>
        </div>

        <div className="w-[90%] mx-auto mb-28">
          {pageAccount === 2 && (
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
            <ReactSelectOptions
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              options={banks?.map((bank: any) => ({
                value: bank?.code,
                label: bank?.name,
              }))}
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
              {pageAccount == 2 ? (
                <p className="flex gap-2 items-center">
                  <img src="/assets/done.svg" alt="" />
                  <span className="text-sm text-green-700">
                    {accountData?.account_name}
                  </span>
                </p>
              ) : null}
            </label>
            <input
              type="text"
              onChange={(e) => setAccountNumber(e.target.value)}
              className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            />
          </div>
          {/* business name */}
          {accountType === "organization" ? (
            <div className="my-6 ">
              <label
                className="text-sm mb-2 text-gray-800 flex justify-between"
                htmlFor="cacNumber"
              >
                <p>
                  Business name <span className="text-red-500">*</span>
                </p>
              </label>
              <input
                type="text"
                onChange={(e) => setBusinessName(e.target.value)}
                className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
              />
            </div>
          ) : null}
          {/* cac number */}
          {accountType === "organization" ? (
            <div className="my-6 ">
              <label
                className="text-sm mb-2 text-gray-800 flex justify-between"
                htmlFor="cacNumber"
              >
                <p>
                  CAC Number <span className="text-red-500">*</span>
                </p>
                {pageCAC == 2 ? (
                  <p className="flex gap-2 items-center">
                    <img src="/assets/done.svg" alt="" />
                    <span className="text-sm text-green-700">
                      {businessName}
                    </span>
                  </p>
                ) : null}
              </label>
              <input
                type="text"
                onChange={(e) => setCacNumber(Number(e.target.value))}
                className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
              />
            </div>
          ) : null}
        </div>
        {pageAccount === 1 && pageCAC === 1 && !error ? (
          <footer className="h-[70px] fixed bottom-0 left-0 bg-white shadow-lg right-0 px-2 md:pr-9 flex justify-center md:justify-end space-x-6 items-center border-t-[.8px] border-gray-300">
            <SolidButton
              onClickHandler={handleFliPage}
              title="Verify"
              isComplete={
                accountType === "organization"
                  ? !!cacNumber &&
                    !!businessName &&
                    !!selectedOption?.value &&
                    !!accountNumber
                  : !!selectedOption?.value && !!accountNumber
              }
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
              title="Submit"
              styles={{ width: "160px", height: "41px" }}
            />
          </footer>
        )}
      </div>
    </>
  );
};

export default AccountSubmission;
