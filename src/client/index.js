// 1. Import the functions and styles used in the application.

// import { visiblePage } from './js/visiblePage'
// import { displayImage } from './js/displayImage'
// import { weatherForecast } from './js/weatherForecast'

import './styles/style.scss'

// 2. Export the functions used in the application.

/*export {
    visiblePage,
    displayImage,
    weatherForecast
}*/

// 3. Rules for displaying the home page.

// 3.1. Variables used in the fields: "Departure Date" and "Arrival Date".

let today = new Date().toISOString().substring(0, 10);

let arrivalDate = "";

// 4. Field "Departure Date": selection rules

// 4.1 Limits the departure date to at least the date of the day.

document.getElementById("search_departure_date").setAttribute('min', today);

// 4.2 Disables the field for keyboard use.

document.getElementById("search_departure_date").setAttribute('onkeydown', "return false");

/* 4.3 Rules for the line below:

    - If the user selects the current day's date in the "Arrival date" field, and the "Departure date" 
    field is empty, the latter will receive the value of the "Arrival date" field.

    - If the "Arrival date" field has a value and the "Departure date" field has no value, the latter 
    must have a value equal to or greater than the current date and less than or equal to the 
    field "Arrival date". 

*/

document.getElementById("search_departure_date").addEventListener('click', function() {

    arrivalDate = document.getElementById("search_arrival_date").value;
    if (arrivalDate == today) {
        document.getElementById("search_departure_date").setAttribute('min', today);
        document.getElementById("search_departure_date").setAttribute('max', today);
        document.getElementById("search_departure_date").value = today;
    } else if (arrivalDate > today) {
        document.getElementById("search_departure_date").setAttribute('min', today);
        document.getElementById("search_departure_date").setAttribute('max', arrivalDate);
    }
    
});

// 5. Field "Arrival Date": selection rules

// 5.1 Limits the departure date to at least the date of the day.

document.getElementById("search_arrival_date").setAttribute('min', today);

// 5.2 Disables the field for keyboard use.

document.getElementById("search_arrival_date").setAttribute('onkeydown', "return false");

/* 5.3 The value of the "Arrival date" field will be equal to or greater than the "Departure date" 
   field, if the latter has been filled in.

*/

document.getElementById("search_arrival_date").addEventListener('click', function() {

    if ((document.getElementById("search_departure_date").value >= arrivalDate) &&
       (document.getElementById("search_departure_date").value != "")) {
        document.getElementById("search_arrival_date").setAttribute('min', document.getElementById("search_departure_date").value);
    }
});

// 6 Rules for class "search_result"

// 6.1 TODO: disable class "search_result".

document.getElementsByClassName("search_result")[0].style.visibility='hidden';