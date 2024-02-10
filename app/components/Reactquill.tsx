"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type Iprops = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

function ReactQuillEditor({ value, setValue }: Iprops) {
  return (
    <ReactQuill
      className="h-52 pb-11 border  hover:border-primaryPurple"
      theme="snow"
      value={value}
      onChange={setValue}
      placeholder="More detailed description of your Event "
    />
  );
}

export default ReactQuillEditor;
