import { useForm } from "react-hook-form";
import { differenceInCalendarDays } from "date-fns";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function BookingWidget({ place }) {
  const navigate = useNavigate();
  const { register, reset, handleSubmit, watch } = useForm({
    defaultValues: {
      checkInDate: "",
      checkOutDate: "",
      numGuests: 1,
    },
  });

  const { user } = useUser();

  let numNights = 0;

  const SERVICE_PERCENTAGE = 15;
  const TAX_PERCENTAGE = 13;
  const [priceTotal, setPriceTotal] = useState(0);

  const serviceFee = (priceTotal * SERVICE_PERCENTAGE) / 100;
  const taxes = (priceTotal * TAX_PERCENTAGE) / 100;
  const total = priceTotal + serviceFee + taxes;

  if (watch("checkOutDate") && watch("checkInDate")) {
    numNights = differenceInCalendarDays(new Date(watch("checkOutDate")), new Date(watch("checkInDate")));
  }

  useEffect(() => {
    setPriceTotal(numNights * place.price);
  }, [numNights, place.price]);

  async function onSubmit(data) {
    const { checkInDate, checkOutDate, numGuests, name, mobile: phone } = data;
    const sendData = { checkInDate, checkOutDate, numGuests, name, phone, place: place._id, price: total };
    const response = await axios.post("/bookings", sendData);

    const bookingId = response.data._id;

    navigate(`/account/bookings/view?id=${bookingId}`);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md p-4 rounded-2xl max-w-96 mx-auto">
      <div className="text-2xl text-center">Price: ${place.price} / night</div>

      <div className="border rounded-xl my-4 ">
        <div className="flex">
          <div className="p-4  border-r">
            <label>Check in:</label>
            <input className="outline-none p-1" type="date" {...register("checkInDate")} />
          </div>

          <div className="p-4 ">
            <label>Check out:</label>
            <input className="outline-none p-1" type="date" {...register("checkOutDate")} />
          </div>
        </div>
        <div className="p-4 border-t ">
          <label>Number of Guests:</label>
          <input type="number" {...register("numGuests")} />
        </div>

        {numNights > 0 && (
          <div className="p-4 border-t ">
            <label>Your Full Name:</label>
            <input placeholder={user.name} type="text" {...register("name")} />

            <label>Phone Number:</label>
            <input placeholder="6478887211" type="tel" {...register("mobile")} />
          </div>
        )}
      </div>

      <button className="bg-blue-500 w-full rounded-2xl p-2 text-white text-lg hover:bg-blue-700">
        Book Now {numNights > 0 && `For ${numNights} ${numNights > 1 ? "Days" : "Day"}`}
      </button>

      {numNights > 0 && (
        <div>
          <div className="grid grid-cols-[2fr_1fr] mt-4 p-2">
            <div>
              <p className="underline my-2 ">
                ${place.price} x {numNights} {numNights > 1 ? "nights" : "night"}
              </p>
              <p className="underline my-2">Service Fee (15%)</p>
              <p className="underline my-2">Taxes (13%)</p>
            </div>
            <div>
              <p className="text-right my-2">${priceTotal.toFixed(2)} CAD</p>
              <p className="text-right my-2">${serviceFee.toFixed(2)} CAD</p>
              <p className="text-right my-2">${taxes.toFixed(2)} CAD</p>
            </div>
          </div>
          <div className="border-t my-1 grid grid-cols-2 p-2 text-lg font-semibold">
            <p className="underline my-2">Total</p>
            <p className="text-right my-2">${total.toFixed(2)} CAD</p>
          </div>
        </div>
      )}
    </form>
  );
}

export default BookingWidget;
