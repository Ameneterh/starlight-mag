import React from "react";
import { TbCategoryPlus, TbCurrencyNaira } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function ListedArticle({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full md:w-[300px]">
      <Link to="/fixurl">
        <img
          src="/reading-book.gif"
          alt="listing cover"
          className="h-[250px] sm:h[150px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />

        <div className="p-2 flex flex-col gap-2 w-full">
          <div className="w-full flex flex-col">
            <p className="flex gap-1 items-center truncate text-lg font-semibold text-slate-700 w-full">
              <TbCategoryPlus /> Article Title Goes Here
            </p>
            <p className="flex items-center justify-between w-full text-[12px] text-slate-500">
              Ed: SL/2023/01 <span>Nov 1, 2023</span>
            </p>
          </div>
          <p className="line-clamp-2 text-sm text-gray-600 text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
            reiciendis tempora, deserunt illo hic aperiam commodi corrupti
            consequatur, dolorum ducimus aut quia voluptatibus distinctio nemo,
            in velit ipsa perferendis repellendus.
          </p>
        </div>
      </Link>
      <Link
        to="author-profile"
        className="w-full flex items-center gap-2 p-2 border-t-2"
      >
        <img
          src="/profilepic.jpg"
          alt="author image"
          className="w-8 h-8 rounded-full"
        />
        <p className="text-[12px] text-slate-700">Author Name Here</p>
      </Link>
    </div>
  );
}
