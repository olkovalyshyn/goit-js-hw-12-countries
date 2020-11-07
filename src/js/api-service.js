function fetchCountry(countryName) {
  const BASE_URL = "https://restcountries.eu/rest/v2/name";

  return fetch(`${BASE_URL}/${countryName}`).then((response) => {
    return response.json();
  });
}

export default { fetchCountry };
