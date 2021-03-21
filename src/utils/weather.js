const request = require('request')

const weather = ({latitude, longitude}, callback) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=fd36a9bb4901453faaa190954202612&q=' + latitude + ',' + longitude
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to network')
        } else if(body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, `${body.current.condition.text}. It is currently ${body.current.temp_c} degrees out.`)
        }
    })
}

module.exports = weather