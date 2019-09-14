const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/46a9def07870b5e1912fe2bfdbbbff33/${latitude},${longitude}?units=si&lang=en`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Please check your internet connection.`, undefined);
    } else if (body.error) {
      callback(
        `Given Latitude or Longitude is incorrect. Please rectify and try again.`,
        undefined
      );
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain`
      );
    }
  });
};

module.exports = forecast;
