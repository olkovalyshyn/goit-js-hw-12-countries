import "./css/styles.css";
import countryCardTpl from "./templates/country-card.hbs";
import API from "./js/api-service.js";
import getRefs from "./js/get-refs";

const debounce = require("lodash.debounce");

const refs = getRefs();

refs.searchCountry.addEventListener("input", debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  // const searchQuery = form.value;
  //   const searchQuery = form.currentTarget.elements.query.value;
  const searchQuery = document.getElementsByClassName("js-form-enter")[0].value;

  API.fetchCountry(searchQuery).then(renderCountryCard).catch(fetchError);
}

// console.log("!!!fetchCountry", fetchCountry);

function renderCountryCard(country) {
  const markup = countryCardTpl(country[0]);
  //   console.log("markup!!!!!", markup);
  //   console.log("country[0]!!!!!!!", country[0]);
  //   console.log("country!!!!!!!", country);
  refs.cardContainer.innerHTML = markup;
}

function fetchError(error) {
  console.log("Якась халепа!");
}
