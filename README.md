# Project: Travel App

## Which is?

It is a travel application, where the user will enter the intended destination, along with the departure and return dates; and the application will return:

* A photo of the target location. If there is no photo of the destination, a photo of the destination country will be displayed;
* The duration of the trip in days;
* The weather forecast.

This application was developed in order to obtain the completion certificate of the "Front-End Web Developer" course by Udacity.

## Execution

The application can run in both development and production environments.

To run in the development environment, run the `npm run build-dev` command. The application will automatically load in the user's browser.

To run in the production environment, the `npm run start` command must be executed. After starting the server execution, the user must type in the browser's URL: `localhost:8080`, so that the application is loaded.

To run the tests, run the `npm run test` command. This version of the application has two tests, which are in the **__tests__** folder:

* One for the server: **server.test.js** file;
* One for visiblePage.js module: **visiblePage.test** file.

## Dependencies

We use webpack as a packager for the project's modules.

The dependencies used are listed in the project's **package.json** file.

## Modules

The project modules are:

* **visiblePage.js**: in this module we validate whether the user has entered the necessary information for a trip: destination, departure date and return date. In addition, we use the Geonames API to return data from the destination entered by the user;
* **displayImage.js**: in this module we display an image of the destination. If there is no image of the destination, we display an image of the country of the destination. For this, we use the Pixabay API here;
* **weatherForest.js**: in this module we will get the weather forecast for the typed destination. For this, we make use of the Weatherbit API, which runs via the server;
* The **getDataApiGeonames.js** and **getDataApiPixabay.js** modules are where the calls to the APIs are made: Geonames and Pixabay, respectively.

## License

The license used for this project was the "MIT license".

The project can be used by anyone interested in contributing to its evolution, as long as they cite the original source.