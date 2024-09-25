import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Image from "../components/Image";
import PlacesOperations from "../components/PlacesOperations";
import Loader from "../components/Loader";

function IndexPage() {
  const [places, setPlaces] = useState(null);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  //Filter
  const filterValue = searchParams.get("country") || "all";

  let filteredPlaces;

  if (filterValue === "all") filteredPlaces = places;
  if (filterValue === "canada") {
    filteredPlaces = places?.filter(
      (place) => place.address.split(" ")[place.address.split(" ").length - 1].toLowerCase() === "canada"
    );
  }

  if (filterValue === "usa")
    filteredPlaces = places?.filter(
      (place) => place.address.split(" ")[place.address.split(" ").length - 1].toLowerCase() === "usa"
    );

  // Sort
  const sortBy = searchParams.get("sortBy") || "name-asc";

  const [field, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;

  const sortedPlaces = filteredPlaces?.sort((a, b) => {
    if (field === "price") {
      // For numerical sorting (e.g., sorting by price)
      return (a.price - b.price) * modifier;
    } else if (field === "title") {
      // For string sorting (e.g., sorting by title alphabetically)
      return a.title.localeCompare(b.title) * modifier;
    } else {
      return 0; // Default/fallback case
    }
  });

  useEffect(() => {
    setIsLoading(true);
    axios.get("/places").then((response) => {
      if (response.data) {
        setPlaces(response.data);
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="mt-8">
        <PlacesOperations />
      </div>
      <div className="mt-8 grid gap-6 gap-y-8 gap-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedPlaces?.length > 0 &&
          sortedPlaces.map((place, index) => (
            <Link key={index} to={`/place/${place._id}`}>
              <div className="bg-gray-500 rounded-2xl flex mb-2">
                {place.photos?.[0] && (
                  <Image className="rounded-2xl aspect-square object-cover" src={place.photos?.[0]} alt="" />
                )}
              </div>

              <h2 className="font-semibold truncate">{place.address}</h2>
              <h3 className="truncate text-gray-500">{place.title}</h3>
              <div className="mt-1">
                <span className="font-bold">${place.price} </span> per night
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}

export default IndexPage;
