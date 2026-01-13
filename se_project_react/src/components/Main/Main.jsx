import currentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import WeatherCard from "../WeatherCard/WeatherCard";

import ItemCard from "../ItemCard/ItemCard";
import React from "react";
import "./Main.css";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  onDeleteClick,
  onCardLike,
}) {
  const { currentTemperatureUnit } = React.useContext(
    currentTemperatureUnitContext
  );
  const filteredItems = clothingItems.filter((item) => {
    return item.weather === weatherData?.type;
  });

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData?.temp?.[currentTemperatureUnit]}
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id || item._id || item.name}
              item={item}
              onCardClick={handleCardClick}
              onDeleteClick={onDeleteClick}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
