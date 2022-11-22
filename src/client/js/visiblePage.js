// 1. Rules for function "visiblePage"

// 1.1. The rules for the line bellow will be described inside the function "visiblePage".

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

        Client.getDataApiGeonames(urlAPIGeonames)
        
        .then(function(dataAPIGeonames){
        
            // Checks if the api returned any value for the typed destination.

            if (dataAPIGeonames.totalResultsCount == 0) {

                alert('Destiny not found. Please, inform a valid destiny.');

            } else if (dataAPIGeonames.totalResultsCount >= 1) {

                // TODO: visible class "search_result".

                document.getElementsByClassName("search_result")[0].style.visibility='visible';

                // TODO: Disable elements from class "search_travel"

                document.getElementById('search_destiny').disabled = true;

                document.getElementById('search_departure_date').disabled = true;

                document.getElementById('search_arrival_date').disabled = true;

                document.getElementById('search').disabled = true;

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

           /*  console.log(`O país selecionado é: ${dataAPIGeonames.geonames[0].countryCode}`);

            postData('/dataAPIGeonames', {countryCode: dataAPIGeonames.geonames.countryCode, 
                                          countryName: dataAPIGeonames.geonames.countryName, 
                                          name: dataAPIGeonames.geonames.name, 
                                          lat: dataAPIGeonames.geonames.lat, 
                                          lng: dataAPIGeonames.geonames.lng})

            */

            Client.displayImage(dataAPIGeonames);
            // weatherForecast();
            
        });
    
    }
    
    // XXXX Fill in the "Departure Date" and "Arrival Date" fields.

    document.getElementById("departure_date_result").value = document.getElementById("search_departure_date").value;

    document.getElementById("arrival_date_result").value = document.getElementById("search_arrival_date").value;
   
    // XXX TODO: Calculates the duration of the trip.

    const dtDiff = Math.round(Math.abs((new Date(document.getElementById("arrival_date_result").value).getTime() - new Date(document.getElementById("departure_date_result").value).getTime()) / (1000 * 3600 * 24)));

    document.getElementsByTagName('p')[0].innerHTML = `<p>Travel time: ${dtDiff} days</p>`;

};

export {visiblePage};