"use client";

import ReactQuillEditor from "@/app/components/Reactquill";
import ReactSelectOptions from "@/app/components/select/ReactSelect";
import { FaFacebookF, FaLinkedin } from "react-icons/fa6";
import { FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import FileUpload from "@/app/components/fileUpload/FileUpload";
import { EmailAdContext } from "./EmailAdsContext";
import { uploadImageFunctions } from "@/app/utils/endpoints";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { extractUrlBeforeQueryString, uploadImage } from "@/app/helpers";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import Image from "next/image";
import { IoChevronDown } from "react-icons/io5";
import { FadeLoader } from "react-spinners";

const CreateEmailCampaignBasic = () => {
  const [eventPhoto, setEventPhoto] = useState<any>([]);
  const [isImageUploadEnabled, setImageUploadEnabled] = useState(false);
  const [isLoadingBanner, setIsLoadingBanner] = useState(false);
  const {
    data,
    setData,
    mailContent,
    setMailContent,
    selectedEvent,
    setSelectedEvent,
    events,
  } = useContext(EmailAdContext);

  const { data: imageUrl, status } = useQuery({
    queryKey: ["event-banner"],
    queryFn: () => uploadImageFunctions.getInitialURL(eventPhoto[0].name),
    enabled: isImageUploadEnabled,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (imageUrl?.url && status === "success" && !mailContent.media.length) {
      const imageUploadFinalHandler = async () => {
        setIsLoadingBanner(true);
        try {
          const res = await uploadImage(imageUrl.url, eventPhoto[0]);
          setImageUploadEnabled(false);
          toast.success("Ad banner uploaded successfully!!!");
          setMailContent((prev: any) => ({
            ...prev,
            media: [extractUrlBeforeQueryString(imageUrl.url as string)],
          }));
        } catch {
          toast.error("Something went wrong!!!");
        } finally {
          setIsLoadingBanner(false);
        }
      };
      imageUploadFinalHandler();
    }
  }, [isImageUploadEnabled, status]);

  const thumbs = eventPhoto?.map((file: any, index: number) => (
    <div key={index}>
      <div>
        <img
          src={file.preview}
          className="w-full h-[248px] object-cover"
          // Revoke data uri after image is loaded
          onLoad={() => {
            setImageUploadEnabled(true);
            URL.revokeObjectURL(file.preview);
          }}
          alt=""
        />
      </div>
    </div>
  ));

  return (
    <div className="w-full h-full flex">
      <div className="mt-9 w-full">
        <h2 className="text-[24px] font-semibold mb-9">Campaign Information</h2>
        <div className="mt-9 border-[0.5px] p-2 md:p-5 rounded-md mb-9">
          <h3 className="">
            Send mail to attendees of: <span className="text-red-500">*</span>
          </h3>
          <Menu
            className="w-full"
            direction="bottom"
            // arrow
            align="start"
            menuButton={
              <MenuButton style={{ background: "transparent" }}>
                <div className="border px-3 py-3 flex items-center mt-6 md:h-[104px] justify-between shadow-lg rounded-lg w-full md:w-full bg-white">
                  <div className="flex items-center space-x-5 p-3 ">
                    <div className="h-[72px] w-[72px] relative rounded overflow-hidden">
                      <Image
                        fill
                        src={selectedEvent?.img ?? ""}
                        alt={selectedEvent?.name ?? "img"}
                        objectFit="cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">
                        {selectedEvent?.name}
                      </h4>
                      <p className="text-lightText">{selectedEvent?.desc}</p>
                      <p className="text-lightText">
                        {selectedEvent?.startDate}
                      </p>
                    </div>
                  </div>
                  <div className="text-xl">
                    <IoChevronDown />
                  </div>
                </div>
              </MenuButton>
            }
            transition
          >
            <div className="shadow-xl mt-6  bg-white">
              {events?.map((item: any, index: number) => (
                <MenuItem
                  className="hover:bg-gray-100 hover:border-b cursor-pointer"
                  key={index}
                  onClick={() => setSelectedEvent(item)}
                >
                  <div className="flex items-center w-full md:w-full space-x-3 md:space-x-5 md:p-3 ">
                    <div className="h-[42px] md:h-[72px] w-[42px] md:w-[72px] relative rounded overflow-hidden">
                      <Image
                        fill
                        src={item.img}
                        alt={item.name}
                        objectFit="cover"
                      />
                    </div>
                    <div className="w-full">
                      <h4 className="font-semibold mb-1">{item.name}</h4>
                      <p className="text-lightText">{item.desc}</p>
                      <p className="text-lightText">{item.startDate}</p>
                    </div>
                  </div>
                </MenuItem>
              ))}
            </div>
          </Menu>
        </div>

        <div>
          <label className="text-sm text-gray-800" htmlFor="name">
            Campaign name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Quick description of your Event name"
            className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            value={data.name}
            onChange={(e) =>
              //@ts-ignore
              setData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className="my-6">
          <label className="text-sm  text-gray-800" htmlFor="organizerName">
            From <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="e.g johndoe@gmail.com"
            value={data.from_email}
            className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            onChange={(e) =>
              //@ts-ignore
              setData((prev) => ({ ...prev, from_email: e.target.value }))
            }
          />
        </div>
        <div>
          <label className="text-sm text-gray-800" htmlFor="organizerName">
            Reply-to email address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="e.g adegbulugbeisrael@gmail.com"
            className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            value={data.reply_to_email}
            onChange={(e) =>
              //@ts-ignore
              setData((prev) => ({ ...prev, reply_to_email: e.target.value }))
            }
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
              onChange={(e) =>
                //@ts-ignore
                setMailContent((prev) => ({
                  ...prev,
                  organizersName: e.target.value,
                }))
              }
            />
          </div>
          <div className="my-6">
            <label
              className="text-sm mb-2 block text-gray-800"
              htmlFor="organizerName"
            >
              Street <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Select category"
              className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
              onChange={(e) =>
                //@ts-ignore
                setMailContent((prev) => ({ ...prev, street: e.target.value }))
              }
            />
          </div>
          <div className="my-6">
            <label className="text-sm mb-2 block text-gray-800" htmlFor="city">
              City <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
              onChange={(e) =>
                //@ts-ignore
                setMailContent((prev) => ({ ...prev, city: e.target.value }))
              }
            />
          </div>

          <div className="flex items-center space-x-6 ">
            <div className="basis-1/2">
              <label
                className="text-sm text-gray-800 block mb-2"
                htmlFor="state"
              >
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
                onChange={(e) =>
                  //@ts-ignore
                  setMailContent((prev) => ({ ...prev, state: e.target.value }))
                }
              />
            </div>
            <div className="basis-1/2">
              <label
                className="text-sm text-gray-800 block mb-2"
                htmlFor="organizerName"
              >
                Postal Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
                onChange={(e) =>
                  //@ts-ignore
                  setMailContent((prev) => ({
                    ...prev,
                    postalCode: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="my-6">
            <label
              className="text-sm mb-2 block text-gray-800"
              htmlFor="organizerName"
            >
              Country <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Select category"
              className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
              onChange={(e) =>
                //@ts-ignore
                setMailContent((prev) => ({ ...prev, country: e.target.value }))
              }
            />
          </div>
          {/* SOCIALS */}
          {/* FACEBOOK */}
          <div className="my-6">
            <label
              className="text-sm mb-2 block text-gray-800"
              htmlFor="organizerName"
            >
              Facebook Link
              {/* <span className="text-red-500">*</span> */}
            </label>
            <div className="flex items-center h-[56px] text-sm w-full text-gray-600 px-3 mt-2  bg-[#F8F8F8] rounded-lg focus-within:border-[2px] focus-within:border-purple-600">
              <label className="p-3 block text-gray-600" htmlFor="facebook">
                <FaFacebookF />
              </label>
              <input
                id="facebook"
                type="text"
                placeholder="e.g https://www.facebook.com/user"
                className="w-full h-full outline-none border-none bg-transparent"
                onChange={(e) =>
                  //@ts-ignore
                  setMailContent((prev) => ({
                    ...prev,
                    facebookLink: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          {/* INSTAGRAM */}

          <div className="my-6">
            <label
              className="text-sm mb-2 block text-gray-800"
              htmlFor="organizerName"
            >
              Instagram Link
              {/* <span className="text-red-500">*</span> */}
            </label>
            <div className="flex items-center h-[56px] text-sm w-full text-gray-600 px-3 mt-2  bg-[#F8F8F8] rounded-lg focus-within:border-[2px] focus-within:border-purple-600">
              <label className="p-3 block" htmlFor="facebook">
                <FaInstagram />
              </label>
              <input
                id="instagram"
                type="text"
                placeholder="e.g https://www.instagram.com/user"
                className="w-full h-full outline-none border-none bg-transparent"
                onChange={(e) =>
                  //@ts-ignore
                  setMailContent((prev) => ({
                    ...prev,
                    instagramLink: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          {/* X */}

          <div className="my-6">
            <label
              className="text-sm mb-2 block text-gray-800"
              htmlFor="organizerName"
            >
              X Link
              {/* <span className="text-red-500">*</span> */}
            </label>
            <div className="flex items-center h-[56px] text-sm w-full text-gray-600 px-3 mt-2  bg-[#F8F8F8] rounded-lg focus-within:border-[2px] focus-within:border-purple-600">
              <label className="p-3 block text-gray-600" htmlFor="facebook">
                <FaTwitter />
              </label>
              <input
                id="twitter"
                type="text"
                placeholder="e.g https://twitter.com/user"
                className="w-full h-full outline-none border-none bg-transparent"
                onChange={(e) =>
                  //@ts-ignore
                  setMailContent((prev) => ({
                    ...prev,
                    xLink: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          {/* LINKEDIN */}

          <div className="my-6">
            <label
              className="text-sm mb-2 block text-gray-800"
              htmlFor="organizerName"
            >
              LinkedIn Link
              {/* <span className="text-red-500">*</span> */}
            </label>
            <div className="flex items-center h-[56px] text-sm w-full text-gray-600 px-3 mt-2  bg-[#F8F8F8] rounded-lg focus-within:border-[2px] focus-within:border-purple-600">
              <label className="p-3 block text-gray-600" htmlFor="facebook">
                <FaLinkedin />
              </label>
              <input
                id="linkedIn"
                type="text"
                placeholder="e.g https://www.linkedin.com/user"
                className="w-full h-full outline-none border-none bg-transparent"
                onChange={(e) =>
                  //@ts-ignore
                  setMailContent((prev) => ({
                    ...prev,
                    linkedinLink: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          {/* TIKTOK */}

          <div className="my-6">
            <label
              className="text-sm mb-2 block text-gray-800"
              htmlFor="organizerName"
            >
              Tiktok Link
              {/* <span className="text-red-500">*</span> */}
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
                onChange={(e) =>
                  //@ts-ignore
                  setMailContent((prev) => ({
                    ...prev,
                    tiktokLink: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          {/* YOUTUBE */}

          <div className="my-6">
            <label
              className="text-sm mb-2 block text-gray-800"
              htmlFor="organizerName"
            >
              Youtube Link
              {/* <span className="text-red-500">*</span> */}
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
                onChange={(e) =>
                  //@ts-ignore
                  setMailContent((prev) => ({
                    ...prev,
                    youtubeLink: e.target.value,
                  }))
                }
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
                aria-disabled={isLoadingBanner}
                onClick={() => setEventPhoto([])}
                className="w-[72px] h-[72px] cursor-pointer text-3xl transition-all duration-300 ease-in-out hover:text-red-500 hover:bg-red-100 rounded-full bg-white grid place-content-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                {isLoadingBanner && (
                  <div className="text-5xl ml-2 rounded-full   z-[99999999999]">
                    <FadeLoader color="#7431B8" />
                  </div>
                )}
                {!isLoadingBanner && (
                  <RiDeleteBin6Fill
                    onClick={() => {
                      setEventPhoto([]);
                      setMailContent((prev: any) => ({
                        ...prev,
                        media: [],
                      }));
                    }}
                  />
                )}
              </div>
              <div>{thumbs}</div>
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
