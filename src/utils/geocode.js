const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGFyaWJheiIsImEiOiJja2p0cXgybW4wOXRqMnRwM3NsejljOThnIn0.8XsWtZy0IwTT5aJDzlo2JA&limit=1'
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to the internet')
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try again')
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode