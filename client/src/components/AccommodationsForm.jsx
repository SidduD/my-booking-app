import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

import { FaWifi } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { IoTvSharp } from "react-icons/io5";
import { FaDog } from "react-icons/fa6";
import { FaDoorOpen } from "react-icons/fa";
import { FaChessBoard } from "react-icons/fa6";

import AccommodationFormLabel from "../ui/AccommodationFormLabel";
import PerksItem from "../ui/PerksItem";
import PhotosUpload from "../components/PhotosUpload";
import CloseButton from "./CloseButton";
import toast from "react-hot-toast";

function AccommodationsForm({ setTrigger }) {
  const [searchParams] = useSearchParams("id");
  const placeId = searchParams.get("id");

  const isEditingSession = Boolean(placeId);

  const navigate = useNavigate();

  const { register, handleSubmit, watch, reset } = useForm();
  const [addedPhotos, setAddedPhotos] = useState([]);

  useEffect(() => {
    if (!placeId) {
      return;
    }
    axios.get(`/places/${placeId}`).then((response) => {
      const { data } = response;

      //PrePopulate form with fetched data
      setAddedPhotos(data.photos);
      reset({
        title: data.title,
        address: data.address,
        description: data.description,
        extraInfo: data.extraInfo,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        maxGuests: data.maxGuests,
        price: data.price,
        amenities: {
          wifi: data.perks.includes("wifi"),
          freeParking: data.perks.includes("freeParking"),
          tv: data.perks.includes("tv"),
          pets: data.perks.includes("pets"),
          privateEntrance: data.perks.includes("privateEntrance"),
          boardGames: data.perks.includes("boardGames"),
        },
      });
    });
  }, [placeId, reset]);

  async function onSubmit(data) {
    const { title, address, description, amenities, extraInfo, checkIn, checkOut, maxGuests, price } = data;
    const perks = Object.keys(amenities).filter((amenity) => amenities[amenity] === true);
    const sendData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price: Number(price),
    };

    if (isEditingSession) {
      try {
        await axios.put(`/places/${placeId}`, { ...sendData, placeId });
        toast.success("Successfully updated place");
      } catch (error) {
        toast.error("Error updating place");
      }
    } else {
      try {
        await axios.post("/places", sendData);
        toast.success("Successfully created place");
      } catch (error) {
        toast.error("Error creating place");
      }
    }

    setAddedPhotos([]);
    setTrigger((prev) => prev + 1);
    reset();
    navigate("/account/places");
  }
  return (
    <div>
      <CloseButton onClick={() => navigate("/account/places")} type="form">
        X
      </CloseButton>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AccommodationFormLabel h2="Title" />
        <input type="text" placeholder="Title, ex: My Lovely Apt..." {...register("title")} />
        <AccommodationFormLabel h2="Address" />
        <input type="text" placeholder="Address" {...register("address")} />

        <AccommodationFormLabel h2="Photos 🌄" p="More = Better!" />
        <PhotosUpload
          reset={reset}
          watch={watch}
          register={register}
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />

        <AccommodationFormLabel h2="Description" />
        <textarea {...register("description")} />

        <AccommodationFormLabel h2="Perks" p="Select all the amenities that best describes your place" />

        <div className="mt-2 grid gap-2 xs:grid-cols-2 text-xs sm:text-lg md:grid-cols-3">
          <PerksItem perk="Wifi" name="amenities.wifi" icon={<FaWifi />} register={register} />
          <PerksItem perk="Free parking" name="amenities.freeParking" icon={<FaParking />} register={register} />
          <PerksItem perk="TV" name="amenities.tv" icon={<IoTvSharp />} register={register} />
          <PerksItem perk="Pets" name="amenities.pets" icon={<FaDog />} register={register} />
          <PerksItem
            perk="Private Entrance"
            name="amenities.privateEntrance"
            icon={<FaDoorOpen />}
            register={register}
          />
          <PerksItem perk="Board Games" name="amenities.boardGames" icon={<FaChessBoard />} register={register} />
        </div>

        <AccommodationFormLabel h2="Extra info" p="House rules, etc..." />
        <textarea {...register("extraInfo")} />

        <AccommodationFormLabel h2="Accommodation Details" />
        <div className="grid gap-3 xs:grid-cols-2 sm:grid-cols-4 items-center">
          <div>
            <h3 className="text-gray-500 text-sm">Check in time</h3>
            <input type="text" placeholder="15:00" {...register("checkIn")} />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Check out time</h3>
            <input type="text" {...register("checkOut")} placeholder="11:00" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Price Per Night($)</h3>
            <input type="text" placeholder="170" {...register("price")} />
          </div>

          <div>
            <h3 className="text-gray-500 text-sm font-semibold">Max number of guests</h3>
            <select className="p-2 my-1 w-full text-center border rounded-xl" {...register("maxGuests")}>
              {[...Array(10)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="bg-blue-500 text-white rounded-2xl w-full py-2 my-4 hover:bg-blue-600 active:ring active:ring-blue-500 active:ring-offset-1">
          Save
        </button>
      </form>
    </div>
  );
}

export default AccommodationsForm;
