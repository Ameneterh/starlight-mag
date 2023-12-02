import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";

export default function Header() {
  const [nav, setNav] = useState(false);

  return (
    <div className="w-full bg-slate-400 flex flex-col shadow-lg md:sticky top-0 left-0 z-30">
      <div className="flex justify-center items-center w-full bg-[#943d24] p-1 border-b-[3px] border-slate-100">
        <p className="text-white text-lg">
          Like stars, shine through the dark night sky
        </p>
      </div>
      {/* font-family: 'Bree Serif', serif; */}
      <div className="w-full flex items-center justify-between px-3 md:px-8 mx-auto py-3 bg-white">
        <div className="hidden md:flex items-center gap-2 p-1">
          <Link to="/">
            <img
              src="/apple-touch-icon.png"
              alt="starlight-logo"
              className="h-20 w-80 p-2"
            />
          </Link>
        </div>

        {/* header search form */}
        <div className="">
          <form className="flex items-center justify-betweenw-[300px] md:w-[600px] h-10 rounded-full py-1 px-3 bg-white border-2 border-black">
            <input
              type="text"
              placeholder="search for article"
              className="w-full h-full focus:outline-none bg-transparent"
            />
            <button>
              <FaSearch size={20} className="text-slate-300" />
            </button>
          </form>
        </div>

        {/* header links */}
        <div className="hidden md:flex gap-4 text-lg uppercase">
          <Link
            to="/"
            className="hover:underline hover:font-semibold underline-offset-8"
          >
            home
          </Link>
          <Link
            to="/articles"
            className="hover:underline hover:font-semibold underline-offset-8"
          >
            articles
          </Link>
          <Link
            to="/about"
            className="hover:underline hover:font-semibold underline-offset-8"
          >
            about
          </Link>
        </div>

        {/* show on mobile */}
        <div
          onClick={() => setNav(!nav)}
          className="flex md:hidden text-2xl z-20"
        >
          {nav ? (
            <FaTimes size={30} className="text-white" />
          ) : (
            <FaBars size={30} />
          )}
        </div>

        {/* drop down navigation */}
        {nav && (
          <div className="flex flex-col justify-center items-center w-full h-[50%] absolute top-10 right-0 bg-gray-950 opacity-95 gap-8 text-white font-bold z-10">
            <div className="flex flex-col items-center justify-start gap-12 text-lg uppercase">
              <Link
                to="/"
                className="hover:underline hover:font-semibold underline-offset-8"
                onClick={() => setNav(!nav)}
              >
                home
              </Link>
              <Link
                to="/articles"
                className="hover:underline hover:font-semibold underline-offset-8"
                onClick={() => setNav(!nav)}
              >
                articles
              </Link>
              <Link
                to="/about"
                className="hover:underline hover:font-semibold underline-offset-8"
                onClick={() => setNav(!nav)}
              >
                about
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
