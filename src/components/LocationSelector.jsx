import { useEffect, useState } from "react";
import "./LocationSelector.css";

export default function LocationSelector() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    fetch("https://location-selector.labs.crio.do/countries")
      .then(res => res.json())
      .then(data => setCountries(data));
  }, []);

  useEffect(() => {
    if (!country) return;

    setState("");
    setCity("");
    setStates([]);
    setCities([]);

    fetch(`https://location-selector.labs.crio.do/country=${country}/states`)
      .then(res => res.json())
      .then(data => setStates(data));
  }, [country]);

  useEffect(() => {
    if (!state) return;

    setCity("");
    setCities([]);

    fetch(
      `https://location-selector.labs.crio.do/country=${country}/state=${state}/cities`
    )
      .then(res => res.json())
      .then(data => setCities(data));
  }, [state, country]);

  return (
    <div className="container">
      <h1 className="title">Select Location</h1>

      <div className="dropdown-row">
        <select
          className="dropdown"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">Select Country</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          className="dropdown"
          value={state}
          disabled={!country}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          className="dropdown"
          value={city}
          disabled={!state}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Select City</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {city && (
        <p className="result">
          You selected <span>{city}</span>, {state}, {country}
        </p>
      )}
    </div>
  );
}
