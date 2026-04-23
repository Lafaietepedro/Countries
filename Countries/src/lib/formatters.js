const populationFormatter = new Intl.NumberFormat('en-US');
const areaFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
});

export function formatPopulation(value) {
  if (typeof value !== 'number') {
    return 'Not available';
  }

  return populationFormatter.format(value);
}

export function formatList(value) {
  if (!value || value.length === 0) {
    return 'Not available';
  }

  return value.join(', ');
}

export function formatNativeName(nativeName) {
  if (!nativeName) {
    return 'Not available';
  }

  const firstNativeName = Object.values(nativeName)[0];
  return firstNativeName?.common || 'Not available';
}

export function formatCurrencies(currencies) {
  if (!currencies) {
    return 'Not available';
  }

  const values = Object.values(currencies);
  if (values.length === 0) {
    return 'Not available';
  }

  return values
    .map(({ name, symbol }) => (symbol ? `${name} (${symbol})` : name))
    .join(', ');
}

export function formatCoordinates(latlng) {
  if (!latlng || latlng.length < 2) {
    return 'Not available';
  }

  const [latitude, longitude] = latlng;
  const latitudeDirection = latitude >= 0 ? 'N' : 'S';
  const longitudeDirection = longitude >= 0 ? 'E' : 'W';

  return `${Math.abs(latitude).toFixed(2)} ${latitudeDirection} / ${Math.abs(longitude).toFixed(2)} ${longitudeDirection}`;
}

export function formatArea(area) {
  if (typeof area !== 'number') {
    return 'Not available';
  }

  return `${areaFormatter.format(area)} sq km`;
}
