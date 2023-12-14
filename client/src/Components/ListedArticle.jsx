import React from "react";
import { TbCategoryPlus } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function ListedArticle({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full md:w-[250px] border">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[250px] sm:h[150px] w-full object-cover object-top hover:scale-105 transition-scale duration-300"
        />

        <div className="p-2">
          <div className="w-full flex flex-col">
            <p className="truncate flex gap-1 items-center text-sm font-semibold text-slate-700 w-full">
              <TbCategoryPlus /> {listing.title}
            </p>
            <p className="flex items-center justify-between w-full text-[12px] text-slate-500">
              {listing.edition} <span>{listing.publicationDate}</span>
            </p>
          </div>
          <p className="line-clamp-3 mt-2 text-sm text-gray-700 text-justify">
            {listing.description}
          </p>
        </div>
      </Link>
    </div>
  );
}
