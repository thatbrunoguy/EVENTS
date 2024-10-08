import React from "react";
import { MdCalendarToday, MdClose } from "react-icons/md";

type Iprops = {
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  content?: string;
  deleteTicket?: any;
};

const ConfirmDeleteModal = ({
  setIsDeleteModalOpen,
  deleteTicket = () => {},
  title = "Are you sure want to delete this event type",
  content = "By deleting this event, you will lose all the data or information and this action cant be undone",
}: Iprops) => {
  return (
    <>
      <div
        onClick={() => setIsDeleteModalOpen(false)}
        className="bg-black bg-opacity-50 fixed top-0 left-0 right-0 bottom-0"
        aria-label="backdrop"
      />
      <div className=" w-[95%] z-50 mx-auto md:w-[430px] h-[320px] md:h-[292px] rounded-md bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center justify-between p-6">
          <div className="h-12 w-12 text-[#CC0000] bg-[#FCEDED] text-2xl rounded-full grid place-content-center ">
            <MdCalendarToday />
          </div>
          <div
            onClick={() => setIsDeleteModalOpen(false)}
            className="text-2xl text-gray-700 cursor-pointer transition-all duration-300 ease-in-out h-11 w-11 grid place-content-center rounded-full hover:bg-gray-100"
          >
            <MdClose />
          </div>
        </div>
        <div className="px-6 ">
          <h4 className="font-semibold text-lg">{title}</h4>
          <p className="text-lightText font-normal text-base pt-4">{content}</p>
        </div>

        <footer className="flex absolute bottom-0 left-0 right-0 items-center justify-between space-x-3 px-6 py-3 border-t border-t-gray-200">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="h-9 basis-1/2 md:w-[179px] transition-all duration-300 ease-in-out hover:bg-red-100 text-sm shadow-sm bg-white border border-gray-200 rounded-md flex items-center justify-center"
          >
            <p>Cancel</p>
          </button>
          <button
            onClick={() => {
              deleteTicket();
              setIsDeleteModalOpen(false);
            }}
            className="h-9 basis-1/2 md:w-[179px] text-sm hover:bg-opacity-50 text-white  bg-[#CC0000] shadow-sm rounded-md flex items-center justify-center"
          >
            <p>Yes, delete</p>
          </button>
        </footer>
      </div>
    </>
  );
};

export default ConfirmDeleteModal;
