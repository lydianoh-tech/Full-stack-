import "./ItemModal.css";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, onClose, card, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  const userId = currentUser?._id;
  // Checking if the current user is the owner of the current clothing item
  const isOwner = userId && String(card.owner) === String(userId);

  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-icon modal__close-icon_type_image"
        >
          ✕
        </button>

        <img
          src={card.imageUrl || card.link}
          alt={card.name}
          className="modal__image"
        />

        <div className="modal__footer">
          <div>
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {isOwner && (
            <button
              onClick={() => onDeleteClick(card)}
              type="button"
              className="modal__delete-btn"
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
