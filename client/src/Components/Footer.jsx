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
          <p className="text-[14px] text-slate-800">
            Men and women who have lived wisely and well will shine brilliantly,
            like the cloudless, star-strewn night skies. And those who put
            others on the right path to life will glow like stars forever
          </p>
        </div>
        <div className="w-full md:w-1/3 flex flex-col items-center gap-2 px-2 py-4">
          <p className="font-semibold text-lg">Reach out to us:</p>
          <div className="w-full flex gap-1 items-center text-sm">
            <FaLocationDot />
            <p className="truncate">
              25 Liberty Street, Karatudu, Kaduna, Kaduna State
            </p>
          </div>
          <Link
            to="mailto:contact@ssastarlight.com.ng"
            className="flex gap-1 items-center text-sm"
          >
            <MdMarkEmailRead />
            contact@ssastarlight.com.ng
          </Link>
          <Link
            to="tel:2348154230654"
            className="flex gap-1 items-center text-sm"
          >
            <FaWhatsapp /> <MdCall />
            <MdTextsms />
            +2348154230654
          </Link>
        </div>
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-end gap-2 px-2 py-4">
          <h2 className="font-semibold text-lg">Link us on Social Media:</h2>
          <ul className="flex gap-4">
            <li className="p-1 border border-black rounded-md hover:scale-110 transition-all">
              <Link to="/" className="flex items-center gap-1 text-sm">
                <FaFacebook className="text-black text-2xl" />
              </Link>
            </li>
            <li className="p-1 border border-black rounded-md hover:scale-110 transition-all">
              <Link to="/" className="flex items-center gap-1 text-sm">
                <FaYoutube className="text-black text-2xl" />
              </Link>
            </li>
            <li className="p-1 border border-black rounded-md hover:scale-110 transition-all">
              <Link to="/" className="flex items-center gap-1 text-sm">
                <FaTwitter className="text-black text-2xl" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full bg-black p-3 flex items-center justify-center">
        <p className="text-white text-[13px]">
          &copy; 2023 Amene Terhemen,{" "}
          <span className="text-[10px]">+2348154230654</span>
        </p>
      </div>
    </div>
  );
}
