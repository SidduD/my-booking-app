import { HiMiniPaperAirplane } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useEffect, useRef, useState } from "react";

function Header() {
  const { user } = useUser();
  const [search, setSearch] = useState(false);
  // const searchRef = useRef();

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (searchRef.current && !searchRef.current.contains(event.target)) {
  //       setSearch(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [searchRef]);

  return (
    <header className="flex justify-between">
      <Link to={"/"} className="flex items-center gap-1">
        <HiMiniPaperAirplane className="size-8 text-blue-500 -rotate-90" />
        <span className="font-bold text-xl">MyBookingApp</span>
      </Link>

      {/* <div
        onClick={() => setSearch(true)}
        className="flex gap-2 cursor-pointer items-center border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300"
        ref={searchRef}
      >
        {search ? (
          <input placeholder="Search" className="outline-none" autoFocus />
        ) : (
          <>
            <div>Anywhere</div>
            <div className="text-gray-300">|</div>
            <div>Anytime</div>
            <div className="text-gray-300">|</div>
            <div>Experiences</div>
          </>
        )}

        <button className=" bg-blue-500 text-white p-2 rounded-full">
          <FaSearch className="size-4" />
        </button>
      </div> */}

      <Link
        to={user ? "/account" : "/login"}
        className="flex items-center justify-between gap-2 border border-gray-300 rounded-full py-2 px-4"
      >
        <GiHamburgerMenu className="size-6 text-gray-500" />
        <div className=" bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
          <FaUser className="size-6 relative -bottom-1" />
        </div>

        {user && <div className="hidden sm:block">{user.name}</div>}
      </Link>
    </header>
  );
}

export default Header;
