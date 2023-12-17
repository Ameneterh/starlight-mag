import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TextEditor(props) {
  return (
    <div className="h-48 mb-2 md:mb-1">
      <ReactQuill
        theme="snow"
        className="rounded-lg h-36"
        value={props.value}
      />
    </div>
  );
  //   return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}
