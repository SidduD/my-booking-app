import { LuMapPin } from "react-icons/lu";

function AddressLink({ place }) {
  if (!place) return "";
  return (
    <a
      target="_blank"
      href={`https://maps.google.com/?q=${place?.address}`}
      rel="noreferrer"
      className="my-3 capitalize font-semibold underline text-sm sm:text-xl flex gap-1 items-center"
    >
      <LuMapPin className="text-xl" />
      {place?.address}
    </a>
  );
}

export default AddressLink;
