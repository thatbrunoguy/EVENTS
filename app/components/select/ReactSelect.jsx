"use client";

import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default function ReactSelectOptions({
  options = [],
  selectedOption,
  setSelectedOption,
}) {
  return (
    <div>
      <Select
        id="eventsparrot"
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        value={selectedOption}
        theme={(theme) => ({
          ...theme,
          borderRadius: 4,
          colors: {
            ...theme.colors,
            primary25: "#F4F0F7",
            primary: "#7431B8",
          },
        })}
      />
    </div>
  );
}
