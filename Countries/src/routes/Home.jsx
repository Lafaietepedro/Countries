import { useDeferredValue, useEffect, useState } from 'react';

import CountryCard from '../components/CountryCard';
import { fetchAllCountries, isRequestCanceled } from '../lib/countriesApi';
import './Home.css';

const regionOptions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [requestKey, setRequestKey] = useState(0);

  const deferredSearchTerm = useDeferredValue(searchTerm.trim().toLowerCase());

  useEffect(() => {
    const controller = new AbortController();

    async function loadCountries() {
      setStatus('loading');
      setErrorMessage('');

      try {
        const response = await fetchAllCountries(controller.signal);
        setCountries(response);
        setStatus('success');
      } catch (error) {
        if (isRequestCanceled(error)) {
          return;
        }

        setStatus('error');
        setErrorMessage(
          'We could not load the country directory right now. Please try again in a moment.',
        );
      }
    }

    loadCountries();

    return () => controller.abort();
  }, [requestKey]);

  const filteredCountries = countries.filter((country) => {
    const matchesSearch =
      deferredSearchTerm === '' ||
      country.name.common.toLowerCase().includes(deferredSearchTerm);
    const matchesRegion =
      selectedRegion === '' || country.region === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  const isUpdatingResults =
    searchTerm.trim().toLowerCase() !== deferredSearchTerm;

  return (
    <div className="home-layout">
      <section className="hero-sheet">
        <div className="hero-sheet__copy">
          <p className="hero-panel__eyebrow">Atlas journal</p>
          <h2>Browse the world like a printed atlas left open on a travel desk.</h2>
          <p>
            This edition leans into an editorial rhythm: calmer typography,
            richer field notes and a more cartographic way to move through
            countries, regions and borders.
          </p>
          <div className="hero-panel__tags" aria-label="Atlas highlights">
            <span>Searchable archive</span>
            <span>Regional index</span>
            <span>Border notes</span>
          </div>
        </div>
        <div className="hero-sheet__footer">
          <p className="hero-panel__stats-note">
            Inspired by editorial travel layouts and atlas-style data framing,
            but translated into a browsing experience instead of a portfolio
            showcase.
          </p>
        </div>
      </section>

      <section className="summary-strip" aria-live="polite">
        <p className="summary-strip__title">Desk notes</p>
        <div className="summary-strip__items">
          <article className="summary-card">
            <span className="summary-card__label">Filed in archive</span>
            <strong className="summary-card__value">
              {status === 'success' ? countries.length : '--'}
            </strong>
          </article>
          <article className="summary-card">
            <span className="summary-card__label">Visible entries</span>
            <strong className="summary-card__value">
              {status === 'success' ? filteredCountries.length : '--'}
            </strong>
          </article>
          <article className="summary-card">
            <span className="summary-card__label">Current chapter</span>
            <strong className="summary-card__value">
              {selectedRegion || 'All'}
            </strong>
          </article>
        </div>
      </section>

      <section className="toolbar-band">
        <div className="toolbar-band__intro">
          <p className="toolbar-panel__eyebrow">Archive tools</p>
          <h3>Filter the collection</h3>
        </div>
        <div className="toolbar-band__controls">
          <div className="field-group field-group--search">
            <label htmlFor="country-search">Search country</label>
            <div className="field-shell">
              <span className="field-shell__icon" aria-hidden="true">
                IDX
              </span>
              <input
                id="country-search"
                type="search"
                placeholder="Look up a country by name"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          </div>

          <div className="field-group">
            <label htmlFor="country-region">Region</label>
            <div className="field-shell">
              <select
                id="country-region"
                value={selectedRegion}
                onChange={(event) => setSelectedRegion(event.target.value)}
              >
                <option value="">All chapters</option>
                {regionOptions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {status === 'loading' && (
        <section className="country-grid" aria-label="Loading countries">
          {Array.from({ length: 8 }).map((_, index) => (
            <article
              key={`skeleton-${index}`}
              className="country-card country-card--skeleton"
              aria-hidden="true"
            >
              <div className="country-card__flag" />
              <div className="country-card__content">
                <div className="country-card__skeleton country-card__skeleton--title" />
                <div className="country-card__skeleton" />
                <div className="country-card__skeleton" />
                <div className="country-card__skeleton country-card__skeleton--short" />
              </div>
            </article>
          ))}
        </section>
      )}

      {status === 'error' && (
        <section className="status-panel">
          <h2>Unable to load the country list</h2>
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

      {status === 'success' && filteredCountries.length === 0 && (
        <section className="status-panel">
          <h2>No country matched the current filters</h2>
          <p>
            Try another name or remove the region filter to broaden the
            results.
          </p>
        </section>
      )}

      {status === 'success' && filteredCountries.length > 0 && (
        <>
          <section className="results-banner" aria-live="polite">
            <p className="results-hint">
              {isUpdatingResults ? 'Updating the archive...' : 'Archive ready'}
            </p>
            <h3>{filteredCountries.length} entries ready for reading</h3>
            <p className="results-banner__text">
              Open any card to move from the broad catalog into a country
              dossier with borders, coordinates and administrative notes.
            </p>
          </section>
          <section className="country-grid">
            {filteredCountries.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
