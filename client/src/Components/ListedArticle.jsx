import React from "react";
import { TbCategoryPlus } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function ListedArticle({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full md:w-[250px] border">
      <Link to={`/listing/${listing._id}`} className="">
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[250px] sm:h[150px] w-full object-cover object-top hover:scale-105 transition-scale duration-300"
        />

        <div className="p-2 w-full flex flex-col">
          <div className="w-full flex flex-col">
            <p className="text-start flex gap-1 items-center text-sm font-semibold text-slate-700 w-full">
              <TbCategoryPlus className="text-red-600 w-4 h-4" />
              <span className="w-full truncate">{listing.title}</span>
            </p>
            <p className="flex items-center justify-between w-full text-[12px] text-slate-500">
              {listing.edition} <span>{listing.publicationDate}</span>
            </p>
          </div>
          <p className="line-clamp-3 mt-2 text-[12px] text-gray-700 border-t-2 pt-2 text-justify">
            {listing.description}
          </p>
        </div>
      </Link>
    </div>
  );
}

export function ListedArticleMobile({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full md:w-[250px] border">
      <Link to={`/listing/${listing._id}`} className="flex">
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-full w-[90px] object-cover object-top hover:scale-105 transition-scale duration-300"
        />
        <div className="p-2 w-full flex flex-col">
          <div className="w-full flex flex-col">
            <p className="text-start flex gap-1 items-center text-sm font-semibold text-slate-700 w-full">
              <TbCategoryPlus className="text-red-600 w-4 h-4" />
              <span className="w-full truncate">{listing.title}</span>
            </p>
            <p className="flex items-center justify-between w-full text-[12px] text-slate-500">
              {listing.edition} <span>{listing.publicationDate}</span>
            </p>
          </div>
          <p className="line-clamp-3 mt-2 text-[12px] text-gray-700 border-t-2 pt-2 text-justify">
            {listing.description}
          </p>
        </div>
      </Link>
    </div>
  );
}
