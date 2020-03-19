const request = require('request');

const getForecastInformation = (longitude, latitude, callback) => {

    const url = `https://api.darksky.net/forecast/0e3ece08d22a267e351be30ef9e0eb0d/${longitude},${latitude}?exclude=minutely,hourly,daily,alerts,flags&units=auto`;

    // { body } means (response.body), only url means (url: url,)
    request({ url, json: true }, (error, { body }) => {

        if (error) {

            callback('Unable to connect to weather services..!!');

        } else if (body.error) {

            callback(body.error);

        } else {

            // console.log(response.body.currently);

            // const temp = body.currently.temperature;
            // const rainProbability = body.currently.precipProbability;
            // const summary = body.currently.summary;
            // this equivalents to -> 
            const { temperature: temp, precipProbability: rainProbability, summary } = body.currently;

            // const data = {
            //     temp: temp,
            //     rainProbability: rainProbability,
            //     summary: summary
            // };
            // this equivalents to ->

            const data = {
                temp,
                rainProbability,
                summary
            };

            callback(undefined, data);
            // console.log(`summary is ${summary} & today's temp is ${temp} and rain percentage is ${rainProbability}`);
        }
    });

};

module.exports = {
    getForecastInformation,
}