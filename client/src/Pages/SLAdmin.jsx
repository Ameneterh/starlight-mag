import React from "react";

export default function SLAdmin() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg focus:outline-none"
          id="username"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg focus:outline-none"
          id="password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:80">
          sign In
        </button>
      </form>
      {/* show error here if any */}
      {/* {error && <p className="text-red-500 mt-5">{error}</p>} */}
      <p className="text-red-500 mt-5">Error if any shows here</p>
    </div>
  );
}
