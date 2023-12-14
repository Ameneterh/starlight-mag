import React, { useEffect, useState } from "react";
import ListedArticle from "../Components/ListedArticle";

export default function Articles() {
  const [listing, setListing] = useState([]);

  console.log(listing);

  useEffect(() => {
    const fetchListing = async () => {
      return await fetch("/api/listing/get")
        .then((res) => res.json())
        .then((data) => setListing(data));
    };
    fetchListing();
  }, []);

  return (
    <div className="flex flex-col w-full pb-5 bg-slate-100">
      <div className="flex flex-col gap-4 w-full p-2 md:px-20">
        <h2 className="mt-2 md:mt-4 text-2xl font-semibold">
          View All Articles
        </h2>
        <div className="flex flex-col md:flex-row gap-8 w-full flex-wrap justify-between">
          {listing &&
            listing.length > 0 &&
            listing.map((article) => <ListedArticle listing={article} />)}
        </div>
      </div>
    </div>
  );
}
