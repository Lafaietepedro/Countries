import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  fetchCountriesByCodes,
  fetchCountryByCode,
  isRequestCanceled,
} from '../lib/countriesApi';
import {
  formatArea,
  formatCoordinates,
  formatCurrencies,
  formatList,
  formatNativeName,
  formatPopulation,
} from '../lib/formatters';
import './Country.css';

const CountryDetails = () => {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [requestKey, setRequestKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function getCountryDetails() {
      setStatus('loading');
      setErrorMessage('');
      setCountry(null);
      setBorderCountries([]);

      try {
        const countryResponse = await fetchCountryByCode(
          countryCode,
          controller.signal,
        );

        if (!countryResponse) {
          throw new Error('Country not found.');
        }

        setCountry(countryResponse);

        if (countryResponse.borders?.length) {
          const borderResponse = await fetchCountriesByCodes(
            countryResponse.borders,
            controller.signal,
          );
          setBorderCountries(borderResponse);
        }

        setStatus('success');
      } catch (error) {
        if (isRequestCanceled(error)) {
          return;
        }

        setStatus('error');
        setErrorMessage(
          'We could not load this country profile right now. Please try again.',
        );
      }
    }

    getCountryDetails();

    return () => controller.abort();
  }, [countryCode, requestKey]);

  return (
    <div className="country-page">
      <Link className="back-link" to="/">
        <span aria-hidden="true">{'<'}</span>
        <span>Back to directory</span>
      </Link>

      {status === 'loading' && (
        <section className="status-panel">
          <h2>Loading country profile</h2>
          <p>Fetching the latest details and neighboring countries.</p>
        </section>
      )}

      {status === 'error' && (
        <section className="status-panel">
          <h2>Country profile unavailable</h2>
          <p>{errorMessage}</p>
          <div className="status-panel__actions">
            <button
              type="button"
              className="button-secondary"
              onClick={() => setRequestKey((currentKey) => currentKey + 1)}
            >
              Try again
            </button>
          </div>
        </section>
      )}

      {status === 'success' && country && (
        <section className="country-sheet">
          <div className="country-flag-panel">
            <img
              src={country.flags.svg}
              alt={`${country.name.common} flag`}
              loading="eager"
            />
          </div>

          <article className="country-content">
            <div className="country-content__header">
              <p className="country-content__eyebrow">
                {country.region || 'Country profile'}
              </p>
              <h1>{country.name.common}</h1>
              <p className="country-content__subtitle">
                {country.name.official}
              </p>
              <div className="country-badges">
                <span>{formatCoordinates(country.latlng)}</span>
                <span>{country.subregion || 'Subregion unavailable'}</span>
                <span>{formatList(country.capital)}</span>
              </div>
            </div>

            <section className="detail-card detail-card--full">
              <h2>Overview</h2>
              <dl className="info-list info-list--split">
                <div>
                  <dt>Native name</dt>
                  <dd>{formatNativeName(country.name.nativeName)}</dd>
                </div>
                <div>
                  <dt>Population</dt>
                  <dd>{formatPopulation(country.population)}</dd>
                </div>
                <div>
                  <dt>Region</dt>
                  <dd>{country.region || 'Not available'}</dd>
                </div>
                <div>
                  <dt>Capital</dt>
                  <dd>{formatList(country.capital)}</dd>
                </div>
              </dl>
            </section>

            <section className="detail-card detail-card--full">
              <h2>Administrative notes</h2>
              <dl className="info-list info-list--split">
                <div>
                  <dt>Top-level domain</dt>
                  <dd>{formatList(country.tld)}</dd>
                </div>
                <div>
                  <dt>Currencies</dt>
                  <dd>{formatCurrencies(country.currencies)}</dd>
                </div>
                <div>
                  <dt>Languages</dt>
                  <dd>{formatList(country.languages && Object.values(country.languages))}</dd>
                </div>
                <div>
                  <dt>Country code</dt>
                  <dd>{country.cca3}</dd>
                </div>
              </dl>
            </section>

            <section className="detail-card detail-card--full">
              <h2>Cartography</h2>
              <dl className="info-list info-list--split">
                <div>
                  <dt>Coordinates</dt>
                  <dd>{formatCoordinates(country.latlng)}</dd>
                </div>
                <div>
                  <dt>Continents</dt>
                  <dd>{formatList(country.continents)}</dd>
                </div>
                <div>
                  <dt>Area</dt>
                  <dd>{formatArea(country.area)}</dd>
                </div>
                <div>
                  <dt>Atlas reference</dt>
                  <dd>
                    {country.cca3}-
                    {country.region?.slice(0, 2).toUpperCase() || 'NA'}
                  </dd>
                </div>
              </dl>
            </section>

            <section className="detail-card detail-card--full">
              <h2>Border countries</h2>
              {borderCountries.length > 0 ? (
                <div className="border-links">
                  {borderCountries.map((borderCountry) => (
                    <Link
                      key={borderCountry.cca3}
                      to={`/country/${borderCountry.cca3}`}
                      className="border-link"
                    >
                      {borderCountry.name.common}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="detail-card__empty">
                  This country does not share borders listed by the API.
                </p>
              )}
            </section>
          </article>
        </section>
      )}
    </div>
  );
};

export default CountryDetails;
