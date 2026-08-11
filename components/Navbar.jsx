import logo from "../assets/images/logo.svg";
import units from "../assets/images/icon-units.svg";
import dropdown from "../assets/images/icon-dropdown.svg";
import checkmark from "../assets/images/icon-checkmark.svg";
import { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../assets/context/WeatherContext";
import "./Navbar.css";



const Navbar = () => {

  const {toggleUnits, switchUnits, setSwitchDegrees, switchDegrees, setSwitchVelocity, switchVelocity, setSwitchPrecipitation, switchPrecipitation} = useContext(WeatherContext);

  return (
    <div className="navbar">
      <img src={logo} alt="Logo" className="logo" />
      <ul className="lista">
        <div className="units">
            <img src={units} alt="Units" />
            <h4>Units</h4>
            <img src={dropdown} alt="Dropdown"/>
          </div>
        <li>          
          <ul className="dropdownMenu">
            <button onClick={() => toggleUnits()}>Switch to {switchUnits === "Metric" ? "Imperial" : "Metric"}</button>
            <h5>Temperature</h5>
            <button onClick={() => setSwitchDegrees("celsius")} className="celsius">
              Celsius (°C)
              <img src={checkmark} alt="Checkmark" style={{display: switchDegrees === "celsius" ? "block" : "none"}} />
            </button>
            <button onClick={() => setSwitchDegrees("fahrenheit")} className="fahrenheit">
              Fahrenheit (°F)
              <img src={checkmark} alt="Checkmark" style={{display: switchDegrees === "fahrenheit" ? "block" : "none"}} />
            </button>
            <hr style={{ width: "100%" }} />
            <h5>Wind Speed</h5>
            <button onClick={() => setSwitchVelocity("kmh")} className="kmh">
              km/h
              <img src={checkmark} alt="Checkmark" style={{display: switchVelocity === "kmh" ? "block" : "none"}} />
            </button>
            <button onClick={() => setSwitchVelocity("mph")} className="mph">
              mph
              <img src={checkmark} alt="Checkmark" style={{display: switchVelocity === "mph" ? "block" : "none"}} />
            </button>
            <hr style={{ width: "100%" }} />
            <h5>Precipitation</h5>
            <button onClick={() => setSwitchPrecipitation("mm")} className="mm">
              Millimiters (mm)
              <img src={checkmark} alt="Checkmark" style={{display: switchPrecipitation === "mm" ? "block" : "none"}} />
            </button>
            <button onClick={() => setSwitchPrecipitation("inch")} className="in">
              Inches (in)
              <img src={checkmark} alt="Checkmark" style={{display: switchPrecipitation === "inch" ? "block" : "none"}} />
            </button>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
