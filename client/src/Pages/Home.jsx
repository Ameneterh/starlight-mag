import React, { useEffect, useState } from "react";
import ListedArticle from "../Components/ListedArticle";
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
          {/* <h2 className="text-[20px] font-semibold">
            Matthew 7:24{" "}
            <span className="text-sm text-slate-700">Amplified</span>
          </h2>
          <p className="text-[24px] text-slate-800 text-center">
            So everyone who hears these words of Mine and acts on them, will be
            like a wise man [a far-sighted, practical, and sensible man] who
            builds his house on the rock.
          </p> */}
        </div>
      </div>

      <div className="flex flex-col gap-8 w-full bg-slate-700  pb-10 p-2 md:p-20">
        <h2 className="mt-4 md:mt-0 text-2xl font-semibold text-white">
          Most Recent Post
        </h2>
        <div className="flex flex-col md:flex-row gap-8 w-full justify-between">
          {listing &&
            listing.length > 0 &&
            listing.map((article) => (
              <ListedArticle key={article._id} listing={article} />
            ))}
        </div>
      </div>
    </div>
  );
}
