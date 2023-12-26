import React, { useEffect, useState } from "react";
import ListedArticle, {
  ListedArticleMobile,
} from "../Components/ListedArticle";
// import { get } from "mongoose";
import Verses from "../Components/Verses";

export default function Home() {
  const [listing, setListing] = useState([]);
  // const [verse, setVerse] = useState([]);

  useEffect(() => {
    const fetchListing = async () => {
      return await fetch("/api/listing/get?limit=4")
        .then((res) => res.json())
        .then((data) => setListing(data));
    };
    fetchListing();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="w-full bg-[url('/reading-book.gif')] bg-no-repeat bg-cover">
        <div className="w-[95%] md:w-[450px] bg-white opacity-95 p-8 mx-auto my-4 md:my-20 rounded-2xl border-[3px] flex flex-col gap-2 items-center">
          <Verses />
        </div>
      </div>

      <div className="flex flex-col gap-8 w-full bg-slate-700  pb-10 p-3 md:p-20">
        <h2 className="mt-4 md:mt-0 text-2xl font-semibold text-white">
          Most Recent Post
        </h2>
        <div className="hidden md:flex flex-col md:flex-row gap-8 w-full justify-between">
          {listing &&
            listing.length > 0 &&
            listing.map((article) => (
              <ListedArticle key={article._id} listing={article} />
            ))}
        </div>
        <div className="flex flex-col md:hidden gap-3 md:gap-8 w-full justify-between">
          {listing &&
            listing.length > 0 &&
            listing.map((article) => (
              <ListedArticleMobile key={article._id} listing={article} />
            ))}
        </div>
      </div>
    </div>
  );
}
