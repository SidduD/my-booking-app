import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookingPage from "./BookingPage";
import PlaceImg from "../components/PlaceImg";

import { CiCreditCard1 } from "react-icons/ci";

import BookingDates from "../components/BookingDates";

function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const { action } = useParams();

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  return (
    <div>
      {action === undefined &&
        bookings?.length > 0 &&
        bookings.map((booking) => (
          <Link
            to={`/account/bookings/view?id=${booking._id}`}
            key={booking._id}
            className="flex  mx-auto max-w-screen-2xl gap-4 bg-gray-200 rounded-2xl overflow-hidden my-4 transition duration-300 transform hover:scale-95 hover:opacity-100 opacity-90"
          >
            <div className="w-48">
              <PlaceImg place={booking.place} className="object-cover h-full" />
            </div>
            <div className="py-3 grow pr-3">
              <h2 className="text-2xl font-bold">{booking.place.title}</h2>

              <div className="text-xl border-t border-gray-600">
                <BookingDates booking={booking} border={true} />
                <div className="flex items-center  justify-start gap-1 mt-4">
                  <CiCreditCard1 className="size-6" />
                  <span className="text-xl">Total Price: ${booking?.price}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}

      {action === "view" && <BookingPage />}
    </div>
  );
}

export default BookingsPage;
