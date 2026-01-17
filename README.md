WTWR (What To Wear?) — Full-Stack Application

WTWR (What To Wear?) is a full-stack web application that helps users decide what to wear based on current weather conditions. The app fetches real-time weather data and suggests appropriate clothing items from a user’s wardrobe. Users can manage their profile, add garments, and interact with clothing items through likes and deletions.

This project consists of:

* Front End: React (Vite)
* Back End: Node.js, Express, MongoDB

---

🌤️ Features

Front End

* Real-Time Weather Integration
Fetches live weather data using the OpenWeatherMap API.
* Smart Wardrobe Suggestions
Displays clothing items appropriate for current weather conditions.
* Add Garments
Modal form for adding new clothing items.
* Preview Items
Click any clothing item to preview details in a modal.
* Profile Management
Personal profile page displaying the user’s clothing collection.
* Temperature Unit Toggle
Switch between Fahrenheit and Celsius.
* Responsive UI
Clean, modern, mobile-friendly design styled with CSS.

Back End

* User Management
  * Create users
  * Retrieve all users
  * Retrieve user by ID
  * Avatar URL validation
* Clothing Item Management
  * Create new clothing items
  * Retrieve all clothing items
  * Delete items by ID
  * Like / dislike clothing items
* Data Validation
  * Weather type validation (hot, warm, cold)
  * URL validation for images and avatars
* Temporary Authorization Middleware
  * Injects a hardcoded user for development
* Robust Error Handling
  * Proper HTTP status codes and centralized error handling

---

🛠 Tech Stack

Front End

* React (with React Router)
* Vite
* React Hooks (useState, useEffect, useContext)
* CSS Modules
* OpenWeatherMap API

Back End

* Node.js
* Express.js
* MongoDB & Mongoose
* Validator (URL validation)
* ESLint

---

📁 Project Structure

Front End (se_project_react)

src/
  components/
    App/
    Header/
    Main/
    ItemCard/
    ItemModal/
    ModalWithForm/
    WeatherCard/
  utils/
    constants.js
    weatherApi.js
  assets/
    logo.svg
    ...


Back End (se_project_express)

se_project_express/
├── app.js
├── routes/
│   ├── index.js
│   ├── users.js
│   └── clothingItems.js
├── controllers/
│   ├── users.js
│   └── clothingItems.js
├── models/
│   ├── user.js
│   └── clothingItem.js
├── middlewares/
│   └── auth.js
├── utils/
│   └── errors.js
└── README.md


---

🚀 Getting Started

Prerequisites

* Node.js (v18+ recommended)
* MongoDB (local or MongoDB Compass)
* OpenWeatherMap API key

---

🔹 Front-End Setup

1. Clone the repository

git clone https://github.com/lydianoh-tech/se_project_react.git
cd se_project_react


1. Install dependencies

npm install


1. Add your OpenWeatherMap API key
  * Open src/utils/weatherApi.js
  * Replace "YOUR_API_KEY" with your actual API key
2. Start the development server

npm run dev


1. Open in browser

http://localhost:3000


Front-End Scripts

* npm run dev – Start development server
* npm run build – Build for production
* npm run preview – Preview production build

---

🔹 Back-End Setup

1. Clone the backend repository

git clone https://github.com/yourusername/wtwr-api.git
cd wtwr-api


1. Install dependencies

npm install


1. Start MongoDB
  * Ensure MongoDB is running locally or via MongoDB Compass
2. Run the server

npm run start


1. or with hot reload:

npm run dev


1. Server runs at

http://localhost:3001


1. (Uses PORT environment variable if set.)

---

🔌 API Endpoints

Users

Method	Endpoint	Description
GET	/users	Get all users
GET	/users/:userId	Get user by ID
POST	/users	Create a new user


Example POST body

{
  "name": "Jane Doe",
  "avatar": "https://example.com/avatar.png"
}


---

Clothing Items

Method	Endpoint	Description
GET	/items	Get all items
POST	/items	Create a new item
DELETE	/items/:itemId	Delete item
PUT	/items/:itemId/likes	Like item
DELETE	/items/:itemId/likes	Remove like


Example POST body

{
  "name": "Winter Jacket",
  "weather": "cold",
  "imageUrl": "https://example.com/jacket.png"
}


---


This enables:

* Assigning owners to clothing items
* Liking and unliking items
* Deleting owned items

---

🧪 Testing with Postman

1. Create a user using POST /users
2. Copy the returned _id
3. Paste it into the temporary auth middleware
4. Test item creation, likes, deletes, and retrieval

---

🛡 Error Handling

Status Code	Meaning
400	Validation error / invalid ObjectId
404	User, item, or route not found
500	Server error


* Uses .orFail() to handle missing documents
* Centralized error handler in app.js

---

🧹 Linting

Run ESLint:

npm run lint


Auto-fix issues:

npm run lint -- --fix


---

🌍 Live Demo



---

👩‍💻 Author

Created by Lydia Noh
Inspired by the Around the U.S. project.


https://github.com/lydianoh-tech/Full-stack-/tree/main/se_project_express
https://github.com/lydianoh-tech/Full-stack-/tree/main/se_project_react
