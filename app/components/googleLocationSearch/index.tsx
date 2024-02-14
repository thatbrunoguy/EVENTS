"use client";

import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";
import { EventInfoType } from "@/app/(dashboard)/dashboard/create/basic-info/page";

type Iprops = {
  setEventInfo: React.Dispatch<React.SetStateAction<EventInfoType>>;
  value: any;
  setValue: React.Dispatch<any>;
};

const GoogleLocationSearch = ({ setEventInfo, value, setValue }: Iprops) => {
  setKey(process.env.NEXT_PUBLIC_GOOGLE_PLACES as string);

  useEffect(() => {
    if (value) {
      fromPlaceId(value?.value?.place_id as string)
        .then(({ results }) => {
          const { lat, lng } = results[0].geometry.location;
          console.log(lat, lng);
          setEventInfo((prev) => ({
            ...prev,
            location_details: {
              ...prev.location_details,
              address: value?.value?.description as string,
              latitude: lat.toString() as string,
              longitude: lng.toString() as string,
            },
          }));
        })
        .catch(console.error);
    }
    console.log("value--", value?.value?.place_id as string);
    console.log("res", value);
  }, [value]);

  return (
    <div>
      {" "}
      <label className="text-sm text-gray-800 mb-2 block">
        Venue Location <span className="text-red-500">*</span>
      </label>
      {/* <div className="flex items-center space-x-2 h-[56px] focus-within:border-2 focus-within:border-primaryPurple text-sm w-full text-gray-600 px-3 mt-2  bg-[#F8F8F8] rounded-lg outline-primaryPurple">
        <label htmlFor="search">
          <GoSearch />
        </label>
        <input
          id="search"
          type="text"
          placeholder="Location"
          className="block bg-transparent w-full h-full outline-none border-none"
        />
      </div> */}
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES}
        selectProps={{
          value,
          onChange: (val) => {
            setValue(val as any);
          },
        }}
      />
    </div>
  );
};

export default GoogleLocationSearch;
