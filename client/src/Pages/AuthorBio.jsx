import { MdOutlineMarkEmailUnread, MdAddIcCall } from "react-icons/md";
import { FaWhatsappSquare, FaTwitter } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function AuthorBio() {
  const [author, setAuthor] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchAuthor = async () => {
      const authorId = params.authorId;
      return await fetch(`/api/user/get-author/${authorId}`)
        .then((res) => res.json())
        .then((data) => setAuthor(data));
    };
    fetchAuthor();
  }, [params.authorId]);

  // console.log(author.authorName);

  return (
    <div className="px-3 max-w-3xl mx-auto md:mb-10 pb-5">
      <h1 className="text-3xl text-center font-semibold my-7 border-b-[1px] pb-3">
        Meet Our Author:
      </h1>
      <div className="h-10 w-10 rounded-full bg-slate-300">
        <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white"></div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 font-light w-full">
        <img
          src={author.avatar}
          alt="author image"
          className="rounded-full h-[250px] w-[250px] self-center md:self-start object-cover shadow-lg border-2"
        />

        <div className="h-full flex-1 flex flex-col gap-4 text-justify">
          <p className="text-2xl text-slate-700 font-semibold border-b-[1px] pb-3">
            {author.authorName}
          </p>
          <p
            className="text-[14px] text-slate-700 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: author.aboutAuthor }}
          />
          {/* {author.aboutAuthor} */}
          {/* </p> */}
          <div className="flex w-full flex-col border-t-[1px] pt-3">
            <p className="text-red-400 text-[14px]">Contact the author:</p>
            <div className="flex flex-wrap items-center w-full gap-4">
              <Link to={`mailto:${author.email}`}>
                <MdOutlineMarkEmailUnread className="text-[26px] hover:scale-125" />
              </Link>
              <Link to={`https://wa.me/${author.phoneNumber}`} target="_blank">
                <FaWhatsappSquare className="text-2xl hover:scale-125" />
              </Link>
              <Link to={`tel:${author.phoneNumber}`}>
                <MdAddIcCall className="text-2xl hover:scale-125" />
              </Link>
              <Link
                to={`https://www.twitter.com/${author.socialMedia}`}
                target="_blank"
              >
                <FaTwitter className="text-2xl hover:scale-125" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
