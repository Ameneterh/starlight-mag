import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col w-full ">
      <div className="w-full bg-[url('/reading-book.gif')] bg-no-repeat bg-cover">
        <div className="w-[95%] md:w-[450px] bg-white opacity-95 p-8 mx-auto my-4 md:my-20 rounded-2xl border-[3px] flex flex-col gap-2 items-center">
          <h2 className="text-[20px] font-semibold">
            Matthew 7:24{" "}
            <span className="text-sm text-slate-700">Amplified</span>
          </h2>
          <p className="text-[24px] text-slate-800 text-center">
            So everyone who hears these words of Mine and acts on them, will be
            like a wise man [a far-sighted, practical, and sensible man] who
            builds his house on the rock.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-8 w-full bg-slate-700 p-2 md:p-20">
        <h2 className="mt-4 md:mt-0 text-2xl font-semibold text-white">
          Most Recent Post
        </h2>
        <div className="flex gap-8 w-full">
          <div className="h-[500px] w-[70%] bg-slate-400 hidden md:flex">
            Magazine Display
          </div>
          <div className="flex flex-col gap-4 h-[200px] w-full md:w-[30%] bg-white p-4 rounded-lg border-[3px] border-slate-600 shadow-lg">
            <p>
              Title: <span className="font-bold"></span>
            </p>
            <p>
              Edition: <span className="font-bold"></span>
            </p>
            <p>
              Date Published: <span className="font-bold"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
