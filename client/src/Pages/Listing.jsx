import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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
    <main className="h-screen w-full px-2 md:px-20">
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
          <div className="flex flex-row md:flex-col gap-2 w-full md:w-1/4 border-r border-r-slate-500 bg-green-600 p-3">
            <div className="">
              <img
                src={listing.imageUrls[0]}
                alt="magazine image"
                className="w-20 md:w-80"
              />
            </div>
            <div className="">Author Details</div>
          </div>
          <div className="flex w-full md:w-3/4 bg-gray-100 p-3">
            Magazine Content
          </div>
        </div>
      )}
    </main>
  );
}
