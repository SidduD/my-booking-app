import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import Loader from "../components/Loader";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import BookingsPage from "./BookingsPage";

import { CiUser } from "react-icons/ci";
import { CiCircleList } from "react-icons/ci";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";

function AccountPage() {
  const { ready, user, setUser } = useUser();
  const navigate = useNavigate();

  let { subpage } = useParams();
  if (subpage === undefined) subpage = "profile";

  if (!ready) {
    return <Loader />;
  }
  if (ready && !user) {
    navigate("/login");
  }

  function getLinkClass(link) {
    let classes = "py-2 px-6 flex items-center rounded-full gap-1";
    const active = " bg-blue-500 text-white ";

    if (subpage === link) {
      classes += active;
    } else {
      classes += " bg-gray-200";
    }

    return classes;
  }

  async function logout() {
    await axios.post("/auth/logout");
    setUser(null);
    navigate("/");
  }

  return (
    <div>
      <nav className="w-full flex justify-center my-4 gap-2">
        <Link to="/account" className={getLinkClass("profile")}>
          <CiUser />
          My Profile
        </Link>
        <Link to="/account/bookings" className={getLinkClass("bookings")}>
          <CiCircleList />
          My Bookings
        </Link>
        <Link to="/account/places" className={getLinkClass("places")}>
          <HiOutlineBuildingLibrary />
          My Accomodations
        </Link>
      </nav>

      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto ">
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={logout} className="bg-blue-500 p-2 w-full max-w-sm text-white rounded-2xl mt-2">
            Logout
          </button>
        </div>
      )}

      {subpage === "places" && <PlacesPage />}
      {subpage === "bookings" && <BookingsPage />}
    </div>
  );
}

export default AccountPage;
