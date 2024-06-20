import {
  SolidButton,
  TransparentButton,
} from "@/app/components/buttons/button";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { CiCircleAlert } from "react-icons/ci";
//@ts-ignore
import Dojah from "react-dojah";
import { useRouter } from "next/navigation";

type Iprops = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenNextModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const RequestPayoutModal = ({ setIsModalOpen, setOpenNextModal }: Iprops) => {
  const { data: session } = useSession();
  const [openDojah, setOpenDojah] = useState(false);

  const router = useRouter();

  const handleVerify = () => {
    setOpenDojah(true);
  };

  const appID = process.env.NEXT_PUBLIC_DOJAH_APP_ID;
  const publicKey = process.env.NEXT_PUBLIC_DOJAH_PUBLIC_KEY;
  const type = "custom";

  const config = {
    widget_id: process.env.NEXT_PUBLIC_DOJAH_WIDGET_ID,
    webhook: true,
  };

  const userData = {
    //@ts-ignore
    first_name: `${session?.user?.user?.first_name}`,
    //@ts-ignore
    last_name: `${session?.user?.user?.last_name}`,
    residence_country: "NG",
    //@ts-ignore
    email: `${session?.user?.user?.email}`,
    //@ts-ignore
    account_id: `${session?.user?.user?.id}`,
  };

  const metadata = {
    //@ts-ignore
    user_id: `${session?.user?.user?.id}`,
  };

  const response = (type: any, data: any) => {
    console.log(type, data);
    if (type === "success") {
      console.log("boom baby!");
    } else if (type === "close") {
      window.location.reload();
    }
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(false)}
        className="bg-black bg-opacity-50 backdrop-blur-sm fixed z-20  top-0 left-0 right-0 bottom-0"
        aria-label="backdrop"
      />
      <div>
        {openDojah ? (
          <Dojah
            response={response}
            appID={appID}
            publicKey={publicKey}
            type={type}
            config={config}
            userData={userData}
            metadata={metadata}
          />
        ) : null}
      </div>

      <div className="w-[96%] md:w-[760px] h-auto rounded-md bg-white z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="py-4 px-6 border-b">
          <p className="text-xl font-medium">Request Payout</p>
        </div>

        <div className="mt-4 w-[100%] md:w-[60%] mx-auto mb-28 flex flex-col gap-5 justify-center items-center">
          <div className="h-20 w-20 bg-lightPurple rounded-[100%]"></div>
          <p className="text-xl font-medium">Verify your ID</p>
          <p className="text-center text-sm">
            Ensure your registered name is the the same as the name on your{" "}
            <span className="font-bold">bank details</span> if you&apos;re
            requesting payout as an individual. This can&apos;t be changed but
            you can edit it on your profile before you verify.
          </p>

          <input
            type="text"
            //@ts-ignore
            value={`${session?.user?.user?.first_name} ${session?.user?.user?.last_name}`}
            readOnly
            className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
          />

          <div className="flex gap-2 items-center text-sm text-gray-700">
            <CiCircleAlert />{" "}
            <p>Name can&apos;t be changed again once verified</p>
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
            onClickHandler={handleVerify}
            title="Verify"
            styles={{ width: "160px", height: "41px" }}
          />
        </footer>
      </div>
    </>
  );
};

export default RequestPayoutModal;
