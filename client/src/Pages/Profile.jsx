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
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import TextEditor from "../Components/TextEditor";

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

  console.log(formData);

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

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="px-3 max-w-7xl mx-auto">
      <div className="w-full flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col flex-1 p-8 max-w-lg border-b border-b-gray-400 md:border-r md:border-r-gray-400 md:border-b-0">
          {/* sign out and show listing md screens */}
          <div className="w-full hidden md:flex justify-between bg-green-50 p-2 rounded-lg">
            <button
              onClick={handleShowListings}
              className="w-full text-green-900 text-right hover:font-semibold"
            >
              Show My Listings
            </button>
          </div>

          <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
            <label
              for="authorName"
              className="mb-[-20px] text-blue-700 text-[12px] z-10 px-2 bg-white"
            >
              Full name:
            </label>
            <input
              type="text"
              placeholder="full name"
              className="border-b border-black p-3 focus:outline-none focus:border-red-400"
              id="authorName"
              defaultValue={currentUser.authorName}
              onChange={handleChange}
            />
            <label
              for="email"
              className="mb-[-20px] text-blue-700 text-[12px] z-10 px-2 bg-white"
            >
              Email:
            </label>
            <input
              type="email"
              placeholder="email"
              className="border-b border-black p-3 focus:outline-none focus:border-red-400"
              id="email"
              defaultValue={currentUser.email}
              onChange={handleChange}
            />
            <label
              for="phonenumber"
              className="mb-[-20px] text-blue-700 text-[12px] z-10 px-2 bg-white"
            >
              Phone Number:
            </label>
            <input
              type="text"
              placeholder="phone number"
              className="border-b border-black p-3 focus:outline-none focus:border-red-400"
              id="phonenumber"
              defaultValue={currentUser.phoneNumber}
              onChange={handleChange}
            />
            <label
              for="socialMedia"
              className="mb-[-20px] text-blue-700 text-[12px] z-10 px-2 bg-white"
            >
              Social Media Accounts:
            </label>
            <input
              type="text"
              placeholder="social media accounts"
              className="border-b border-black p-3 focus:outline-none focus:border-red-400"
              id="socialMedia"
              defaultValue={currentUser.socialMedia}
              onChange={handleChange}
            />
            <label
              for="aboutAuthor"
              className="mb-[-20px] text-blue-700 text-[12px] z-10 p-2 bg-white"
            >
              About Author:
            </label>
            {/* <TextEditor
              defaultValue={currentUser.aboutAuthor}
              value={currentUser.aboutAuthor}
              onChange={handleChange}
            /> */}
            <textarea
              type="text"
              placeholder="info about author"
              className="h-48 border-b border-black p-3 focus:outline-none focus:border-red-400"
              id="aboutAuthor"
              defaultValue={currentUser.aboutAuthor}
              onChange={handleChange}
            />
            <label
              for="username"
              className="mb-[-20px] text-blue-700 text-[12px] z-10 px-2 bg-white"
            >
              Username:
            </label>
            <input
              type="text"
              placeholder="username"
              className="border-b border-black p-3 focus:outline-none focus:border-red-400"
              id="username"
              defaultValue={currentUser.username}
              onChange={handleChange}
            />
            <label
              for="password"
              className="mb-[-20px] text-blue-700 text-[12px] z-10 px-2 bg-white"
            >
              Password:
            </label>
            <input
              type="password"
              placeholder="password"
              className="border-b border-black p-3 focus:outline-none focus:border-red-400"
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
          </form>
          <div className="flex justify-between mt-5">
            <span
              onClick={handleDeleteUser}
              className="text-red-700 cursor-pointer"
            >
              Delete Account
            </span>
          </div>

          <div className="w-full flex md:hidden justify-between bg-green-50 p-2 rounded-sm mt-2">
            <button
              onClick={handleShowListings}
              className="text-green-900 w-full text-center hover:font-semibold"
            >
              Show My Listings
            </button>
          </div>

          {error ? <p className="text-red-700 mt-5">{error}</p> : ""}

          {updateSuccess ? (
            <p className="text-green-700 mt-5">"User successfully updated!"</p>
          ) : (
            ""
          )}
        </div>

        <div className="flex flex-col flex-1 p-8">
          <Link
            className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
            to={"/create-listing"}
          >
            create listing
          </Link>
          <p className="text-red-700 mt-2 text-xl font-semibold">
            {showListingsError ? "Error showing listings" : ""}
          </p>
          <h1 className="text-center mb-5 text-2xl font-semibold">
            Your Listings
          </h1>
          <div className="flex gap-4 flex-wrap w-full">
            {userListings &&
              userListings.length > 0 &&
              userListings.map((listing) => (
                <div
                  key={listing._id}
                  className="border rounded-lg p-2 flex items-center gap-2 w-[320px] h-[150px] shadow-md hover:shadow-lg transition-shadow bg-slate-200"
                >
                  <Link to={`/listing/${listing._id}`} className="h-full w-1/3">
                    <img
                      src={listing.imageUrls[0]}
                      alt="listing image"
                      className="rounded-lg"
                    />
                  </Link>
                  <div className="flex flex-col justify-between h-full w-2/3">
                    <Link
                      className="w-full text-slate-700 font-semibold hover:underline"
                      to={`/listing/${listing._id}`}
                    >
                      <p className="break-normal w-full">{listing.title}</p>
                    </Link>
                    <div className="flex items-center justify-between">
                      <Link to={`/update-listing/${listing._id}`}>
                        <button className="text-green-700 uppercase hover:underline hover:font-semibold">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleListingDelete(listing._id)}
                        className="text-red-700 uppercase hover:underline hover:font-semibold"
                      >
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
