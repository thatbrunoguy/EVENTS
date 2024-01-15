"use client";

import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import Image from "next/image";
import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const Header = () => {
  const [options, setOptions] = useState([
    {
      title: " Eko convections centre",
      desc: "Lekki paradise estate 3, chevron drive",
      date: "Saturday, October 22, 2023 | 7:30pm",
    },
    {
      title: " Eko convections centre",
      desc: "Lekki paradise estate 3, chevron drive",
      date: "Saturday, October 22, 2023 | 7:30pm",
    },
    {
      title: " Eko convections centre",
      desc: "Lekki paradise estate 3, chevron drive",
      date: "Saturday, October 22, 2023 | 7:30pm",
    },
    {
      title: " Eko convections centre",
      desc: "Lekki paradise estate 3, chevron drive",
      date: "Saturday, October 22, 2023 | 7:30pm",
    },
  ]);
  return (
    <div className="w-full flex justify-end pr-7 border-b">
      <div className="flex items-center space-x-4 py-4">
        <p className="text-sm">Select event</p>
        <div className="w-[1px] h-[48px] bg-gray-300" />

        <Menu
          className="w-full"
          direction="bottom"
          // arrow
          align="end"
          menuButton={
            <MenuButton style={{ background: "transparent" }}>
              <div className="border-2 px-3 py-3 flex items-center justify-between border-primaryPurple rounded-lg  text-primaryPurple w-[400px] bg-purple-100">
                <p>Eko Events centre</p>
                <div className="text-xl">
                  <IoChevronDown />
                </div>
              </div>
            </MenuButton>
          }
          transition
        >
          {options.map((item, index) => (
            <MenuItem className="hover:bg-lightPurple" key={index}>
              <div className="flex items-center space-x-5 p-3 ">
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
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
};

export default Header;
