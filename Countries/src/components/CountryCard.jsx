import { Link } from 'react-router-dom';

import { formatList, formatPopulation } from '../lib/formatters';
import './CountryCard.css';

const CountryCard = ({ country }) => {
  return (
    <Link to={`/country/${country.cca3}`} className="country-card">
      <div className="country-card__flag">
        <img
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          loading="lazy"
        />
      </div>
      <div className="country-card__content">
        <div className="country-card__topline">
          <p className="country-card__serial">{country.cca3}</p>
          <p className="country-card__region">{country.region || 'Unknown region'}</p>
        </div>
        <h3>{country.name.common}</h3>
        <dl className="country-card__meta">
          <div>
            <dt>Population</dt>
            <dd>{formatPopulation(country.population)}</dd>
          </div>
          <div>
            <dt>Capital</dt>
            <dd>{formatList(country.capital)}</dd>
          </div>
        </dl>
        <p className="country-card__cta">Open country notes</p>
      </div>
    </Link>
  );
};

export default CountryCard;
