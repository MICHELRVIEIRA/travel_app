function weatherForecast (dataAPIGeonames) {
    
  let indexSelected = document.getElementById("destiny_result").selectedIndex;
    
  let lat = dataAPIGeonames.geonames[indexSelected].lat;
  let lng = dataAPIGeonames.geonames[indexSelected].lng;

  postData('/coordinates', {lat: lat, lng: lng})

  .then(function(){
    
    getData();

  });
   
}

const postData = async (url = '', data = {})=>{

  const response = await fetch(url, {
  method: 'POST', 
  credentials: 'same-origin', 
  headers: {
      'Content-Type': 'application/json',
  },
  
  body: JSON.stringify(data)  

});

  try {
    const newData = await response.json();
    console.log(newData);
    return newData
  }
  
  catch(error) {
    console.log("error", error);
  }
}

const getData  = async () => {
  
  const request = await fetch ('/wheaterbit/forecast')

  try {

    const dataForecast = await request.json();
    
    console.log(dataForecast);

    // document.getElementById('date').innerHTML = allData[0].date;
    // document.getElementById('temp').innerHTML = allData[0].temperature;
    // document.getElementById('content').innerHTML = allData[0].content;

  }

  catch (error){

    console.log("error", error);

  }

}

export {weatherForecast}