import { FaFacebook, FaYoutube, FaTwitter } from "react-icons/fa";
import { FaLocationDot, FaWhatsapp } from "react-icons/fa6";
import { MdMarkEmailRead, MdCall, MdTextsms } from "react-icons/md";

import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="w-full bg-[#e4ddf4] flex flex-col items-center justify-between">
      <div className="w-full px-3 md:px-8 flex flex-col md:flex-row items-start justify-between">
        <div className="hidden md:flex md:flex-col h-full w-1/3 gap-2 px-2 py-4">
          <h2 className="text-lg font-semibold">
            Daniel 12:3{" "}
            <span className="text-sm text-slate-700">Amplified</span>
          </h2>
          <p className="text-[16px] text-slate-800">
            Men and women who have lived wisely and well will shine brilliantly,
            like the cloudless, star-strewn night skies. And those who put
            others on the right path to life will glow like stars forever
          </p>
        </div>
        <div className="w-full md:w-1/3 flex flex-col items-center gap-2 px-2 py-4">
          <p className="font-semibold text-lg">Reach out to us:</p>
          <p className="flex gap-1 items-center">
            <FaLocationDot />
            25 Liberty Street, Karatudu, Kaduna, Kaduna State
          </p>
          <p className="flex gap-1 items-center">
            <MdMarkEmailRead />
            contact@ssastarlight.com.ng
          </p>
          <p className="flex gap-1 items-center">
            <FaWhatsapp /> <MdCall />
            <MdTextsms />
            +2348154230654
          </p>
        </div>
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-end gap-2 px-2 py-4">
          <h2 className="font-semibold text-lg">Link us on Social Media:</h2>
          <div className="hidden md:flex flex-col">
            <ul className="flex flex-col gap-1">
              <li className="p-1 border-2 rounded-md bg-slate-400 hover:scale-110 transition-all">
                <Link to="/" className="flex gap-1">
                  <FaFacebook className="text-white text-2xl" /> Facebook
                </Link>
              </li>
              <li className="p-1 border-2 rounded-md bg-slate-400 hover:scale-110 transition-all">
                <Link to="/" className="flex gap-1">
                  <FaYoutube className="text-white text-2xl" /> YouTube
                </Link>
              </li>
              <li className="p-1 border-2 rounded-md bg-slate-400 hover:scale-110 transition-all">
                <Link to="/" className="flex gap-1">
                  <FaTwitter className="text-white text-2xl" /> Twitter (X)
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full bg-black p-3 flex items-center justify-center">
        <p className="text-white font-sm">&copy; 2023 Amene Terhemen</p>
      </div>
    </div>
  );
}
