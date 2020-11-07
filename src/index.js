import "./css/styles.css";
import countryCardTpl from "./templates/country-card.hbs";
import countriesListCardTpl from "./templates/countries-list-card.hbs";
import API from "./js/fetchCountries.js";
import getRefs from "./js/get-refs";
import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
const debounce = require("lodash.debounce");

const refs = getRefs();

refs.searchCountry.addEventListener("input", debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  // const searchQuery = form.value;
  //   const searchQuery = form.currentTarget.elements.query.value;
  const searchQuery = document.getElementsByClassName("js-form-enter")[0].value;

  API.fetchCountries(searchQuery).then(auditCountriesConditions).catch(fetchError);
}

// console.log("!!!fetchCountry", fetchCountry);

function renderCard(template, country) {
  const markup = template(country);
  //   console.log("markup!!!!!", markup);
  //   console.log("country[0]!!!!!!!", country[0]);
  //   console.log("country!!!!!!!", country);
  refs.cardContainer.innerHTML = markup;
}

function fetchError(error) {
  console.log("Якась халепа!");
}

function onErrorEnterCountryTooMany() {
  error({
    text: "To many matches found. Please enter a more specific query!",
    delay: 2000,
  });
}

function auditCountriesConditions(country) {
  if (country.length > 10) {
    // cleanFieldSearch();
    onErrorEnterCountryTooMany();
  } else if (country.length > 1 && country.length < 11) {
    renderCard(countriesListCardTpl, country);
  } else if (country.length === 1) {
    renderCard(countryCardTpl, country[0]);
  }
}
