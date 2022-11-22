/*

Comandos importantes

- npm run star: executa a aplicação;

*/

/* Empty JavaScript object to act as application API endpoint */

const dataWeatherbit = [];

// TODO-Express to run server and routes

const express = require('express');

const request = require('request');

const app = express();

// TODO-Start up an instance of app

/* Dependencies */

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

// TODO-Cors for cross origin allowance

const cors = require('cors');

app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

/* Initializing the main project folder */

app.use(express.static('dist'));

const port = 8080;

const server = app.listen(port, listening)

function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};

// TODO-Routes

/* Method GET */

app.get('/', function(req, res) {
  res.sendFile('dist/index.html')
})

/*app.get('/wheaterbit/forecast', (req, res) => {
    request(
      { url: `https://api.weatherbit.io/v2.0/forecast/&lat=${dataWeatherbit[0].lat}&lon=${dataWeatherbit[0].lng}&key=76efedd64bf049ba8fc84f21cef6c4aa` },
        (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }
  
        res.json(JSON.parse(body));
      }
    )
});*/

/* Method POST */

// POST route
/*
app.post('/dataAPIGeonames', dataAPIGeonames);
  
function dataAPIGeonames(req,res){

    

    newEntry = {
      countryCode: req.body.countryCode,
      countryName: req.body.countryName,
      name: req.body.name,
      lat: req.body.lat,
      lng: req.body.lng
    }
  
    dataAPIGeonames.push(newEntry)
    res.send(dataAPIGeonames)
    console.log(dataAPIGeonames)

}*/

/*app.post('/dataAPIWeatherbit', dataAPIWeatherbit);
  
function dataAPIWeatherbit(req,res){
   
    newEntry = {
      url: req.body.url,
      lat: req.body.lat,
      lng: req.body.lng
    }
  
    dataWeatherbit.push(newEntry)
    res.send(dataWeatherbit)
    console.log(dataWeatherbit)

}*/