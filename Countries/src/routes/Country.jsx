import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import "./Country.css";

const CountryDetails = () => {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    const getCountryDetails = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/alpha/${countryCode}`
        );
        setCountry(response.data[0]);

        if (response.data[0].borders) {
          const borders = await Promise.all(
            response.data[0].borders.map(async (border) => {
              const borderResponse = await axios.get(
                `https://restcountries.com/v3.1/alpha/${border}`
              );
              return borderResponse.data[0].name.common;
            })
          );
          setBorderCountries(borders);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCountryDetails();
  }, [countryCode]);

  if (!country) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="back_btn">
        <Link to={"/"}>
          <i className="fa-solid fa-arrow-left"></i>
          Back
        </Link>
      </div>
      <div className="show_country">
        <div className="show_country_flag">
          <img src={country.flags.svg} alt={`${country.name.common} flag`} />
        </div>
        <div className="info_box_container">
          <div className="info_box">
            <div className="show_country_info">
              <h1>{country.name.common}</h1>
              <p><b>Native Name:</b> {country.name.nativeName ? Object.values(country.name.nativeName)[0].common : "N/A"}</p>
              <p><b>Population:</b> {country.population.toLocaleString()}</p>
              <p><b>Region:</b> {country.region}</p>
              <p><b>Sub Region:</b> {country.subregion}</p>
              <p><b>Capital:</b> {country.capital.join(", ")}</p>
            </div>
            <div className="show_other_info">
              <p><b>Top Level Domain:</b> {country.tld.join(", ")}</p>
              <p><b>Currencies:</b> {Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(", ")}</p>
              <p><b>Languages:</b> {Object.values(country.languages).join(", ")}</p>
            </div>
          </div>
          <div className="show_country_borders">
            <p><b>Border Countries:</b></p>
            <div className="borders_container">
              {borderCountries.length > 0 ? (
                borderCountries.map((borderCountry, index) => (
                  <span key={index} className="border_country_box">
                    {borderCountry}
                  </span>
                ))
              ) : (
                <span>None</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;