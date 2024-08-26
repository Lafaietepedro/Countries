import axios from "axios";

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import "./Home.css";

const Home = () => {
  const [flags, setFlags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const getFlags = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");

      const data = response.data;

      setFlags(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFlags();
  }, []);

  const filteredFlags = flags.filter((flag) => {
    return (
      flag.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRegion ? flag.region === selectedRegion : true)
    );
  });

  return (
    <div>
      <div className="controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter">
          <select
            className="dropdown"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
          <i className="fas fa-caret-down"></i>
        </div>
      </div>
      <div className="country_grid">
        {flags.length === 0 ? (
          <p>Loading...</p>
        ) : (
          filteredFlags.map((flag) => (
            <Link
              to={`/country/${flag.cca3}`}
              key={flag.cca3}
              className="country_box"
            >
              <div className="flag_box">
                <img src={flag.flags.svg} alt={`${flag.name.common} flag`} />
              </div>
              <div className="country_info">
                <h2>{flag.name.common}</h2>
                <p>
                  <b>Population:</b> {flag.population.toLocaleString()}
                </p>
                <p>
                  <b>Region:</b> {flag.region}
                </p>
                <p>
                  <b>Capital</b>: {flag.capital}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
