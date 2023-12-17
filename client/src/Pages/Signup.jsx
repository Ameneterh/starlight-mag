import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sl-admin");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto md:mb-10">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 font-light text-sm"
      >
        <p className="text-black text-[12px]">
          <span className="text-red-600">*</span> show required input field
        </p>
        <label
          for="authorName"
          className="mb-[-20px] text-slate-700 text-[12px] z-10 px-2 bg-white"
        >
          Full name: <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          required
          className="border-b border-black p-3 focus:outline-none focus:border-red-400"
          id="authorName"
          onChange={handleChange}
        />
        <label
          for="email"
          className="mb-[-20px] text-slate-700 text-[12px] z-10 px-2 bg-white"
        >
          Email: <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          required
          className="border-b border-black p-3 focus:outline-none focus:border-red-400"
          id="email"
          onChange={handleChange}
        />

        <label
          for="phoneNumber"
          className="mb-[-20px] text-slate-700 text-[12px] z-10 px-2 bg-white"
        >
          Phone Number: <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          required
          className="border-b border-black p-3 focus:outline-none focus:border-red-400"
          id="phoneNumber"
          onChange={handleChange}
        />

        <label
          for="socialMedia"
          className="mb-[-20px] text-slate-700 text-[12px] z-10 px-2 bg-white"
        >
          Social Media Accounts:
        </label>
        <input
          type="text"
          className="border-b border-black p-3 focus:outline-none focus:border-red-400"
          id="socialMedia"
          onChange={handleChange}
        />

        <label
          for="avatar"
          className="mb-[-20px] text-slate-700 text-[12px] z-10 px-2 bg-white"
        >
          Author Avatar: <span className="text-red-600">*</span>
        </label>
        <input
          type="file"
          className="border-b border-black p-3 focus:outline-none focus:border-red-400 bg-white"
          accept="image/*"
          id="avatar"
          onChange={handleChange}
        />

        <label
          for="role"
          className="mb-[-20px] text-slate-700 text-[12px] z-10 px-2 bg-white"
        >
          Role:
        </label>
        <input
          type="text"
          className="border-b border-black p-3 focus:outline-none focus:border-red-400"
          id="role"
          onChange={handleChange}
        />

        <label
          for="aboutAuthor"
          className="mb-[-20px] text-slate-700 text-[12px] z-10 px-2 bg-white"
        >
          About Author: <span className="text-red-600">*</span>
        </label>
        <textarea
          type="text"
          required
          className="h-48 border-b border-black p-3 focus:outline-none focus:border-red-400"
          id="aboutAuthor"
          onChange={handleChange}
        />

        <label
          for="username"
          className="mb-[-20px] text-slate-700 text-[12px] z-10 px-2 bg-white"
        >
          Username: <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          required
          className="border-b border-black p-3 focus:outline-none focus:border-red-400"
          id="username"
          onChange={handleChange}
        />

        <label
          for="password"
          className="mb-[-20px] text-slate-700 text-[12px] z-10 px-2 bg-white"
        >
          Password: <span className="text-red-600">*</span>
        </label>
        <input
          type="password"
          required
          className="border-b border-black p-3 focus:outline-none focus:border-red-400"
          id="password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:80"
        >
          {loading ? "Loading ..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/signin"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
