import Image from "next/image";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaLocationDot, FaRegCalendar } from "react-icons/fa6";

type Iprops = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOrder?: any;
  selectedEvent?: any;
};

const PreviewModal = ({ setIsModalOpen, selectedOrder }: Iprops) => {
  console.log("selectedOrder", selectedOrder);
  return (
    <>
      <div
        onClick={() => setIsModalOpen(false)}
        className="bg-black bg-opacity-50 backdrop-blur-[2.5px] fixed top-0  left-0 right-0 bottom-0"
        aria-label="backdrop"
      />

      <div className=" w-[98%] md:w-[482px] h-[95%] rounded-2xl bg-white z-50 fixed top-1/2 right-1/2 translate-x-1/2 md:translate-x-0 transform md:right-6 -translate-y-1/2">
        <header className="py-5 px-10 flex items-center justify-between  border-b">
          <h4 className="font-semibold text-xl ">Payout details</h4>
          <div
            onClick={() => setIsModalOpen(false)}
            className="w-9 h-9 rounded-full grid place-content-center cursor-pointer bg-[#FBFAFC] hover:bg-gray-200"
          >
            <AiOutlineClose />
          </div>
        </header>

        <section className=" w-full px-8 mt-6">
          <div className="flex items-center space-x-5 p-3 pb-6 border-b">
            <div className="h-[102px] w-[146px] relative rounded overflow-hidden">
              {selectedOrder?.image && (
                <Image
                  fill
                  src={selectedOrder?.image}
                  alt={selectedOrder?.userName}
                  objectFit="cover"
                />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold mb-1 text-ellipsis">
                {selectedOrder?.userName}
              </h4>
              <p className="text-lightText flex gap-2 items-center">
                {selectedOrder?.email}
              </p>
            </div>
          </div>
          {/* --------------------------- */}
          <div className="mt-6 flex gap-10">
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-lightText text-xs">Account name</p>
                <p className="whitespace-nowrap">
                  {selectedOrder?.accountName}
                </p>
              </div>
              <div className="basis-1/2 w-[45%] whitespace-nowrap">
                <p className="text-lightText text-xs">Account number</p>
                <p>{selectedOrder?.accountNumber}</p>
              </div>
              <div className="basis-1/2">
                <p className="text-lightText text-xs">Bank name</p>
                <p>{selectedOrder?.bankName}</p>
              </div>
              <div className="basis-1/2">
                <p className="text-lightText text-xs">Amount requested</p>
                <p>₦{selectedOrder?.amountRequested}</p>
              </div>
            </div>
            {/* ------------------------------------- */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between gap-10 ">
                <div className="basis-1/2">
                  <p className="text-lightText text-xs">Requester name</p>
                  <p className="whitespace-nowrap">
                    {selectedOrder?.requesterName}
                  </p>
                </div>
              </div>

              <div className="basis-1/2">
                <p className="text-lightText text-xs">Requester email</p>
                <p>{selectedOrder?.requesterEmail}</p>
              </div>
            </div>
            {/* ------------------------------------- */}
          </div>
        </section>
      </div>
    </>
  );
};

export default PreviewModal;
