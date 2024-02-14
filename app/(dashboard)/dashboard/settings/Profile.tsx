"use client";

import React, { useState } from "react";
import ReactSelectOptions from "../../../components/select/ReactSelect";
import FileUpload from "../../../components/fileUpload/FileUpload";
import { RiDeleteBin6Fill } from "react-icons/ri";

const OrganizationProfile = () => {
  const [eventPhoto, setEventPhoto] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState({});

  const thumbs = eventPhoto.map((file: any) => (
    <div key={file.name}>
      <div>
        <img
          src={file.preview}
          className="w-full h-full object-cover"
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  return (
    <div>
      <div className="my-9">
        {/* UPLOAD */}

        {eventPhoto.length === 0 && (
          <div className="w-full md:w-[270px] relative flex items-center justify-center h-[177px] border border-dashed rounded-lg border-gray-600">
            <FileUpload setEventPhoto={setEventPhoto} />
          </div>
        )}
        {eventPhoto.length > 0 && (
          <div className="w-full md:w-[270px] relative overflow-hidden flex items-center justify-center h-[177px] border rounded-lg border-primaryPurple hover:bg-lightPurple">
            <div
              onClick={() => setEventPhoto([])}
              className="w-[72px] h-[72px] cursor-pointer text-3xl transition-all duration-300 ease-in-out hover:text-red-500 hover:bg-red-100 rounded-full bg-white grid place-content-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <RiDeleteBin6Fill onClick={() => setEventPhoto([])} />
            </div>
            <div className="w-full h-full">{thumbs}</div>
          </div>
        )}
      </div>

      <div className="w-full md:w-[50%]">
        <div className="my-6">
          <label
            className="text-sm mb-2 block text-gray-800"
            htmlFor="organizerName"
          >
            Organization name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Christian Peters"
            className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
          />
        </div>
        <div className="my-6">
          <label
            className="text-sm mb-2 block text-gray-800"
            htmlFor="organizerName"
          >
            Country <span className="text-red-500">*</span>
          </label>

          <ReactSelectOptions
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            options={[{ value: "ng", label: "Nigeria" }]}
          />
        </div>
        <div className="my-6">
          <label
            className="text-sm mb-2 block text-gray-800"
            htmlFor="organizerName"
          >
            Website <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="https://www/eventsparrot.com"
            className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
          />
        </div>
      </div>
    </div>
  );
};

export default OrganizationProfile;
