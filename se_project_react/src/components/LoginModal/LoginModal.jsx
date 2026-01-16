import "./LoginModal.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { login } from "../../utils/auth";

function LoginModal({
  isOpen,
  activeModal,
  onClose,
  onLogin,
  setActiveModal,
  onSignupClick,
}) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  if (activeModal !== "signin") return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const { email, password } = formData;
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }
    setIsSubmitting(true);
    login({ email, password })
      .then((res) => {
        setIsSubmitting(false);
        // server returns { token }
        if (res && res.token) {
          try {
            // Login successful, save the token for the user
            // relate back to api.js change localStorage
            localStorage.setItem("jwt", res.token);
          } catch (e) {
            void e;
          }
          if (typeof onLogin === "function") onLogin(res.token);
          onClose && onClose();
          // navigate to protected route after successful login
          navigate("/"); // Adjust the path as needed
        } else {
          setError("Login succeeded but token missing.");
        }
      })
      .catch((err) => {
        setIsSubmitting(false);
        console.error("Login error:", err);
        // Try to show more detailed error
        if (err && err.json) {
          err
            .json()
            .then((errorData) => {
              setError(errorData.message || "Login failed. Please try again.");
            })
            .catch(() => {
              setError("Login failed. Please check your credentials.");
            });
        } else {
          setError("Login failed. Please check your credentials.");
        }
      });
  }

  const isSubmitDisabled =
    !formData.email.trim() || !formData.password || isSubmitting;

  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
        <div className="modal__content modal__content_type_login">
          <h2 className="modal__title">Log In</h2>

          <button
            onClick={onClose}
            type="button"
            className="modal__close-icon modal__close-icon_type_login"
          >
            ✕
          </button>
          <form onSubmit={handleSubmit} className="modal__form">
            <label className="modal__label">
              Email
              <input
                className="modal__label_account_info modal__input_text"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label className="modal__label">
              Password
              <input
                className="modal__label_account_info modal__input_text"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
            {error && <div className="modal__error">{error}</div>}
            <div className="login-modal__actions">
              <button
                type="submit"
                className="login-modal__submit"
                disabled={isSubmitDisabled}
              >
                Log In
              </button>
              <button
                type="button"
                className="login-modal__switch"
                onClick={onSignupClick}
              >
                or Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
