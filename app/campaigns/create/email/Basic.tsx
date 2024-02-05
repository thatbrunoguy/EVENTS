"use client";

import ReactQuillEditor from "@/app/components/Reactquill";
import ReactSelectOptions from "@/app/components/select/ReactSelect";
import { FaFacebookF, FaLinkedin } from "react-icons/fa6";
import { FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
import React, { useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import FileUpload from "@/app/components/fileUpload/FileUpload";

const CreateEmailCampaignBasic = () => {
  const [eventPhoto, setEventPhoto] = useState<any>([]);

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
    <div className="w-full h-full flex">
      <div className="mt-9 w-full">
        <h2 className="text-[24px] font-semibold mb-9">Campaign Information</h2>
        <div>
          <label className="text-sm text-gray-800" htmlFor="organizerName">
            Campaign name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Quick description of your Event name"
            className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
          />
        </div>
        <div className="my-6">
          <label className="text-sm  text-gray-800" htmlFor="organizerName">
            From <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g Organiser's name"
            className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
          />
        </div>
        <div>
          <label className="text-sm text-gray-800" htmlFor="organizerName">
            Reply-to email address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g adegbulugbeisrael@gmail.com"
            className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
          />
        </div>

        {/* ------- */}

        <div className="mt-9">
          <h2 className="text-[24px] font-semibold">Footer</h2>
          <p className="text-gray-500 w-[90%] mt-2 mb-9">
            Avoid the spam folder and ensure your email reaches recipient
            inboxes by completing this crucial section.
          </p>
          <div>
            <label className="text-sm text-gray-800" htmlFor="organizerName">
              Organizer&apos;s name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Quick description of your Event name"
              className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            />
          </div>
          <div className="my-6">
            <label
              className="text-sm mb-2 block text-gray-800"
              htmlFor="organizerName"
            >
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Select category"
              className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            />
          </div>
          <div className="my-6">
            <label
              className="text-sm mb-2 block text-gray-800"
              htmlFor="organizerName"
            >
              City <span className="text-red-500">*</span>
            </label>

            <ReactSelectOptions options={[]} />
          </div>

          <div className="flex items-center space-x-6 ">
            <div className="basis-1/2">
              <label
                className="text-sm text-gray-800 block mb-2"
                htmlFor="organizerName"
              >
                State <span className="text-red-500">*</span>
              </label>
              <ReactSelectOptions options={[]} />
            </div>
            <div className="basis-1/2">
              <label
                className="text-sm text-gray-800 block mb-2"
                htmlFor="organizerName"
              >
                Postal Code <span className="text-red-500">*</span>
              </label>
              <ReactSelectOptions options={[]} />
            </div>
          </div>
          {/* SOCIALS */}
          {/* FACEBOOK */}
          <div className="my-6">
            <label
              className="text-sm mb-2 block text-gray-800"
              htmlFor="organizerName"
            >
              Facebook Link <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center h-[56px] text-sm w-full text-gray-600 px-3 mt-2  bg-[#F8F8F8] rounded-lg focus-within:border-[2px] focus-within:border-purple-600">
              <label className="p-3 block text-gray-600" htmlFor="facebook">
                <FaFacebookF />
              </label>
              <input
                id="facebook"
                type="text"
                placeholder="Select category"
                className="w-full h-full outline-none border-none bg-transparent"
              />
            </div>
          </div>

          {/* INSTAGRAM */}

          <div className="my-6">
            <label
              className="text-sm mb-2 block text-gray-800"
              htmlFor="organizerName"
            >
              Instagram Link <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center h-[56px] text-sm w-full text-gray-600 px-3 mt-2  bg-[#F8F8F8] rounded-lg focus-within:border-[2px] focus-within:border-purple-600">
              <label className="p-3 block" htmlFor="facebook">
                <FaInstagram />
              </label>
              <input
                id="facebook"
                type="text"
                placeholder="Select category"
                className="w-full h-full outline-none border-none bg-transparent"
              />
            </div>
          </div>
          {/* X */}

          <div className="my-6">
            <label
              className="text-sm mb-2 block text-gray-800"
              htmlFor="organizerName"
            >
              X Link <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center h-[56px] text-sm w-full text-gray-600 px-3 mt-2  bg-[#F8F8F8] rounded-lg focus-within:border-[2px] focus-within:border-purple-600">
              <label className="p-3 block text-gray-600" htmlFor="facebook">
                <FaTwitter />
              </label>
              <input
                id="facebook"
                type="text"
                placeholder="Select category"
                className="w-full h-full outline-none border-none bg-transparent"
              />
            </div>
          </div>

          {/* LINKEDIN */}

          <div className="my-6">
            <label
              className="text-sm mb-2 block text-gray-800"
              htmlFor="organizerName"
            >
              LinkedIn Link <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center h-[56px] text-sm w-full text-gray-600 px-3 mt-2  bg-[#F8F8F8] rounded-lg focus-within:border-[2px] focus-within:border-purple-600">
              <label className="p-3 block text-gray-600" htmlFor="facebook">
                <FaLinkedin />
              </label>
              <input
                id="facebook"
                type="text"
                placeholder="Select category"
                className="w-full h-full outline-none border-none bg-transparent"
              />
            </div>
          </div>

          {/* TIKTOK */}

          <div className="my-6">
            <label
              className="text-sm mb-2 block text-gray-800"
              htmlFor="organizerName"
            >
              Tiktok Link <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center h-[56px] text-sm w-full text-gray-600 px-3 mt-2  bg-[#F8F8F8] rounded-lg focus-within:border-[2px] focus-within:border-purple-600">
              <label className="p-3 block text-gray-600" htmlFor="facebook">
                <FaTiktok />
              </label>
              <input
                id="facebook"
                type="text"
                placeholder="Select category"
                className="w-full h-full outline-none border-none bg-transparent"
              />
            </div>
          </div>

          {/* YOUTUBE */}

          <div className="my-6">
            <label
              className="text-sm mb-2 block text-gray-800"
              htmlFor="organizerName"
            >
              Youtube Link <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center h-[56px] text-sm w-full text-gray-600 px-3 mt-2  bg-[#F8F8F8] rounded-lg focus-within:border-[2px] focus-within:border-purple-600">
              <label className="p-3 block text-gray-600" htmlFor="facebook">
                <FaYoutube />
              </label>
              <input
                id="facebook"
                type="text"
                placeholder="Select category"
                className="w-full h-full outline-none border-none bg-transparent"
              />
            </div>
          </div>

          {/* UPLOAD */}

          {eventPhoto.length === 0 && (
            <div className="w-full relative flex items-center justify-center h-[248px] border border-dashed rounded-lg border-gray-600">
              <FileUpload setEventPhoto={setEventPhoto} />
            </div>
          )}
          {eventPhoto.length > 0 && (
            <div className="w-full relative overflow-hidden flex items-center justify-center h-[248px] border rounded-lg border-primaryPurple hover:bg-lightPurple">
              <div
                onClick={() => setEventPhoto([])}
                className="w-[72px] h-[72px] cursor-pointer text-3xl transition-all duration-300 ease-in-out hover:text-red-500 hover:bg-red-100 rounded-full bg-white grid place-content-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <RiDeleteBin6Fill onClick={() => setEventPhoto([])} />
              </div>
              <div className="w-full">{thumbs}</div>
            </div>
          )}

          <p className="text-xs text-lightText mt-2">
            The logo appears above the content. We recommend using at least a
            150x75px (2:1 ratio) image that is no longer than 1mb
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateEmailCampaignBasic;
