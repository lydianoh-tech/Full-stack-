import { Link } from "react-router-dom";
import { useContext } from "react";
import "./Header.css";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import logo from "/src/assets/Logo.svg";

function Header({
  weatherData,
  handleAddClick,
  isLoggedIn,
  handleSignUp,
  handleSignIn,
  handleSignOut,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <img src={logo} alt="Logo" className="header__logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__elements">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              className="header__add-clothes-btn"
              type="button"
              onClick={handleAddClick}
            >
              + Add Clothes
            </button>
            <Link className="header__nav-link" to="/profile">
              <p className="header__username">{currentUser?.name}</p>
            </Link>
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar header__avatar-placeholder">
                {currentUser?.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </>
        ) : (
          <>
            <button
              onClick={handleSignUp}
              className="header__signup-btn"
              type="button"
            >
              Sign Up
            </button>
            <button
              onClick={handleSignIn}
              className="header__login-btn"
              type="button"
            >
              Log In
            </button>
            <button
              onClick={handleSignOut}
              className="header__logout-btn"
              type="button"
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
