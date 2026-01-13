import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <div className="sidebar__username">{currentUser?.name}</div>
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar sidebar__avatar-placeholder">
            {currentUser?.name?.charAt(0).toUpperCase() || ""}
          </div>
        )}
      </div>
      <button
        type="button"
        className="sidebar__edit-btn"
        onClick={onEditProfile}
      >
        Change profile data
      </button>
      <button
        type="button"
        className="sidebar__signout-btn"
        onClick={onSignOut}
      >
        Sign out
      </button>
    </aside>
  );
}

export default SideBar;
