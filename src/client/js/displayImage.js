
// 1. TODO: Display the image returned by the Pixabay API

function displayImage(dataAPIGeonames) {

    let destinyPixabay = encodeURIComponent(document.getElementById("destiny_result").value.trim());

    // 2. URL of the API Pixabay

    // Depois trocar o key pela variável do servidor.

    let urlAPIPixabay = `https://pixabay.com/api/?key=30837430-c6d554c6141da59f50e7e82d6&q=${destinyPixabay}&lang=en&image_type=photo`;

    Client.getDataApiPixabay(urlAPIPixabay)

    .then(function(dataAPIPixabay){

        // 3. If the API does not return data, display a picture of the country, where the destination is.

        let indexSelected = document.getElementById("destiny_result").selectedIndex;      

        if (dataAPIPixabay.totalHits == 0) {
        
            destinyPixabay = encodeURIComponent(dataAPIGeonames.geonames[indexSelected].countryName);

        } else {

            destinyPixabay = encodeURIComponent(dataAPIGeonames.geonames[indexSelected].name);

        }   

        urlAPIPixabay = `https://pixabay.com/api/?key=30837430-c6d554c6141da59f50e7e82d6&q=${destinyPixabay}&lang=en&image_type=photo`

        Client.getDataApiPixabay(urlAPIPixabay)

        .then(function(dataAPIPixabay) {
                document.getElementById("destination_image").setAttribute('src', dataAPIPixabay.hits[0].webformatURL);     
        })

    })

}

export {displayImage};