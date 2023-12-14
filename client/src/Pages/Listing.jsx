import { MdOutlineMail } from "react-icons/md";
import { FaReadme, FaShare } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Listing() {
  const { currentUser } = useSelector((state) => state.user);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get-listing/${params.listingId}`);
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className="h-screen w-full px-2 md:px-10">
      {loading && <p className="text-center my-7 text-2xl">Loading ...</p>}
      {error && (
        <p className="flex flex-col gap-4 text-center my-7 text-2xl text-red-700">
          <span>Something went wrong!</span>
          <span className="text-blue-700 hover:underline cursor-pointer">
            <Link to="/">Home Page</Link>
          </span>
        </p>
      )}

      {listing && !loading && !error && (
        <div className="flex flex-col md:flex-row gap-2 max-w-7xl mx-auto">
          <div className="flex flex-col gap-2 w-full md:w-1/4 p-3">
            <div className="flex w-full justify-center">
              <img
                src={listing.imageUrls[0]}
                alt="magazine image"
                className="w-96 md:w-[200px]"
              />
            </div>
            <div className="bg-slate-100 p-2 rounded-lg">
              <div className="flex flex-col border-b-2 pb-3">
                {/* show on only screens > 768px */}
                <h1 className="hidden md:inline-block text-[18px] font-semibold truncate">
                  {listing.title}
                </h1>

                {/* show on only screens < 768px */}
                <h1 className="text-[18px] font-semibold block md:hidden">
                  <span className="flex items-center gap-2 text-sm text-slate-600">
                    Click on title to read <FaReadme className="text-red-700" />
                  </span>
                  <Link
                    to={listing.editionContent[0]}
                    target="_blank"
                    className="text-blue-700 block truncate"
                  >
                    {listing.title}
                  </Link>
                </h1>
                <p className="text-slate-500 text-sm flex items-center justify-between">
                  {listing.edition} <span>{listing.createdAt}</span>
                </p>
                {/* link for copying url to share */}
                <div
                  className="flex flex-col fixed top-[21%] sm:top-[25%] left-[3%] z-10 border rounded-full w-14 h-14 justify-center items-center bg-slate-500  cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopied(true);
                  }}
                >
                  <FaShare className="text-white" />
                  <span className="text-white text-[10px] font-semibold">
                    copy link
                  </span>
                </div>
                {copied &&
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000) && (
                    <p className="fixed top-[28%] left-[7%] z-10 rounded-md bg-slate-100 p-2">
                      Link copied!
                    </p>
                  )}
              </div>
              <div className="flex gap-2 mt-2">
                <div className="">
                  <img
                    src={currentUser.avatar}
                    alt="alt"
                    className="flex w-7 h-7 rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <Link
                    to={`/api/user/author-profile/`}
                    className="text-[15px] text-slate-700 font-semibold hover:underline hover:opacity-90"
                  >
                    {currentUser.authorName}
                  </Link>
                  <p className="flex gap-1 items-center text-sm text-red-500">
                    Contact:
                    <span className="flex gap-2">
                      <Link to={`mailto:${currentUser.email}`}>
                        <MdOutlineMail className="font-semibold text-black text-lg hover:scale-125" />
                      </Link>
                      <Link
                        to={`https://${currentUser.socialMedia[0]}`}
                        target="_blank"
                      >
                        <MdOutlineMail className="font-semibold text-black text-lg hover:scale-125" />
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex w-screen min-h-screen md:w-3/4 p-3 justify-center">
            <object
              className="w-full"
              data={listing.editionContent[0]}
              type="application/pdf"
            ></object>
          </div>
        </div>
      )}
    </main>
  );
}
