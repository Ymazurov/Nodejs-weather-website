const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const city = process.argv[2]

// Paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: "Weather App",
    name: 'Ursh'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Ursh'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Ursh',
    helpMsg: "don't give up! You can do the thing!"
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  geocode(req.query.address, (error, {longtitude, latitude, location} = []) => {
    if (error) {
      return res.send({
        error: error
      })
    }
    forecast(longtitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: error
        })
      }

      let precipPer = Math.floor(forecastData.precip * 100)
      res.send({
        forecast: `The temperature is ${forecastData.temp}°C and the precipitation chance is ${precipPer}%`,
        location: location,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help article not found',
    name: 'Ursh'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page not found',
    name: 'Ursh',
  })
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
