
// Variables used in the fields: "Departure Date" and "Arrival Date".

let today = new Date().toISOString().substring(0, 10);

let arrivalDate = "";

// Variables user for the class "search_result"

let indexSelected;

var dataAPIGeonames;

var dataAPIWheaterbit;

var countryName;

const totalResultsCount = "";    

// 1. Field "Departure Date": selection rules

// 1.1 Limits the departure date to at least the date of the day.

document.getElementById("search_departure_date").setAttribute('min', today);

// 1.2 Disables the field for keyboard use.

document.getElementById("search_departure_date").setAttribute('onkeydown', "return false");

/* 1.3 Rules for the line below:

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

// 2. Field "Arrival Date": selection rules

// 2.1 Limits the departure date to at least the date of the day.

document.getElementById("search_arrival_date").setAttribute('min', today);

// 2.2 Disables the field for keyboard use.

document.getElementById("search_arrival_date").setAttribute('onkeydown', "return false");

/* 2.3 The value of the "Arrival date" field will be equal to or greater than the "Departure date" 
   field, if the latter has been filled in.

*/

document.getElementById("search_arrival_date").addEventListener('click', function() {

    if ((document.getElementById("search_departure_date").value >= arrivalDate) &&
       (document.getElementById("search_departure_date").value != "")) {
        document.getElementById("search_arrival_date").setAttribute('min', document.getElementById("search_departure_date").value);
    }
});

// 3 Rules for class "search_result"

// 3.1 TODO: disable class "search_result".

document.getElementsByClassName("search_result")[0].style.visibility='hidden';

// 4 Rules for button "Search"

// The rules for the line bellow will be described inside the function "visiblePage".

document.getElementById('search').addEventListener('click', visiblePage);

// 3.10 TODO: Run the API Pixabay

document.getElementById("destiny_result").addEventListener('change', function() {

}, false);

// TODO: Routines executed to fill in the fields of the "search_result" class.

function visiblePage(){

    // Checks if the user has entered all fields.

    if (document.getElementById("search_destiny").value == ''){

        alert('Please, enter a valid destination.');

    } else if (document.getElementById("search_departure_date").value == "") {
      
        alert('Please, enter a departure date.');
        
    } else if (document.getElementById("search_arrival_date").value == "") {
        
        alert('Please, enter a arrival date.');

    } else {
        
        // Mount the URL that will be passed as a parameter in the function "getDataApi".

        let search_destiny = encodeURIComponent(document.getElementById("search_destiny").value);

        // Depois de configurar o servidor, altera o username para ${process.env.userName}`

        let urlAPIGeonames = `http://api.geonames.org/searchJSON?q=${search_destiny}&featureClass=P&featureCode=PPL&countryCode=US&maxRows=20&orderby=name&cities=cities500&username=michelrvieira`;
        
        // TODO: Run the API Geonames.

        getDataApiGeonames(urlAPIGeonames)

        .then(function(dataAPIGeonames){
        
            // Checks if the api returned any value for the typed destination.

            if (dataAPIGeonames.totalResultsCount == 0) {

                alert('Destiny not found. Please, inform a valid destiny.');

            } else if (dataAPIGeonames.totalResultsCount >= 1) {

                // TODO: visible class "search_result".

                document.getElementsByClassName("search_result")[0].style.visibility='visible';

                // TODO: Fill the "Destiny" field with the values returned by the API

                const selectFragment = document.createDocumentFragment();

                for (let i = 0; i < dataAPIGeonames.geonames.length; i++) {
                    
                    const option = document.createElement('option');

                    option.setAttribute('id', `${i}`);
                    option.setAttribute('value', `${dataAPIGeonames.geonames[i].name}`);

                    if (i == 0) {
                        option.setAttribute('selected', "true");
                    }

                    option.textContent = `${dataAPIGeonames.geonames[i].name}, ${dataAPIGeonames.geonames[i].countryCode}`;

                    selectFragment.appendChild(option); 

                }
    
                // TODO: adds the anchor elements created in the 'select' tag.

                const selectTarget = document.querySelector('select');

                selectTarget.appendChild(selectFragment);

            }        

            // TODO: Run the API Pixabay - Returns by default the image of the first element of the select.

            displayImage();
            weatherForecast();
            
        });
    
    }
    
    // XXXX Fill in the "Departure Date" and "Arrival Date" fields.

    document.getElementById("departure_date_result").value = document.getElementById("search_departure_date").value;

    document.getElementById("arrival_date_result").value = document.getElementById("search_arrival_date").value;
   
    // XXX TODO: Calculates the duration of the trip.

    const dtDiff = Math.round(Math.abs((new Date(document.getElementById("arrival_date_result").value).getTime() - new Date(document.getElementById("departure_date_result").value).getTime()) / (1000 * 3600 * 24)));

    document.getElementsByTagName('p')[0].innerHTML = `<p>Travel time: ${dtDiff} days</p>`;

    

};

// TODO: Run the Geonames API

const getDataApiGeonames = async (urlAPIGeonames)=>{

    const res = await fetch(urlAPIGeonames)

    try {
  
        dataAPIGeonames = await res.json();
        
        console.log(dataAPIGeonames)
        
        return dataAPIGeonames;
        
    }  
    
    catch(error) {
      
      console.log("error", error);
      
    }
}

// TODO: Run the Pixabay API

const getDataApiPixabay = async (urlAPIPixabay)=>{

    const res = await fetch(urlAPIPixabay)

    try {
  
        const dataAPIPixabay = await res.json();
        
        return dataAPIPixabay;
        
    }  
    
    catch(error) {
      
      console.log("error", error);
      
    }
}

// TODO: Run the Wheaterbit API

const getDataApiWheaterbit = async (urlAPIWheaterbit)=>{

    const res = await fetch(urlAPIWheaterbit)

    try {
  
        const dataAPIWheaterbit = await res.json();
        
        console.log(dataAPIWheaterbit)
        
        return dataAPIWheaterbit;
        
    }  
    
    catch(error) {
      
      console.log("error", error);
      
    }
}

// TODO: Display the image returned by the Pixabay API

function displayImage() {

    let destinyPixabay = encodeURIComponent(document.getElementById("destiny_result").value.trim());

    // URL of the API Pixabay

    // Depois trocar o key pela variável do servidor.

    let urlAPIPixabay = `https://pixabay.com/api/?key=30837430-c6d554c6141da59f50e7e82d6&q=${destinyPixabay}&lang=en&image_type=photo`;

    getDataApiPixabay(urlAPIPixabay)

    .then(function(dataAPIPixabay){

        // If the API does not return data, display a picture of the country, where the destination is.

        indexSelected = document.getElementById("destiny_result").selectedIndex;      

        if (dataAPIPixabay.totalHits == 0) {
        
            destinyPixabay = encodeURIComponent(dataAPIGeonames.geonames[indexSelected].countryName);

        } else {

            destinyPixabay = encodeURIComponent(dataAPIGeonames.geonames[indexSelected].name);

        }   

        urlAPIPixabay = `https://pixabay.com/api/?key=30837430-c6d554c6141da59f50e7e82d6&q=${destinyPixabay}&lang=en&image_type=photo`

        getDataApiPixabay(urlAPIPixabay)

        .then(function(dataAPIPixabay) {
                document.getElementById("destination_image").setAttribute('src', dataAPIPixabay.hits[0].webformatURL);     
        })

    })

}

// TODO: Displays the weather forecast

function weatherForecast() {
    
    // URL of the API Wheaterbit

    indexSelected = document.getElementById("destiny_result").selectedIndex;
    
    let lat = dataAPIGeonames.geonames[indexSelected].lat;
    let lng = dataAPIGeonames.geonames[indexSelected].lng;

    // Depois trocar o key pela variável do servidor.

    urlAPIWheaterbit = `https://api.weatherbit.io/v2.0/forecast/lat=${lat}&lon=${lng}&key=76efedd64bf049ba8fc84f21cef6c4aa`;   

    getDataApiWheaterbit(urlAPIWheaterbit)

};