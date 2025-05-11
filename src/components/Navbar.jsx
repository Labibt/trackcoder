import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCode, FaUser, FaBars } from "react-icons/fa";
import { UserContext } from "../context/contextAPI";
import { useContext } from "react";

export default function Navbar() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(UserContext);

  // Check if user is logged in using localStorage
  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isLoggedIn") === "true");
  }, [setIsAuthenticated]);

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    // Clear all authentication-related data
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    setIsAuthenticated(false);
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const navLinkStyles = ({ isActive }) =>
    isActive
      ? "text-blue-700 border-b-2 border-blue-700 px-3 py-2 rounded-md text-sm font-medium"
      : "text-gray-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium";

  return (
    <nav className="bg-blue-950 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center text-blue-700 text-2xl font-bold hover:text-blue-500 transition"
          >
            <FaCode className="h-6 w-6 mr-2" />
            <span>TrackCoder</span>
          </NavLink>

          {/* Center Links - Only show if authenticated */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <NavLink to="/user" className={navLinkStyles}>
                  Home
                </NavLink>
                <NavLink to="/user/leaderboard" className={navLinkStyles}>
                  Leaderboard
                </NavLink>
                <NavLink to="/user/addFriend" className={navLinkStyles}>
                  Add Friend
                </NavLink>
              </>
            ) : null}
          </div>

          {/* Right Profile Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setIsProfileDropdownOpen(true)}
                onMouseLeave={() => setIsProfileDropdownOpen(false)}
              >
                <button
                  onClick={toggleProfileDropdown}
                  className="text-gray-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium flex items-center transition"
                >
                  <FaUser className="h-5 w-5 mr-1 text-blue-500" />
                  <span className="hidden sm:inline">Profile</span>
                </button>
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <ul className="py-1 text-sm text-gray-700">
                      <li>
                        <NavLink
                          to="/user/edit-profile"
                          className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-700 rounded transition"
                        >
                          Edit Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/user/password-change"
                          className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-700 rounded transition"
                        >
                          Change Password
                        </NavLink>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 hover:bg-blue-100 hover:text-blue-700 rounded transition"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <NavLink
                  to="/auth"
                  className="text-gray-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/auth"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Sign Up
                </NavLink>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              <FaBars className="h-6 w-6 text-gray-400" />
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <ul className="space-y-1 text-gray-600 text-sm">
              {isAuthenticated ? (
                <>
                  <li>
                    <NavLink
                      to="/user"
                      className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-700 rounded transition"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/user/leaderboard"
                      className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-700 rounded transition"
                    >
                      Leaderboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/user/addFriend"
                      className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-700 rounded transition"
                    >
                      Add Friend
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/user/edit-profile"
                      className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-700 rounded transition"
                    >
                      Edit Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/user/password-change"
                      className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-700 rounded transition"
                    >
                      Change Password
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-blue-100 hover:text-blue-700 rounded transition"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/auth"
                      className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-700 rounded transition"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/auth"
                      className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-700 rounded transition"
                    >
                      Sign Up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
