// Variables

/* Empty JavaScript object to act as application API endpoint */

let projectData = []

// For using environment variables.

const dotenv = require('dotenv');

dotenv.config();

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

// Defines the origins that can access server resources

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

app.get('/wheaterbit/forecast', (req, res) => {

  request(
    { url: `https://api.weatherbit.io/v2.0/current?lat=${projectData[0].lat}&lon=${projectData[0].lng}&key=${process.env.keyWeatherbit}`},
      (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
});

/* Method POST */

app.post('/coordinates', coordinates);
  
function coordinates(req,res){
   
    projectData = []

    newEntry = {
      lat: req.body.lat,
      lng: req.body.lng
    }
  
    projectData.push(newEntry)
    res.send(projectData)
    console.log(projectData)

}