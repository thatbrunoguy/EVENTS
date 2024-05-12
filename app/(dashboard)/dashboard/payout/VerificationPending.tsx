import {
  SolidButton,
  TransparentButton,
} from "@/app/components/buttons/button";
import { useRouter } from "next/navigation";
import React from "react";
import { CiCircleAlert } from "react-icons/ci";
import { LiaHourglassStartSolid } from "react-icons/lia";

type Iprops = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const VerificationPending = ({ setIsModalOpen }: Iprops) => {
  const router = useRouter();
  const handleContactUs = () => {
    router.push("/contact");
  };

  const handleDone = () => {
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
          <p className="text-xl font-medium">Verification</p>
        </div>

        <div className="w-[100%] md:w-[60%] mx-auto mb-28 flex flex-col gap-5 justify-center items-center">
          <div className="h-20 w-20 bg-lightOrange rounded-[100%] flex items-center justify-center">
            <LiaHourglassStartSolid color="#FF5602" width="60%" />
          </div>
          <p className="text-xl font-medium">Verify your ID</p>
          <p className="text-center text-sm">
            Ensure your registered name is the the same as the name on your{" "}
            <span className="font-bold">bank details</span> if you&apos;re
            requesting payout as an individual. This can&apos;t be changed but
            you can edit it on your profile before you verify.
          </p>

          <div className="flex gap-2 items-center text-sm text-gray-700">
            <CiCircleAlert />{" "}
            <p>
              If there is an issue with your bank details,{" "}
              <span
                className="cursor-pointer text-primaryPurple"
                onClick={handleContactUs}
              >
                contact us here
              </span>
            </p>
          </div>
        </div>

        <footer className="h-[70px] fixed bottom-0 left-0 bg-white shadow-lg right-0 px-2 md:pr-9 flex justify-center md:justify-end space-x-6 items-center border-t-[.8px] border-gray-300">
          <SolidButton
            onClickHandler={handleDone}
            title="Done"
            styles={{ width: "160px", height: "41px" }}
          />
        </footer>
      </div>
    </>
  );
};

export default VerificationPending;
