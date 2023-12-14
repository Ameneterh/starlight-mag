import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [nav, setNav] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const links = [
    {
      id: 1,
      title: "home",
      url: "/",
    },
    {
      id: 2,
      title: "articles",
      url: "/articles",
    },
    {
      id: 3,
      title: "about",
      url: "/about",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

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
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-betweenw-[300px] md:w-[600px] h-10 rounded-full py-1 px-3 bg-white border-2 border-slate-200"
          >
            <input
              type="text"
              placeholder="search for article"
              className="w-full h-full focus:outline-none bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch size={20} className="text-slate-300" />
            </button>
          </form>
        </div>

        {/* header links */}
        <div className="hidden md:flex gap-4 text-lg uppercase items-center">
          {links.map((eachLink) => (
            <Link
              key={eachLink.id}
              to={eachLink.url}
              className="hover:underline hover:font-semibold underline-offset-8"
            >
              {eachLink.title}
            </Link>
          ))}

          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile"
                className="rounded-full h-8 w-8 object-cover"
              />
            ) : (
              <></>
            )}
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
              {links.map((eachLink) => (
                <Link
                  id={eachLink.id}
                  to={eachLink.url}
                  className="hover:underline hover:font-semibold underline-offset-8"
                  onClick={() => setNav(!nav)}
                >
                  {eachLink.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
