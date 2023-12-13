import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { current } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";

export default function Profile() {
  const fileRef = useRef(null);

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  return (
    <main className="p-3 max-w-7xl mx-auto">
      <div className="w-full flex flex-col sm:flex-row gap-4">
        {/* p-3 max-w-lg mx-auto */}
        <div className="flex flex-col flex-1 p-3 max-w-lg border rounded-lg">
          <button
            onClick={handleShowListings}
            className="text-green-700 w-full text-right"
          >
            Show My Listings
          </button>
          <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              ref={fileRef}
              hidden
            />
            <img
              onClick={() => fileRef.current.click()}
              accept="image/*"
              src={formData.avatar || currentUser.avatar}
              alt="profile"
              className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
            />
            <p className="text-sm self-center">
              {fileUploadError ? (
                <span className="text-red-700">
                  Error Image Upload (image must be less than 2 mb)
                </span>
              ) : filePerc > 0 && filePerc < 100 ? (
                <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
              ) : filePerc === 100 ? (
                <span className="text-green-700">
                  Image Successfully Uploaded!
                </span>
              ) : (
                ""
              )}
            </p>

            <input
              type="text"
              placeholder="full name"
              className="border p-3 rounded-lg focus:outline-none focus:border-red-400"
              id="fullname"
              defaultValue={currentUser.authorName}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="email"
              className="border p-3 rounded-lg focus:outline-none focus:border-red-400"
              id="email"
              defaultValue={currentUser.email}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="phone number"
              className="border p-3 rounded-lg focus:outline-none focus:border-red-400"
              id="phonenumber"
              defaultValue={currentUser.phoneNumber}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="social media accounts"
              className="border p-3 rounded-lg focus:outline-none focus:border-red-400"
              id="socialMedia"
              defaultValue={currentUser.socialMedia}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="role"
              className="border p-3 rounded-lg focus:outline-none focus:border-red-400"
              id="role"
              defaultValue={currentUser.role}
              onChange={handleChange}
            />
            <textarea
              type="text"
              placeholder="info about author"
              className="border p-3 rounded-lg focus:outline-none focus:border-red-400"
              id="aboutAuthor"
              defaultValue={currentUser.aboutAuthor}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="username"
              className="border p-3 rounded-lg focus:outline-none focus:border-red-400"
              id="username"
              defaultValue={currentUser.username}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="password"
              className="border p-3 rounded-lg focus:outline-none focus:border-red-400"
              id="password"
              defaultValue={currentUser.password}
              onChange={handleChange}
            />

            <button
              disabled={loading}
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:80"
            >
              {loading ? "updating ..." : "update"}
            </button>

            <Link
              className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
              to={"/create-listing"}
            >
              create listing
            </Link>
          </form>
          <div className="flex justify-between mt-5">
            <span
              onClick={handleDeleteUser}
              className="text-red-700 cursor-pointer"
            >
              Delete Account
            </span>
            <span
              onClick={handleSignOut}
              className="text-red-700 cursor-pointer"
            >
              Sign Out
            </span>
          </div>
          <p className="text-red-700 mt-5">{error ? error : ""}</p>
          <p className="text-green-700 mt-5">
            {updateSuccess ? "User successfully updated!" : ""}
          </p>
        </div>

        <div className="flex flex-col flex-1 p-3">
          <p className="text-red-700 mt-2 text-xl font-semibold">
            {showListingsError ? "Error showing listings" : ""}
          </p>
          <h1 className="text-center mb-5 text-2xl font-semibold">
            Your Listings
          </h1>
          <div className="flex gap-4 flex-wrap">
            {userListings &&
              userListings.length > 0 &&
              userListings.map((listing) => (
                <div
                  key={listing._id}
                  className=" border rounded-lg p-2 flex justify-between items-center gap-4"
                >
                  <Link to={`/listing/${listing._id}`} className="">
                    <img
                      src={listing.imageUrl[0]}
                      alt="listing image"
                      className="h-50 w-20 object-contain rounded-lg"
                    />
                  </Link>
                  <div className="flex flex-col gap-6">
                    <Link
                      className="text-slate-700 font-semibold hover:underline flex-1"
                      to={`/listing/${listing._id}`}
                    >
                      <p className=" truncate">{listing.title}</p>
                    </Link>
                    <div className="flex items-center justify-between">
                      <button className="text-green-700 uppercase hover:underline hover:font-semibold">
                        Edit
                      </button>
                      <button className="text-red-700 uppercase hover:underline hover:font-semibold">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
