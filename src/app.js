const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const weather = require('./utils/weather.js')

const app = express()
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, '../templates/views')
const publicPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Hari Rahul'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Hari Rahul'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        help: 'This is helpful text',
        title: 'Help',
        name: 'Hari Rahul'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    
    geocode(req.query.address, (error, data) => {
        if(error) {
            res.send({error})
        } else {
            console.log(data);
            weather(data, (error, response) => {
               if(error) {
                   res.send({error})
               } else {
                   res.send({
                       forecast: response,
                       location: data.location,
                       input: req.query.address
                   })
               }
            })
        }
    } )
})


app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        error: 'Help article not found',
        name: 'Hari Rahul'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        error: '404 Page Error',
        name: 'Hari Rahul'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

