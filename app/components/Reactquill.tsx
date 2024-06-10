"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type Iprops = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
};

function ReactQuillEditor({ value, setValue, className }: Iprops) {
  let colorArray = [
    "#EAA7D5",
    "#15AD05",
    "#CEFF35",
    "#0519B2",
    "#73476E",
    "#E44398",
    "#E3D16B",
    "#FC2DCB",
    "#79DAB9",
    "#DE2F7F",
    "#C26038",
    "#C058DA",
    "#3539DE",
    "#DF4D36",
    "#EB557E",
    "#2FE75B",
    "#26AD3B",
    "#2107C2",
    "#4D2877",
    "#511F11",
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        {
          size: [],
        },
      ],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        {
          color: colorArray.length
            ? colorArray
            : ["red", "#785412", "blue", "yellow", "purple"],
        },
      ],
      [{ background: colorArray }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font",
  ];

  return (
    <ReactQuill
      className={`h-52 pb-11 border  hover:border-primaryPurple ${className}`}
      theme="snow"
      modules={modules}
      formats={formats}
      value={value}
      onChange={setValue}
      placeholder="More detailed description of your Event "
    />
  );
}

export default ReactQuillEditor;
