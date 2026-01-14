import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  currentUser,
  onCardClick,
  handleAddClick,
  onDeleteClick,
  onEditProfile,
  onSignOut,
  onCardLike,
}) {
  return (
    <div className="profile">
      <div className="profile__sidebar">
        <SideBar
          className="sidebar__profile-info"
          currentUser={currentUser}
          onEditProfile={onEditProfile}
          onSignOut={onSignOut}
        />
      </div>
      <div className="profile__main-content">
        <ClothesSection
          className="profile__clothes-section"
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          handleAddClick={handleAddClick}
          onDeleteClick={onDeleteClick}
          onCardLike={onCardLike}
        />
      </div>
    </div>
  );
}

export default Profile;
