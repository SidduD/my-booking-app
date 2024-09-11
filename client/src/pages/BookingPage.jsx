import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingDates from "../components/BookingDates";

function BookingPage() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("id");

  const [booking, setBooking] = useState(null);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      const foundBooking = response.data.find(({ _id }) => _id === bookingId);

      if (foundBooking) {
        setBooking(foundBooking);
      }
    });
  }, [bookingId]);

  if (!booking) {
    return "";
  }

  return (
    <div>
      <h1 className="text-3xl">{booking?.place?.title}</h1>
      <AddressLink place={booking.place} />
      <div className="bg-gray-200 my-6 p-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Your booking information :</h2>
          <BookingDates booking={booking} border={false} />
        </div>

        <div className="bg-blue-500 text-white p-6 rounded-2xl">
          <div>Total Price</div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>

      <PlaceGallery place={booking.place} />
    </div>
  );
}

export default BookingPage;
