import { Link, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import AccommodationsForm from "../components/AccommodationsForm";
import { useEffect, useState } from "react";
import axios from "axios";

import PlaceImg from "../components/PlaceImg";

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

  return (
    <div>
      {action === undefined && (
        <div className="text-center">
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
                className="mb-2 flex cursor-pointer gap-4 bg-gray-100 p-4 max-w-screen-2xl mx-auto rounded-2xl transition duration-300 transform hover:scale-105 hover:opacity-100 opacity-90"
              >
                <div className="flex size-32 max-w-32 bg-gray-300 grow shrink-0 rounded-2xl">
                  <PlaceImg place={place} />
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl">{place.title}</h2>
                  <p className="text-sm mt-2">{place.description}</p>
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
