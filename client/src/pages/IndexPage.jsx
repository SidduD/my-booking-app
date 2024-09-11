import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../components/Image";

function IndexPage() {
  const [places, setPlaces] = useState(null);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);
  return (
    <div className="mt-8 grid gap-6 gap-y-8 gap-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places?.length > 0 &&
        places.map((place, index) => (
          <Link key={index} to={`/place/${place._id}`}>
            <div className="bg-gray-500 rounded-2xl flex mb-2">
              {place.photos?.[0] && (
                <Image className="rounded-2xl aspect-square object-cover" src={place.photos?.[0]} alt="" />
              )}
            </div>

            <h2 className="font-semibold">{place.address}</h2>
            <h3 className="truncate text-gray-500">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold">${place.price} </span> per night
            </div>
          </Link>
        ))}
    </div>
  );
}

export default IndexPage;
