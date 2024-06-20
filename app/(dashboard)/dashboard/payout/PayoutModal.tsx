import {
  SolidButton,
  TransparentButton,
} from "@/app/components/buttons/button";
import ReactSelectOptions from "@/app/components/select/ReactSelect";
import { maskNumber } from "@/app/helpers";
import { banks } from "@/app/utils/endpoints/banks";
import { payoutFn } from "@/app/utils/endpoints/payout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

type Iprops = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  highestPayout: number;
};

const PayoutModal = ({ setIsModalOpen, highestPayout }: Iprops) => {
  const queryClient = useQueryClient();
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState(0);

  const requestPayout = useMutation({
    mutationFn: payoutFn.requestPayout,
    onError: async (error, variables, context) => {},
    onSuccess: async (data, variables, context) => {
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["payouts"] });
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      toast.success("Payout request successful");
    },
  });

  const { data } = useQuery({
    queryKey: ["get-banks"],
    queryFn: payoutFn.getBankDetails,
  });

  const handleSelectBank = (id: string) => {
    setAccountNumber(id);
  };

  const handleVerify = () => {
    console.log("first");
    requestPayout.mutate({
      amount,
      user_bank: accountNumber,
    });
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(false)}
        className="bg-black bg-opacity-50 backdrop-blur-sm fixed z-20  top-0 left-0 right-0 bottom-0"
        aria-label="backdrop"
      />

      <div className="w-[96%] md:w-[760px] h-auto rounded-md bg-white z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5">
        <div className="py-4 px-6 border-b">
          <p className="text-xl font-medium">Withdraw earnings</p>
        </div>

        <div className="w-[90%] mx-auto mb-28">
          {data?.banks?.map((bank: any) => (
            <div
              key={bank?.id}
              onClick={() => handleSelectBank(bank?.id)}
              className={`w-full flex px-2 mt-5 h-[70px] items-center border border-${
                accountNumber === bank?.id ? "primaryPurple" : "[#eaeaea]"
              } pr-3 rounded-xl cursor-pointer`}
            >
              <div className="flex item-center gap-5">
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="42" height="42" rx="21" fill="#F5EDFC" />
                  <path
                    d="M34.125 29.7496C34.125 29.9816 34.0328 30.2042 33.8687 30.3683C33.7046 30.5324 33.4821 30.6246 33.25 30.6246H8.75C8.51794 30.6246 8.29538 30.5324 8.13128 30.3683C7.96719 30.2042 7.875 29.9816 7.875 29.7496C7.875 29.5175 7.96719 29.2949 8.13128 29.1309C8.29538 28.9668 8.51794 28.8746 8.75 28.8746H33.25C33.4821 28.8746 33.7046 28.9668 33.8687 29.1309C34.0328 29.2949 34.125 29.5175 34.125 29.7496ZM8.78281 17.738C8.73077 17.5545 8.74011 17.359 8.80941 17.1813C8.87872 17.0036 9.00418 16.8534 9.16672 16.7536L20.5417 9.75364C20.6796 9.66889 20.8382 9.62402 21 9.62402C21.1618 9.62402 21.3204 9.66889 21.4583 9.75364L32.8333 16.7536C32.9959 16.8533 33.1214 17.0034 33.1909 17.181C33.2603 17.3587 33.2698 17.5541 33.2179 17.7376C33.166 17.9211 33.0556 18.0827 32.9034 18.1977C32.7513 18.3126 32.5657 18.3748 32.375 18.3746H29.75V25.3746H31.5C31.7321 25.3746 31.9546 25.4668 32.1187 25.6309C32.2828 25.7949 32.375 26.0175 32.375 26.2496C32.375 26.4816 32.2828 26.7042 32.1187 26.8683C31.9546 27.0324 31.7321 27.1246 31.5 27.1246H10.5C10.2679 27.1246 10.0454 27.0324 9.88128 26.8683C9.71719 26.7042 9.625 26.4816 9.625 26.2496C9.625 26.0175 9.71719 25.7949 9.88128 25.6309C10.0454 25.4668 10.2679 25.3746 10.5 25.3746H12.25V18.3746H9.625C9.43446 18.3746 9.2491 18.3125 9.09709 18.1976C8.94508 18.0827 8.83474 17.9213 8.78281 17.738ZM22.75 24.4996C22.75 24.7316 22.8422 24.9542 23.0063 25.1183C23.1704 25.2824 23.3929 25.3746 23.625 25.3746C23.8571 25.3746 24.0796 25.2824 24.2437 25.1183C24.4078 24.9542 24.5 24.7316 24.5 24.4996V19.2496C24.5 19.0175 24.4078 18.7949 24.2437 18.6309C24.0796 18.4668 23.8571 18.3746 23.625 18.3746C23.3929 18.3746 23.1704 18.4668 23.0063 18.6309C22.8422 18.7949 22.75 19.0175 22.75 19.2496V24.4996ZM17.5 24.4996C17.5 24.7316 17.5922 24.9542 17.7563 25.1183C17.9204 25.2824 18.1429 25.3746 18.375 25.3746C18.6071 25.3746 18.8296 25.2824 18.9937 25.1183C19.1578 24.9542 19.25 24.7316 19.25 24.4996V19.2496C19.25 19.0175 19.1578 18.7949 18.9937 18.6309C18.8296 18.4668 18.6071 18.3746 18.375 18.3746C18.1429 18.3746 17.9204 18.4668 17.7563 18.6309C17.5922 18.7949 17.5 19.0175 17.5 19.2496V24.4996Z"
                    fill="#7431B8"
                  />
                </svg>
                <div className="">
                  <p>{bank?.bank_name}</p>
                  <p className="text-[#706D73] text-sm">
                    {maskNumber(bank?.account_number)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="my-6 ">
            <label
              className="text-sm mb-2 text-gray-800 flex justify-between"
              htmlFor="organizerName"
            >
              <p>
                Amount <span className="text-red-500">*</span>
              </p>
            </label>
            <input
              type="text"
              onChange={(e) => setAmount(Number(e.target.value))}
              className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            />
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
            isComplete={!!accountNumber && !!amount}
            onClickHandler={handleVerify}
            title="Withdraw now"
            styles={{ width: "160px", height: "41px" }}
          />
        </footer>
      </div>
    </>
  );
};

export default PayoutModal;
