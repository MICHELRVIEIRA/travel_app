// Variables used for the class "search_destiny"

var destiny;

var urlGeonames;

const totalResultsCount = "";    

// Variable used in the fields: "Departure Date" and "Arrival Date".

let today = new Date().toISOString().substring(0, 10);

let arrivalDate = "";

// 1. Field "Departure Date": selection rules

// 1.1 Limits the departure date to at least the date of the day.

document.getElementById("search_departure_date").setAttribute('min', today);

// 1.2 Disables the field for keyboard use.

document.getElementById("search_departure_date").setAttribute('onkeydown', "return false");

/* 1.3 If the user selects the current day's date in the "Arrival date" field, 
    and the "Departure date" field is empty, the latter will receive the value of the 
    "Arrival date" field. */

/* 1.4. If the "Arrival date" field has a value and the "Departure date" field has no value,
        the latter must have a value equal to or greater than the current date and less than 
        or equal to the field "Arrival date". */

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

/* 2.3 The value of the "Arrival date" field will be equal to or greater than the 
    "Departure date" field, if the latter has been filled in.*/

document.getElementById("search_arrival_date").addEventListener('click', function() {

    if ((document.getElementById("search_departure_date").value >= arrivalDate) &&
       (document.getElementById("search_departure_date").value != "")) {
        document.getElementById("search_arrival_date").setAttribute('min', document.getElementById("search_departure_date").value);
    }
});


// Exemplo de usar o UTF-8: 

// http://api.geonames.org/searchJSON?maxRows=20&username=frames&featureClass=A&featureClass=P&featureClass=L&orderby=population&

// 3. Rules for class "search_result"

// 3.1 TODO: disable class "search_result"

document.getElementsByClassName("search_result")[0].style.visibility='hidden';

document.getElementById('search').addEventListener('click', visiblePage);

function visiblePage(){

    // 3.2 Checks if the user has entered a destination

    if (document.getElementById("search_destiny").value == ''){

        alert('Please, enter a valid destination.');

    } else {

        // 3.3 Mount the URL that will be passed as a parameter in the function "getDataApi"

        destiny = encodeURIComponent(document.getElementById("search_destiny").value);

        //// Depois de configurar o servidor, altera o username para ${process.env.userName}`

        urlGeonames = `http://api.geonames.org/searchJSON?q=${destiny}&featureClass=P&featureCode=PPL&countryCode=US&maxRows=20&orderby=name&cities=cities500&username=michelrvieira`;

        // 3.4 TODO: Run the API Geonames

        getDataApi(urlGeonames)

        .then(function(data){
        
            // 3.5 Checks if the api returned any value for the typed destination

            if (data.totalResultsCount == 0) {

                alert('Destiny not found. Please, inform a valid destiny.');

            } else if (data.totalResultsCount == 1) {

                // 3.6 TODO: enable class "search_result"

                document.getElementsByClassName("search_result")[0].style.visibility='visible';

                // 3.7 Fill the "Destiny" field with the value returned by the api

                document.getElementById("destiny_result").value = data.geonames[2].name;

            } else if (data.totalResultsCount > 1) {

                // 3.8 TODO: enable class "search_result"

                document.getElementsByClassName("search_result")[0].style.visibility='visible';

                // 3.9 Fill the "Destiny" field with the values returned by the api

                // TODO: creates the anchor elements of the 'option' tag

                const ulFragment = document.createDocumentFragment();

                for (let i = 0; i < data.geonames.length; i++) {
                    
                    const option = document.createElement('option');
    
                    option.innerHTML = `<option id="${i}" value="${data.geonames[i].name}">${data.geonames[i].name}, ${data.geonames[i].countryCode}</option>`;

                    ulFragment.appendChild(option); 

                }
    
                // TODO: adds the anchor elements created in the 'ul' tag

                const ulTarget = document.querySelector('select');

                ulTarget.appendChild(ulFragment);

            }        
        
        });
    
    };
   
};

const getDataApi = async (urlGeonames)=>{

    const res = await fetch(urlGeonames)

    try {
  
        const data = await res.json();
        
        console.log(data)
        
        return data;
        
    }  
    
    catch(error) {
      
      console.log("error", error);
      
    }
}