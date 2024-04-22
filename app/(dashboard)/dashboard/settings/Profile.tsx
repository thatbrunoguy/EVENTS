"use client";

import React, { useEffect, useMemo, useState } from "react";
import ReactSelectOptions from "../../../components/select/ReactSelect";
import FileUpload from "../../../components/fileUpload/FileUpload";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authFunctions, uploadImageFunctions } from "@/app/utils/endpoints";
import { extractUrlBeforeQueryString, uploadImage } from "@/app/helpers";
import toast from "react-hot-toast";
import { FadeLoader } from "react-spinners";
import { AccountInfo } from "./page";
import { PrimaryLoading2 } from "@/app/components/loaders/PrimaryLoading";

type Iprops = {
  accountInfo: AccountInfo;
  setAccountInfo: React.Dispatch<React.SetStateAction<AccountInfo>>;
  accountPhoto: any;
  setAccountPhoto: any;
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
};

const OrganizationProfile = ({
  accountInfo,
  setAccountInfo,
  accountPhoto,
  setAccountPhoto,
  imageUrl,
  setImageUrl,
}: Iprops) => {
  const [isImageUploadEnabled, setIsImageUploadEnabled] = useState(false);
  const [isLoadingBanner, setIsLoadingBanner] = useState(false);
  const countries = [{ value: "ng", label: "Nigeria" }];
  const queryClient = useQueryClient();

  const isAccountInfoValid = useMemo(() => {
    return Object.values(accountInfo).every(
      (value) => typeof value === "string" && value.trim() !== ""
    );
  }, [accountInfo]);

  const { data, isError, isLoading, status } = useQuery({
    queryKey: ["account-avatar"],
    queryFn: () => uploadImageFunctions.getInitialURL(accountPhoto[0].name),
    enabled: isImageUploadEnabled,
    staleTime: Infinity,
  });

  const {
    data: accountInfo_,
    isError: isAccountError,
    isLoading: isAccountLoading,
    status: isAccountStatus,
  } = useQuery({
    queryKey: ["account-info"],
    queryFn: authFunctions.getAccountInfo,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isAccountStatus === "success") {
      setAccountInfo({
        name: accountInfo_?.name,
        avatar: accountInfo_.avatar,
        website: "https://eventsparrot.com",
        country: accountInfo_.country,
      });
      setImageUrl(accountInfo_?.avatar);
      setAccountPhoto([{ name: "avatar", preview: accountInfo_?.avatar }]);
    }
  }, [isAccountStatus]);

  useEffect(() => {
    // console.log("data", data);

    if (data?.url && status === "success" && !imageUrl) {
      const imageUpploadFinalHandler = async () => {
        setIsLoadingBanner(true);
        try {
          const res = await uploadImage(data.url, accountPhoto[0]);
          // console.log("res-image", res);
          setIsImageUploadEnabled(false);
          toast.success("Avatar uploaded successfully!!!");
          setImageUrl(extractUrlBeforeQueryString(data.url as string));
          setAccountInfo((prev: AccountInfo) => ({
            ...prev,
            avatar: extractUrlBeforeQueryString(data.url as string),
          }));
        } catch {
          toast.error("Something went wrong!!!");
        } finally {
          setIsLoadingBanner(false);
        }
      };
      imageUpploadFinalHandler();
    }
  }, [isImageUploadEnabled, status]);

  const createAccount = useMutation({
    mutationFn: authFunctions.updateAccount,
    onError: async (error, variables, context) => {
      if (
        error.message.includes(
          "Cannot read properties of undefined (reading 'url')"
        )
      ) {
        toast.success("Account created successfully");
      }
      // console.log(` ${error}`);
    },
    onSuccess: async (data, variables, context) => {
      // console.log("dddddd", data);
      queryClient.invalidateQueries({ queryKey: ["account-info"] });
    },
  });
  // console.log("imageUrl", imageUrl);
  const thumbs = accountPhoto.map((file: any) => (
    <div key={file.name}>
      <div>
        <img
          src={imageUrl ? imageUrl : file.preview}
          alt={file.name}
          // src={imageUrl ? imageUrl : file.preview}
          className="w-full h-[248px] object-cover"
          // Revoke data uri after image is loaded
          onLoad={() => {
            // console.log("file-from-me", file);
            // console.log("status-from-me", status);
            // console.log("isError", isError);

            setIsImageUploadEnabled(true);
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    if (accountPhoto.length > 0) {
      setAccountInfo((prev) => ({ ...prev, avatar: imageUrl }));
    } else if (accountPhoto.length === 0 && accountInfo.avatar) {
      setAccountInfo((prev) => ({ ...prev, avatar: "" }));
    }
  }, [accountPhoto]);

  // console.log("accountInfo", accountInfo);

  const saveAccountHandler = () => {
    createAccount.mutate(accountInfo);
  };

  return (
    <>
      {isAccountLoading ? (
        <div>
          <PrimaryLoading2 />
        </div>
      ) : (
        <div>
          <div className="my-9">
            {/* UPLOAD */}

            {isLoadingBanner && (
              <p className="text-[#7431B8] text-sm animate-pulse text-nowrap whitespace-nowrap">
                Image Uploading...
              </p>
            )}

            {accountPhoto.length === 0 && (
              <div className="w-full md:w-[270px]  relative flex items-center justify-center h-[248px] border border-dashed rounded-lg border-gray-600">
                <FileUpload setEventPhoto={setAccountPhoto} />
              </div>
            )}

            {accountPhoto.length > 0 && (
              <div className="w-full md:w-[270px]  relative overflow-hidden flex items-center justify-center h-[248px] border rounded-lg border-primaryPurple hover:bg-lightPurple">
                <div
                  aria-disabled={isLoadingBanner}
                  onClick={() => setAccountPhoto([])}
                  className="w-[72px] h-[72px] cursor-pointer text-3xl transition-all duration-300 ease-in-out hover:text-red-500 hover:bg-red-100 rounded-full bg-white grid place-content-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  {isLoadingBanner && (
                    <div className="text-5xl ml-2 rounded-full z-[99999999999]">
                      <FadeLoader color="#7431B8" />
                    </div>
                  )}
                  {!isLoadingBanner && (
                    <RiDeleteBin6Fill
                      onClick={() => {
                        setAccountPhoto([]);
                        setAccountInfo((prev) => ({ ...prev, avatar: "" }));
                        setImageUrl("");
                      }}
                    />
                  )}
                </div>
                <div className="">{thumbs}</div>
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
                value={accountInfo.name}
                onChange={(e) =>
                  setAccountInfo((prev) => ({ ...prev, name: e.target.value }))
                }
                id="organizerName"
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
                // selectedOption={accountInfo.country}
                selectedOption={countries.find(
                  (opt) => opt.value === accountInfo?.country
                )}
                // setSelectedOption={setSelectedOption}
                setSelectedOption={(selected: any) =>
                  setAccountInfo((prev) => ({
                    ...prev,
                    country: selected?.value || "",
                  }))
                }
                options={countries}
              />
            </div>
            <div className="my-6">
              <label
                className="text-sm mb-2 block text-gray-800"
                htmlFor="website"
              >
                Website <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={accountInfo.website}
                onChange={(e) =>
                  setAccountInfo((prev) => ({
                    ...prev,
                    website: e.target.value,
                  }))
                }
                id="website"
                placeholder="https://www/eventsparrot.com"
                className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
              />
            </div>

            <button
              onClick={saveAccountHandler}
              disabled={!isAccountInfoValid || createAccount.isPending}
              className={` ${
                isAccountInfoValid || createAccount.isPending
                  ? "bg-opacity-100"
                  : "bg-opacity-50 cursor-wait"
              } my-4 w-full h-12 rounded-md hover:bg-opacity-50 bg-primaryPurple grid place-content-center text-white text-sm`}
            >
              <p>Save</p>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrganizationProfile;
