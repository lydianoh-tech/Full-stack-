import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  clothingItems,
  onCardClick,
  handleAddClick,
  onDeleteClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const userId = currentUser._id;
  const filteredClothingItems = clothingItems.filter(
    (item) => String(item.owner) === String(userId)
  );
  return (
    <div className="clothes__section">
      <div className="clothes__section-main">
        <p className="clothes__section-title">Your items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes__section-add-btn"
        >
          + Add new
        </button>
      </div>

      <ul className="clothes__section-items">
        {filteredClothingItems.map((item) => (
          <ItemCard
            key={item._id || item.name}
            item={item}
            onCardClick={onCardClick}
            onDeleteClick={onDeleteClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
