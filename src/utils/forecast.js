const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/97848ee432a5dd4bff3546fe392dfa24/' + lat + ',' + long + '?units=si'
    request({url, json:true}, (error, {body}) => {
        if (error){
            callback('Could not connect to weather service', undefined)
        } else if (body.error){
            callback('Unable to find location', undefined)
        } else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. The high today is ' + body.daily.data[0].temperatureHigh + ' degrees with a low of ' + body.daily.data[0].temperatureLow + ' degrees. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast