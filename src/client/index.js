// 1. Samesite cookie setting

document.cookie = 'cookie2=value2; SameSite=None; Secure';

// 2. Import the functions and styles used in the application.

import { visiblePage } from './js/visiblePage'
import { getDataApiGeonames } from './js/getDataApiGeonames'
import { displayImage } from './js/displayImage'
import { getDataApiPixabay } from './js/getDataApiPixabay'
import { weatherForecast } from './js/weatherForecast'

import { dataAPIGeonames } from './js/getDataApiGeonames.js';

// // import { weatherForecast } from './js/weatherForecast'

import './styles/style.scss'

// 3. Export the functions used in the application.

export  {
      visiblePage,
      getDataApiGeonames,
      displayImage,
      getDataApiPixabay,
      weatherForecast
}

// 4. Rules for displaying the home page.

// 4.1. Variables used in the fields: "Departure Date" and "Arrival Date".

let today = new Date().toISOString().substring(0, 10);

let arrivalDate = "";

// 5. Field "Departure Date": selection rules

// 5.1. Limits the departure date to at least the date of the day.

document.getElementById("search_departure_date").setAttribute('min', today);

// 5.2. Disables the field for keyboard use.

document.getElementById("search_departure_date").setAttribute('onkeydown', "return false");

/* 5.3. Rules for the line below:

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

// 6. Field "Arrival Date": selection rules

// 6.1. Limits the departure date to at least the date of the day.

document.getElementById("search_arrival_date").setAttribute('min', today);

// 6.2. Disables the field for keyboard use.

document.getElementById("search_arrival_date").setAttribute('onkeydown', "return false");

/* 6.3. The value of the "Arrival date" field will be equal to or greater than the "Departure date" 
   field, if the latter has been filled in.

*/

document.getElementById("search_arrival_date").addEventListener('click', function() {

    if ((document.getElementById("search_departure_date").value >= arrivalDate) &&
       (document.getElementById("search_departure_date").value != "")) {
        document.getElementById("search_arrival_date").setAttribute('min', document.getElementById("search_departure_date").value);
    }
});

// 7. TODO: Disable class "search_result".

document.getElementsByClassName("search_result")[0].style.visibility='hidden';

document.getElementById('destiny_result').addEventListener('change', ()=> {
    Client.displayImage(dataAPIGeonames)
    Client.weatherForecast(dataAPIGeonames)
});

// 8. TODO: Actions performed by clicking on the button

document.getElementById('new_search').addEventListener('click', ()=> {

    // 8.1. TODO: Hides class "search_result"

    document.getElementsByClassName("search_result")[0].style.visibility='hidden';

    // 8.2. TODO: Enable elements from class "search_travel" 

    document.getElementById('search_destiny').disabled = false;

    document.getElementById('search_departure_date').disabled = false;

    document.getElementById('search_departure_date').value = "";

    document.getElementById('search_arrival_date').disabled = false;

    document.getElementById('search_arrival_date').value = "";

    document.getElementById('search').disabled = false;

    // 8.3. TODO: Delete the values in tag "select"

    const selectTag = document.getElementById('destiny_result')

    while (selectTag.hasChildNodes()) {
        selectTag.removeChild(selectTag.firstChild)
    }

    // 8.4 TODO: Clears "search_result" class elements

    document.getElementById('destination_image').setAttribute('src', '');

    document.getElementById('departure_date_result').value = "";

    document.getElementById('arrival_date_result').value = "";

    document.getElementsByTagName('p')[0].textContent = "";

    document.getElementsByTagName('textarea')[0].textContent = "";

})