import Image from "next/image";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

type Iprops = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOrder?: any;
  selectedEvent?: any;
};

const PreviewModal = ({
  setIsModalOpen,
  selectedOrder,
  selectedEvent,
}: Iprops) => {
  return (
    <>
      <div
        onClick={() => setIsModalOpen(false)}
        className="bg-black bg-opacity-50 backdrop-blur-[2.5px] fixed top-0  left-0 right-0 bottom-0"
        aria-label="backdrop"
      />

      <div className=" w-[98%] md:w-[482px] h-[95%] rounded-2xl bg-white z-50 fixed top-1/2 right-1/2 translate-x-1/2 md:translate-x-0 transform md:right-6 -translate-y-1/2">
        <header className="py-5 px-10 flex items-center justify-between  border-b">
          <h4 className="font-semibold text-xl ">
            Order #{selectedOrder?.orderNumber}
          </h4>
          <div
            onClick={() => setIsModalOpen(false)}
            className="w-9 h-9 rounded-full grid place-content-center cursor-pointer bg-[#FBFAFC] hover:bg-gray-200"
          >
            <AiOutlineClose />
          </div>
        </header>

        <section className=" w-full px-8 mt-6">
          <div className="flex items-center space-x-5 p-3 pb-6 border-b">
            <div className="h-[72px] w-[72px] relative rounded overflow-hidden">
              {selectedEvent?.img && (
                <Image
                  fill
                  src={selectedEvent?.img}
                  alt={selectedEvent?.name}
                  objectFit="cover"
                />
              )}
            </div>
            <div>
              <h4 className="font-semibold mb-1">{selectedEvent?.name}</h4>
              <p className="text-lightText">
                {selectedEvent?.address || "Online"}
              </p>
              <p className="text-lightText">{selectedEvent?.startDate}</p>
            </div>
          </div>
          {/* --------------------------- */}
          <div className="mt-6">
            <div>
              <p className="text-lightText text-xs">Start date</p>
              <p>{selectedOrder?.buyerName}</p>
            </div>
            <div className="flex items-center justify-between gap-10 my-5">
              <div className="basis-1/2">
                <p className="text-lightText text-xs">End date</p>
                <p>{selectedOrder?.name}</p>
              </div>
              {/* <div className="basis-1/2">
                <p className="text-lightText text-xs">Ticket name</p>
                <p>{selectedOrder?.name}</p>
              </div> */}
            </div>
            {/* ------------------------------------- */}
            <div className="flex items-center justify-between gap-10  my-5">
              <div className="basis-1/2 w-[45%] break-words">
                <p className="text-lightText text-xs">Target country</p>
                <p>{selectedOrder?.email}</p>
              </div>
              <div className="basis-1/2">
                <p className="text-lightText text-xs">Target city</p>
                <p>{selectedOrder?.quantity}</p>
              </div>
            </div>
            {/* ------------------------------------- */}
            <div className="flex items-center justify-between gap-10  my-5">
              <div className="basis-1/2">
                <p className="text-lightText text-xs">Token</p>
                <p>{selectedOrder?.amount}</p>
              </div>
              <div className="basis-1/2">
                <p className="text-lightText text-xs">Eventparrot Fees</p>
                <p>{selectedOrder?.fees}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PreviewModal;
