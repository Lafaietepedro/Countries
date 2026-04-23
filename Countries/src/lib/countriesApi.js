const API_BASE_URL = 'https://restcountries.com/v3.1';

const listFields = ['name', 'cca3', 'flags', 'population', 'region', 'capital'];
const detailFields = [
  'name',
  'cca3',
  'flags',
  'population',
  'region',
  'continents',
  'subregion',
  'capital',
  'tld',
  'currencies',
  'languages',
  'borders',
  'latlng',
  'area',
];

function sortByCountryName(leftCountry, rightCountry) {
  return leftCountry.name.common.localeCompare(rightCountry.name.common);
}

async function requestCountries(pathname, params, signal) {
  const url = new URL(`${API_BASE_URL}${pathname}`);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Countries API request failed with status ${response.status}`);
  }

  return response.json();
}

export async function fetchAllCountries(signal) {
  const response = await requestCountries(
    '/all',
    { fields: listFields.join(',') },
    signal,
  );

  return [...response].sort(sortByCountryName);
}

export async function fetchCountryByCode(countryCode, signal) {
  const response = await requestCountries(
    `/alpha/${countryCode}`,
    { fields: detailFields.join(',') },
    signal,
  );

  return response[0] ?? null;
}

export async function fetchCountriesByCodes(codes, signal) {
  if (!codes?.length) {
    return [];
  }

  const response = await requestCountries(
    '/alpha',
    {
      codes: codes.join(','),
      fields: ['name', 'cca3'].join(','),
    },
    signal,
  );

  return [...response].sort(sortByCountryName);
}

export function isRequestCanceled(error) {
  return error?.name === 'AbortError';
}
