import axios from "axios";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";

import { FaStar } from "react-icons/fa";
import Image from "./Image";

function PhotosUpload({ reset, watch, register, setAddedPhotos, addedPhotos }) {
  async function addPhotoByLink(e) {
    e.preventDefault();

    if (!watch("photoLink")) return;
    const { data: filename } = await axios.post("/upload/upload-by-link", { link: watch("photoLink") });

    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    reset({ photoLink: "" });
  }

  async function uploadPhoto(e) {
    const files = e.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    const { data: filenames } = await axios.post("/upload", data, {
      headers: { "Content-type": "multipart/form-data" },
    });

    setAddedPhotos((prev) => {
      return [...prev, ...filenames];
    });
  }

  function removePhoto(e, filename) {
    e.preventDefault();
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
  }
  function selectAsMainPhoto(e, filename) {
    e.preventDefault();
    const addedPhotosWithoutSelected = [...addedPhotos.filter((photo) => photo !== filename)];

    setAddedPhotos([filename, ...addedPhotosWithoutSelected]);
  }
  return (
    <>
      <div className="flex gap-2 relative">
        <input type="text" placeholder="Add using a link ...jpg" {...register("photoLink")} />
        <button
          className="bg-blue-500 rounded-xl px-4 py-1 text-white absolute right-1 top-1/2 transform -translate-y-1/2 hover:bg-blue-700 "
          onClick={addPhotoByLink}
        >
          Add&nbsp;Photo
        </button>
      </div>

      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos?.length > 0 &&
          addedPhotos.map((link, index) => (
            <div className="h-32 flex relative" key={index}>
              <Image className="rounded-2xl w-full object-cover" src={link} alt="accommodationImages" />

              <button
                onClick={(e) => removePhoto(e, link)}
                className=" cursor-pointer absolute bottom-1 right-2 bg-opacity-70 rounded-xl hover:bg-red-500 text-white bg-black py-2 px-3"
              >
                <FaRegTrashCan />
              </button>

              <button
                onClick={(e) => selectAsMainPhoto(e, link)}
                className=" cursor-pointer absolute bottom-1 left-2 bg-opacity-70 rounded-xl hover:-bl text-white bg-black py-2 px-3"
              >
                {link === addedPhotos[0] ? <FaStar className="text-yellow-500" /> : <FaRegStar />}
              </button>
            </div>
          ))}
        <label className=" h-32 border bg-transparent rounded-xl hover:bg-gray-200 cursor-pointer text-2xl text-gray-600 flex items-center gap-1 justify-center">
          <input type="file" multiple className="hidden" onChange={uploadPhoto} />
          <IoCloudUploadOutline className="size-8" />
          <span>Upload</span>
        </label>
      </div>
    </>
  );
}

export default PhotosUpload;
