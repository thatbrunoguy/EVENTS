import Image from "next/image";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
type Iprops = {
  setIsGuestlistModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const GuestlistModal = ({ setIsGuestlistModalOpen }: Iprops) => {
  const item = {
    title: " Eko convections centre",
    desc: "Lekki paradise estate 3, chevron drive",
    date: "Saturday, October 22, 2023 | 7:30pm",
  };
  return (
    <>
      <div
        onClick={() => setIsGuestlistModalOpen(false)}
        className="bg-black bg-opacity-50 backdrop-blur-[2.5px] fixed top-0  left-0 right-0 bottom-0"
        aria-label="backdrop"
      />

      <div className="w-[482px] h-[95%] rounded-2xl bg-white z-50 fixed top-1/2 transform right-6 -translate-y-1/2">
        <header className="py-5 px-10 flex items-center justify-between  border-b">
          <h4 className="font-semibold text-xl ">Order #T2LQR0JAYZ</h4>
          <div
            onClick={() => setIsGuestlistModalOpen(false)}
            className="w-9 h-9 rounded-full grid place-content-center cursor-pointer bg-[#FBFAFC] hover:bg-gray-200"
          >
            <AiOutlineClose />
          </div>
        </header>

        <section className=" w-full px-8 mt-6">
          <div className="flex items-center space-x-5 p-3 pb-6 border-b">
            <div className="h-[72px] w-[72px] relative rounded overflow-hidden">
              <Image
                fill
                src="/assets/event.jpeg"
                alt={item.title}
                objectFit="cover"
              />
            </div>
            <div>
              <h4 className="font-semibold mb-1">{item.title}</h4>
              <p className="text-lightText">{item.desc}</p>
              <p className="text-lightText">{item.date}</p>
            </div>
          </div>
          {/* --------------------------- */}
          <div className="mt-6">
            <div>
              <p className="text-lightText text-xs">Buyer name</p>
              <p>Emmauel Adeseye Adediran</p>
            </div>

            <div className="flex items-center justify-between gap-10 my-5">
              <div className="basis-1/2">
                <p className="text-lightText text-xs">Ticket name</p>
                <p>Diamond Pass</p>
              </div>
              <div className="basis-1/2">
                <p className="text-lightText text-xs">Ticket name</p>
                <p>+2349019089009</p>
              </div>
            </div>

            {/* ------------------------------------- */}
            <div className="flex items-center justify-between gap-10  my-5">
              <div className="basis-1/2 w-[45%] break-words">
                <p className="text-lightText text-xs">Email</p>
                <p>hammedmustapha1245@gmail.com</p>
              </div>
              <div className="basis-1/2">
                <p className="text-lightText text-xs">Order quantity</p>
                <p>3</p>
              </div>
            </div>

            {/* ------------------------------------- */}
            <div className="flex items-center justify-between gap-10  my-5">
              <div className="basis-1/2">
                <p className="text-lightText text-xs">Amount</p>
                <p>₦9,300.00</p>
              </div>
              <div className="basis-1/2">
                <p className="text-lightText text-xs">Eventparrot Fees</p>
                <p>₦1,700.00</p>
              </div>
            </div>

            {/* ------------------------------------- */}
            <div className="flex items-center justify-between gap-10  my-5">
              <div className="basis-1/2">
                <p className="text-lightText text-xs">Order number</p>
                <p>#T2LQR0JAYZ</p>
              </div>
              <div className="basis-1/2">
                <p className="text-lightText text-xs">Order date</p>
                <p>11 November 2023</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GuestlistModal;
