import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { register, login, checkToken } from "../../utils/auth";
import * as api from "../../utils/api";
import * as auth from "../../utils/auth";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile";
import "./App.css";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import ItemModal from "../ItemModal/ItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { getItems, postItem, deleteItem, updateUser } from "../../utils/api";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    condition: "",
    isDay: false,
    city: "",
  });

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  /*currentUser = {
    name: "Terrence Tegegne",
    avatar: "https://via.placeholder.com/40x40/cccccc/ffffff?text=TT",
  };*/

  // Toggle temperature unit
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };
  const safeSetClothingItems = (updater) => {
    setClothingItems((prev) => {
      const updated = typeof updater === "function" ? updater(prev) : updater;
      return updated.filter(Boolean);
    });
  };

  // Modal handlers
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    postItem({ name, imageUrl, weather }, token)
      .then((item) => {
        safeSetClothingItems((prev) => [item, ...prev]);
        closeActiveModal();
      })
      .catch((err) => console.error("Add item error:", err));
  };
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        api
          // the first argument is the card's id
          .addCardLike(id, token)
          .then((updatedCard) => {
            safeSetClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        api
          // the first argument is the card's id
          .removeCardLike(id, token)
          .then((updatedCard) => {
            safeSetClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleCardClick = (card) => {
    console.log("Opening preview modal for:", card);
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleDeleteClick = (card) => {
    console.log("Delete clicked for:", card);
    setActiveModal("delete-confirmation");
    setItemToDelete(card);
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setClothingItems([]);

    setCurrentUser(null);
    navigate("/");
  };

  const handleSignIn = () => {
    setLoginOpen(true);
    setActiveModal("signin");
  };

  const handleSignUp = () => {
    setRegisterOpen(true);
    setActiveModal("signup");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard({});
    setItemToDelete(null);
  };

  // Add item function
  const onAddItem = (inputValues) => {
    setIsLoading(true);
    console.log("Adding item:", inputValues);

    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("Please log in to add items.");
      setIsLoading(false);
      return;
    }

    postItem(inputValues, token)
      .then((addedItem) => {
        console.log("Item added successfully:", addedItem);
        safeSetClothingItems((prev) => [addedItem, ...prev]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
        if (error.includes("400")) {
          alert("Invalid item data. Please check all fields.");
        } else if (error.includes("401")) {
          alert("Session expired. Please log in again.");
        } else {
          alert("Failed to add item. Please try again.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Update user function
  const handleUpdateUser = (userData) => {
    setIsLoading(true);
    updateUser(userData.name, userData.avatar, localStorage.getItem("jwt"))
      .then((updatedUser) => {
        console.log("User updated successfully:", updatedUser);
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        alert("Failed to update profile. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Delete confirmation function
  const handleConfirmDelete = () => {
    if (!itemToDelete) return;

    setIsLoading(true);
    const itemId = itemToDelete.id || itemToDelete._id;

    console.log("Deleting item with ID:", itemId);

    deleteItem(itemId, localStorage.getItem("jwt"))
      .then(() => {
        console.log("Item deleted successfully");
        safeSetClothingItems((items) =>
          items.filter((item) => (item.id || item._id) !== itemId)
        );
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        alert("Failed to delete item. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleRegister = (data) => {
    register(data)
      .then((res) => {
        console.log("Registration successful:", res);
        closeActiveModal();
        setActiveModal("signin");
        setLoginOpen(true);
        setRegisterOpen(false);
      })
      .catch((err) => {
        console.error("Registration error:", err);
        // Try to get more detailed error information
        if (err.json) {
          err
            .json()
            .then((errorData) => {
              alert(
                errorData.message || "Registration failed. Please try again."
              );
            })
            .catch(() => {
              alert("Registration failed. Please try again.");
            });
        } else {
          alert(
            "Registration failed. Please check your connection and try again."
          );
        }
      });
  };

  const handleLogin = (data) => {
    login(data)
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          setLoginOpen(false);
          console.log("Login successful:", res);
        } else {
          alert("Login succeeded but token missing.");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        alert("Login failed. Please try again.");
      });
  };

  const handleAuthLogin = (token) => {
    return api
      .getUserData(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeActiveModal();
        console.log("User data loaded:", userData);
      })
      .catch((err) => {
        console.error("Error loading user data:", err);
        alert("Failed to load user data. Please try again.");
      });
  };

  // Load initial data
  useEffect(() => {
    setIsLoading(true);

    // Load weather data
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
        console.log("Weather data loaded:", filteredData);
      })
      .catch((error) => {
        console.error("Weather fetch error:", error);
        setWeatherData({
          type: "hot",
          temp: { F: 75, C: 24 },
          condition: "sunny",
          isDay: true,
          city: "New York",
        });
      });

    // Load clothing items
    getItems()
      .then((items) => {
        console.log("Items fetched:", items);
        setClothingItems(items);
      })
      .catch((error) => {
        console.log("Error fetching items:", error);
        setClothingItems(defaultClothingItems);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // Check for existing token
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          console.log("Token valid, user data:", userData);
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token check error:", err);
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              currentUser={currentUser}
              isLoggedIn={isLoggedIn}
              handleSignIn={handleSignIn}
              handleSignUp={handleSignUp}
              handleSignOut={handleSignOut}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onDeleteClick={handleDeleteClick}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      currentUser={currentUser}
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      onDeleteClick={handleDeleteClick}
                      onEditProfile={handleEditProfileClick}
                      onSignOut={handleSignOut}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>

          {/* Modals */}
          <AddItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
            isLoading={isLoading}
          />

          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteClick={handleDeleteClick}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />

          <DeleteConfirmationModal
            isOpen={activeModal === "delete-confirmation"}
            onClose={closeActiveModal}
            onConfirm={handleConfirmDelete}
            itemName={itemToDelete?.name}
            isLoading={isLoading}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

          <RegisterModal
            isOpen={activeModal === "signup"}
            activeModal={activeModal}
            onClose={closeActiveModal}
            setIsLoggedIn={setIsLoggedIn}
            onAuthLogin={handleAuthLogin}
            setActiveModal={setActiveModal}
            onRegisterModalSubmit={handleRegister}
          />
          <LoginModal
            isOpen={activeModal === "signin"}
            activeModal={activeModal}
            onClose={closeActiveModal}
            onLogin={handleAuthLogin}
            setActiveModal={setActiveModal}
            onSignupClick={handleSignUp}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
