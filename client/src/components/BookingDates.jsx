import { MdNightsStay } from "react-icons/md";
import { format } from "date-fns";
import { IoCalendarOutline } from "react-icons/io5";

import { differenceInCalendarDays } from "date-fns";
function BookingDates({ booking }) {
  if (!booking) return "";

  return (
    <div className="text-sm sm:text-xl xs:flex items-center gap-2  text-gray-500 mt-2">
      <div className="flex items-center justify-start gap-1">
        <MdNightsStay className="size-6" />
        {differenceInCalendarDays(new Date(booking?.checkOutDate), new Date(booking?.checkInDate))} nights:
      </div>
      <div className=" flex items-center gap-2">
        <div className="flex items-center gap-1">
          <span className="hidden sm:block">
            <IoCalendarOutline className="size-6" />
          </span>
          {format(new Date(booking?.checkInDate), "yyyy-MM-dd")} &rarr;
        </div>

        <div className="flex items-center gap-1">
          <span className="hidden sm:block">
            <IoCalendarOutline className="size-6" />
          </span>
          {format(new Date(booking?.checkOutDate), "yyyy-MM-dd")}
        </div>
      </div>
    </div>
  );
}

export default BookingDates;
