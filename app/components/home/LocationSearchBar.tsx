import React from "react";
import { FiSearch } from "react-icons/fi";
import { GrDown, GrLocation } from "react-icons/gr";

const LocationSearchBar = () => {
  return (
    <div className="h-[84px] shadow-xl bg-white flex rounded-xl  w-full ">
      <div className="flex items-center w-[50%] border-r px-6">
        <div className="flex items-center gap-4  w-full ">
          <label className="text-primaryPurple" htmlFor="searchLocation">
            <FiSearch size={24} />
          </label>
          <input
            id="searchLocation"
            className="outline-none font-light border-none block w-full"
            type="text"
            placeholder="Search Event..."
          />
        </div>
      </div>

      <div className="h-full flex items-center justify-between basis-1/2 px-6">
        <div className="flex items-center gap-2">
          <div className="text-primaryPurple">
            <GrLocation size={24} />
          </div>
          <p>Lagos</p>
        </div>
        <div>
          <GrDown />
        </div>
      </div>

      <div className="basis-1/2 h-full w-full hover:bg-purple-900 transition-all duration-300 cursor-pointer text-white  bg-primaryPurple grid place-content-center rounded-tr-xl rounded-br-xl">
        <p>Search</p>
      </div>
    </div>
  );
};

export default LocationSearchBar;
