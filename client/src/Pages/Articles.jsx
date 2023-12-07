import React from "react";
import ListedArticle from "../Components/ListedArticle";

export default function Articles() {
  return (
    <div className="h-screen w-full px-2 md:px-20 mt-4 md:mt-10">
      Articles
      <ListedArticle />
    </div>
  );
}
