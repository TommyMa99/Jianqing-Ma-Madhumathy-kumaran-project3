import React, { useState } from "react";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  function handleLogin() {
    setIsLoggedIn(true);
    // perform login activities
  }

  function handleLogout() {
    setIsLoggedIn(false);
    // perform logout activities
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 my-5 justify-center">
      <div className="mx-auto md:mx-0">
        <img
          src="/twitter-logo.png"
          alt="Twitter Logo"
          width={"40px"}
          className="ml-8"
        />
      </div>

      <div className="col-span-2 md:border-x-2 md:border-slate-200 md:px-10 my-6 md:my-0">
        <div className="flex justify-between items-center">
          <SearchIcon className="absolute m-2" />
          <input type="text" className="bg-blue-100 rounded-full py-2 px-14" />
        </div>
      </div>

      <div className="px-0 md:px-6 mx-auto">
        <div className="flex justify-between">
          <div>
          {location.pathname !== "/signin" && (
            <div>
              {isLoggedIn ? (
                  <button onClick={handleLogout} className="border border-2 border-black bg-white-500 px-4 py-2 text-black rounded-full">
                    Logout
                  </button>
                ) : (
                  <Link to="signin">
                    <button onClick={handleLogin} className="border border-2 border-black bg-white-500 px-4 py-2 text-black rounded-full">
                      Log in
                    </button>
                  </Link>
              )}
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
