"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function ReactQuillEditor() {
  const [value, setValue] = useState("");

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
