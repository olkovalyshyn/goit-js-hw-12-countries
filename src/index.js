import "./css/styles.css";
import countryCardTpl from "./templates/country-card.hbs";

const cardContainer = document.querySelector('.js-card-container')



fetch('https://restcountries.eu/rest/v2/name/Ukraine')
    .then(response => {
    return response.json()})
    .then(country => {
        const markup = countryCardTpl(country);
        console.log(markup);
        cardContainer.insertAdjacentHTML('beforeend', markup);
    })
    .catch(error => {
        console.log(error)
    });
