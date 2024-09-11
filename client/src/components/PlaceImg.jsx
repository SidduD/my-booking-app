import Image from "./Image";

function PlaceImg({ place, index = 0, className = null }) {
  if (!place.photos?.length) return "";
  if (!className) {
    className = "object-cover rounded-2xl";
  }
  //   console.log(place);
  return <Image className={className} src={place.photos[index]} alt="" />;
}

export default PlaceImg;
