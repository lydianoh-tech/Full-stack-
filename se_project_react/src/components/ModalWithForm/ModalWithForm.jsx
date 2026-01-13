import React from "react";
import closeBtn from "../../assets/close-btn.png";
import "./ModalWithForm.css";

function ModalWithForm({
  title,
  name,
  buttonText,

  isOpen,
  onClose,
  children,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content modal__content_type_form">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          className="modal__close-icon"
        ></button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="submit__btn-frame">
            <button type="submit" className="modal__submit-btn">
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
