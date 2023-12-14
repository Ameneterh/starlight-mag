import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useRef, useState } from "react";
import { ThreeDots, Vortex } from "react-loader-spinner";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [filePerc, setFilePerc] = useState(0);
  const [files, setFiles] = useState([]);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    title: "",
    edition: "",
    publicationDate: "",
    editionContent: [],
    description: "",
  });
  const dateInputRef = useRef(null);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [pdfUploadError, setPdfUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pdfUploading, setPdfUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(formData);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 2) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("image upload failed (2 mb max)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 1 image per listing");
      setUploading(false);
    }
  };

  const handleFileSubmit = (e) => {
    if (
      pdfFiles.length > 0 &&
      pdfFiles.length + formData.editionContent.length < 2
    ) {
      setPdfUploading(true);
      setPdfUploadError(false);
      const promises = [];
      for (let i = 0; i < pdfFiles.length; i++) {
        promises.push(storeFile(pdfFiles[i]));
      }
      Promise.all(promises)
        .then((eds) => {
          setFormData({
            ...formData,
            editionContent: formData.editionContent.concat(eds),
          });
          setPdfUploadError(false);
          setPdfUploading(false);
        })
        .catch((err) => {
          setPdfUploadError("File upload failed (2 mb max)");
          setPdfUploading(false);
        });
    } else {
      setPdfUploadError("You can only upload 1 File per listing");
      setPdfUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const storeFile = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePerc(Math.round(progress));
          // console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  // from firebase
  //  &&
  // request.resource.contentType.matches('image/.*');
  // }

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea" ||
      e.target.type === "date"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.imageUrls.length < 1)
      return setError("You must upload at least one image");

    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create an Article Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Article Title"
            className="border p-3 rounded-lg"
            id="title"
            required
            onChange={handleChange}
            value={formData.title}
          />
          <input
            type="text"
            placeholder="Edition Number"
            className="border p-3 rounded-lg"
            id="edition"
            maxLength="12"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.edition}
          />
          {/* <DatePicker
            value={startDate}
            onChange={(date) => setStartDate(date)}
            className="border p-3 rounded-lg"
          /> */}
          <input
            type="date"
            placeholder="Publication Date"
            className="border p-3 rounded-lg"
            id="publicationDate"
            required
            onChange={handleChange}
            ref={dateInputRef}
            // value={formData.edition}
          />
          <textarea
            type="text"
            placeholder="Short excerpt"
            className="border p-3 rounded-lg h-40"
            id="description"
            maxLength="250"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.description}
          />
        </div>
        <div className="flex flex-col flex-1 gap-4">
          {/* file upload section */}
          <p className="font-semibold">Add Edition PDF File:</p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setPdfFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="editionContent"
              accept="pdf/*"
            />
            <button
              onClick={handleFileSubmit}
              type="button"
              disabled={pdfUploading}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {pdfUploading ? (
                <Vortex
                  visible={true}
                  height="50"
                  width="50"
                  ariaLabel="vortex-loading"
                  wrapperStyle={{}}
                  wrapperClass="vortex-wrapper"
                  colors={[
                    "red",
                    "green",
                    "blue",
                    "yellow",
                    "orange",
                    "purple",
                  ]}
                />
              ) : (
                "Upload File"
              )}
            </button>
          </div>
          <p className="text-sm">
            {pdfUploadError ? (
              <span className="text-red-700">{pdfUploadError}</span>
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

          {/* image upload section */}
          <p className="font-semibold">
            Add Edition Cover Image:{" "}
            <span className="font-normal text-gray-600 ml-2">(max 2mb)</span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="imageUrl"
              accept="image/*"
              multiple
            />
            <button
              onClick={handleImageSubmit}
              type="button"
              disabled={uploading}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? (
                <Vortex
                  visible={true}
                  height="50"
                  width="50"
                  ariaLabel="vortex-loading"
                  wrapperStyle={{}}
                  wrapperClass="vortex-wrapper"
                  colors={[
                    "red",
                    "green",
                    "blue",
                    "yellow",
                    "orange",
                    "purple",
                  ]}
                />
              ) : (
                "Upload"
              )}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-14 h-20 object-cotain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <div className="flex items-center justify-center p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {loading ? (
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#4fa94d"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            ) : (
              <button
                disabled={loading || uploading}
                className=" bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              >
                Create Listing
              </button>
            )}
          </div>

          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
