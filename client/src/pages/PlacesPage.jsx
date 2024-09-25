import { Link, useParams } from "react-router-dom";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";

import AccommodationsForm from "../components/AccommodationsForm";
import { useEffect, useState } from "react";
import axios from "axios";

import PlaceImg from "../components/PlaceImg";
import toast from "react-hot-toast";

function PlacesPage() {
  const { action } = useParams();

  const [places, setPlaces] = useState([]);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    //Getting all the places of the user
    axios.get("/places/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, [trigger]);

  function handleDelete(id, e) {
    e.preventDefault();
    //Delete place
    axios.delete(`/places/${id}`).then((response) => {
      setTrigger((prev) => prev + 1);
      toast.success("Place deleted successfully");
    });
  }

  return (
    <div>
      {action === undefined && (
        <div className="text-center text-xs sm:text-lg">
          <Link
            to="/account/places/new"
            className="bg-blue-500 text-white py-2 px-6 rounded-full inline-flex items-center gap-1"
          >
            <FaPlus />
            Add new place
          </Link>
        </div>
      )}

      {action === "new" && <AccommodationsForm setTrigger={setTrigger} />}

      {action === undefined && (
        <div className="mt-8 ">
          {places.length > 0 &&
            places.map((place) => (
              <Link
                to={`/account/places/view?id=${place._id}`}
                key={place.title}
                className="mb-4 flex cursor-pointer gap-4 bg-gray-100 p-4 max-w-screen-xl mx-auto rounded-2xl transition duration-300 transform hover:scale-95 hover:opacity-100 opacity-90"
              >
                <div className="relative flex grow items-center sm:items-start gap-3">
                  <div className="absolute right-2 top-2 ml-3" onClick={(e) => handleDelete(place._id, e)}>
                    <FaRegTrashAlt className="text-red-600" />
                  </div>
                  <div className="flex size-24 max-w-24 sm:size-32 sm:max-w-32 bg-gray-300 grow shrink-0 rounded-2xl">
                    <PlaceImg place={place} />
                  </div>
                  <div className="grow-0 shrink">
                    <h2 className="text-sm sm:text-xl font-semibold truncate-multiline1">{place.title}</h2>
                    <p className="text-xs sm:text-sm mt-2 truncate-multiline4 ">{place.description}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      )}

      {action === "view" && <AccommodationsForm setTrigger={setTrigger} />}
    </div>
  );
}

export default PlacesPage;
