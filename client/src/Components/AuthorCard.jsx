import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";

export default function AuthorCard({ authorList }) {
  return (
    <div className="flex flex-col items-center bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg w-full md:w-[250px] border min-h-[250px] p-2 md:p-4 gap-4">
      <div className="">
        <img
          src={authorList.avatar}
          alt="alt"
          className="flex w-20 h-20 rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col w-full gap-3">
        <Link
          to={`/get-author/${authorList._id}`}
          className="text-xl md:text-[15px] text-slate-700 font-semibold hover:underline hover:opacity-90 w-full text-center uppercase"
        >
          {authorList.authorName}
        </Link>
        <p className="w-full line-clamp-4 text-sm text-slate-700">
          {authorList.aboutAuthor}
        </p>
        <p className="flex gap-1 items-center text-sm text-red-500 w-full text-left">
          Contact:
          <span className="flex gap-2">
            <Link to={`mailto:${authorList.email}`}>
              <MdOutlineMail className="font-semibold text-black text-lg hover:scale-125" />
            </Link>
            <Link to={`https://${authorList.socialMedia[0]}`} target="_blank">
              <MdOutlineMail className="font-semibold text-black text-lg hover:scale-125" />
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
