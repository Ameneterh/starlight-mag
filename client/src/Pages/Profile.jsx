import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const handleChange = (e) => {};

  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-2">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          placeholder="full name"
          className="border p-3 rounded-lg focus:outline-none focus:border-red-400"
          id="fullname"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg focus:outline-none focus:border-red-400"
          id="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="phone number"
          className="border p-3 rounded-lg focus:outline-none focus:border-red-400"
          id="phonenumber"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="social media accounts"
          className="border p-3 rounded-lg focus:outline-none focus:border-red-400"
          id="phonenumber"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="role"
          className="border p-3 rounded-lg focus:outline-none focus:border-red-400"
          id="role"
          onChange={handleChange}
        />
        <textarea
          type="text"
          placeholder="info about author"
          className="border p-3 rounded-lg focus:outline-none focus:border-red-400"
          id="aboutAuthor"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg focus:outline-none focus:border-red-400"
          id="username"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg focus:outline-none focus:border-red-400"
          id="password"
          onChange={handleChange}
        />

        <button
          // disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:80"
        >
          {/* {loading ? "Loading ..." : "Sign Up"} */}update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-green-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
