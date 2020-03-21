const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const userLocation = process.argv[2];

if (!userLocation) {
    return console.log('Please Provide a Location');
}

geocode.getLocationInformation(userLocation, (error, { latitude, longitude, location } = {}) => {

    if (error) {
        return console.log(error);
    }

    forecast.getForecastInformation(latitude, longitude, (error, forecastData) => {

        if (error) {
            return console.log(error);
        }
        console.log(location);
        console.log(forecastData);

    });

});

