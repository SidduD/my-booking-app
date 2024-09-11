function AccommodationFormLabel({ h2, p = "" }) {
  return (
    <>
      <h2 className="text-xl mt-4">{h2}</h2>
      {p && <p className="text-gray-500 text-xs">{p}</p>}
    </>
  );
}

export default AccommodationFormLabel;
