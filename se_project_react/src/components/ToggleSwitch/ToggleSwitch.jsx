import React, { useContext } from "react";
import "./ToggleSwitch.css";
import currentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

export default function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    currentTemperatureUnitContext
  );
  return (
    <label className="toggle__switch">
      <input
        type="checkbox"
        id="toggle__switch"
        className="toggle-checkbox"
        checked={currentTemperatureUnit === "F"}
        onChange={handleToggleSwitchChange}
      />

      <span className="toggle-slider-circle"></span>
      <span className="toggle-switch-text toggle-switch-text-F">F </span>
      <span className="toggle-switch-text toggle-switch-text-C">C</span>
    </label>
  );
}
export { ToggleSwitch };
