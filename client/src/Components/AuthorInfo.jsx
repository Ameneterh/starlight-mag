import React, { useEffect, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { Link } from "react-router-dom";

export default function AuthorInfo({ userRef }) {
  const [author, setAuthor] = useState([]);

  console.log(author);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const res = await fetch(`/api/user/get-author/${userRef}`);
        const data = await res.json();

        if (data.success === false) {
          console.log("Error occured");
        }
        setAuthor(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAuthor();
  }, []);

  return (
    <div className="flex gap-2 mt-2">
      <div className="">
        <img
          src={author.avatar}
          alt="alt"
          className="flex w-7 h-7 rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <Link
          to={`/get-author/${author._id}`}
          className="text-[15px] text-slate-700 font-semibold hover:underline hover:opacity-90"
        >
          {author.authorName}
        </Link>
        <p className="flex gap-1 items-center text-sm text-red-500">
          Contact:
          <span className="flex gap-2">
            <Link to={`mailto:${author.email}`}>
              <MdOutlineMail className="font-semibold text-black text-lg hover:scale-125" />
            </Link>
            {/* <Link to={`https://${author.socialMedia[0]}`} target="_blank">
              <MdOutlineMail className="font-semibold text-black text-lg hover:scale-125" />
            </Link> */}
          </span>
        </p>
      </div>
    </div>
  );
}
