import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";
import BackButton from "../components/BackButton";

function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) return;

    axios.get(`/places/${id}`).then((response) => {
      // console.log(response.data);
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <BackButton backOptions={-1} />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl capitalize">{place.title}</h1>

        <AddressLink place={place} />

        <PlaceGallery place={place} />

        <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div className="mb-4">
            <div className="my-4">
              <h2 className="font-semibold text-2xl">Description</h2>
              {place.description}
            </div>
            <b>Check-in:</b> {place.checkIn}
            <br />
            <b>Check-out:</b> {place.checkOut}
            <br />
            <b className="text-lg">Max number of guests: {place.maxGuests}</b>
          </div>

          <div>
            <BookingWidget place={place} />
          </div>
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-semibold text-2xl">Extra Info</h2>
          <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
        </div>
      </div>
    </div>
  );
}

export default PlacePage;
