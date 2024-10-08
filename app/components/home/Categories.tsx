import Image from "next/image";
import Link from "next/link";
import React from "react";

const categoriesOptions = [
  {
    id: "jdsj",
    name: "Music",
    path: "/assets/music.svg",
    url: "music",
  },
  {
    id: "jdsj",
    name: "Parties",
    path: "/assets/party.svg",
    url: "party",
  },
  {
    id: "jdsj",
    name: "Performing & Visual Arts ",
    path: "/assets/art.svg",
    url: "arts",
  },
  {
    id: "jdsj",
    name: "Holidays",
    path: "/assets/holiday.svg",
    url: "holiday",
  },
  {
    id: "jdsj",
    name: "Business",
    path: "/assets/business.svg",
    url: "business",
  },
  {
    id: "jdsj",
    name: "Health",
    path: "/assets/health.svg",
    url: "health",
  },
  {
    id: "jdsj",
    name: "Hobbies",
    path: "/assets/hobby.svg",
    url: "hobby",
  },
  {
    id: "jdsj",
    name: "Foods & Drink",
    path: "/assets/food.svg",
    url: "food",
  },
];

const HomeCategories = () => {
  return (
    <div className="w-[90%] mx-auto flex scrollbar-hide pb-8 items-center justify-center gap-10 overflow-x-scroll mt-[74px] md:mt-[126px]">
      {categoriesOptions.map((category) => (
        <Link
          href={`/events/category/${category.url}`}
          key={category.name}
          className="min-w-[133px] cursor-pointer  hover:shadow-2xl  hover:border-primaryPurple transition-all duration-300 w-[133px] px-3 h-[170px] flex flex-col items-center justify-center border-[.6px] border-[#D3D0D6] rounded-xl"
        >
          <Image
            className="w-auto h-auto"
            src={category.path}
            alt={category.name}
            width={85}
            height={75}
            priority
          />
          <p className="text-sm font-light mt-2 text-center">{category.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default HomeCategories;
