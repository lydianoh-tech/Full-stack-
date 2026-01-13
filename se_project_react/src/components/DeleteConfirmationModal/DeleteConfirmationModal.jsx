import React from "react";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  isLoading,
}) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal__opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content modal__content_type_confirmation">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-icon"
          aria-label="Close modal"
        >
          ✕
        </button>

        <p className="modal__confirmation-text">
          Are you sure you want to delete
          <br />
          This action cannot be undone.
        </p>
        <div className="modal__buttons-container">
          <button
            className="modal__delete-affirmation-btn"
            type="button"
            onClick={onConfirm}
          >
            Yes, delete item
          </button>

          <button
            className="modal__btn_type_cancel"
            type="button"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
