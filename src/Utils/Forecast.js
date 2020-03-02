const request = require('request')

const forecast = (longtitude, latitude, callback) => {
  const url = 'https://api.darksky.net/forecast/5f562038165a01cc051cf533c4f1c814/' + longtitude +','+ latitude + '?units=si'

  request({ url, json: true }, (error, {body} = []) => {
    if (error) {
      callback('Unable to connect to location services', undefined)
    } else if (body.length === 0) {
      callback('Unable to find location, Try another search', undefined)
    } else {
      callback(undefined, {
        temp: body.currently.temperature,
        precip: body.currently.precipProbability
      })
    }
  })
}


module.exports = forecast
