import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const fileRef = useRef(null);

  const handleChange = (e) => {};

  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-2">
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
            <span className="text-green-700">Image Successfully Uploaded!</span>
          ) : (
            ""
          )}
        </p>
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
          id="socialMedia"
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
