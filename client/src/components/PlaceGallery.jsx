import { TbGridDots } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import Image from "./Image";

function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-gray-300  min-h-screen">
        <div className="px-8 pt-8">
          <h2 className="text-3xl font-bold mr-36">Photos of {place?.title}</h2>
          <button
            onClick={() => setShowAllPhotos(false)}
            className="fixed right-12 top-8 items-center flex gap-1 cursor-pointer bg-black text-white py-2 px-4 rounded-2xl shadow shadow-black"
          >
            <IoMdClose />
            <span className="hidden sm:block">Close Photos</span>
          </button>
        </div>
        <div
          className={`p-8 bg-gray-300 grid  gap-4 ${place?.photos?.length === 1 ? "md:grid-cols-1" : "md:grid-cols-2"}`}
        >
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div key={photo}>
                <Image className="rounded-2xl object-cover w-full h-full" src={photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className={`grid gap-2 ${
          place?.photos?.length === 1
            ? "grid-cols-1"
            : place?.photos?.length === 2
            ? "grid-cols-2"
            : "grid-cols-[2fr_1fr]"
        } rounded-3xl overflow-hidden`}
      >
        <div>
          {place?.photos?.[0] && (
            <div>
              <Image
                onClick={() => setShowAllPhotos(true)}
                className={`${
                  place.photos.length === 1 ? "" : "aspect-square"
                } object-cover cursor-pointer w-full h-full`}
                src={place.photos[0]}
                alt=""
              />
            </div>
          )}
        </div>

        <div className="grid">
          {place?.photos?.[1] && (
            <Image
              onClick={() => setShowAllPhotos(true)}
              className="aspect-square object-cover cursor-pointer w-full h-full"
              src={place.photos[1]}
              alt=""
            />
          )}
          <div className="overflow-hidden">
            {place?.photos?.[2] && (
              <Image
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square object-cover relative top-2 cursor-pointer w-full h-full"
                src={place.photos[2]}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
      {place?.photos.length > 3 && (
        <button
          onClick={() => setShowAllPhotos(true)}
          className="absolute bottom-2 right-2 bg-white shadow-md shadow-gray-500 rounded-2xl py-2 px-4 flex gap-1 items-center justify-center"
        >
          <TbGridDots />
          Show more photos
        </button>
      )}
    </div>
  );
}

export default PlaceGallery;
