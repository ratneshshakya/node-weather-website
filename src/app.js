const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(path.join(__dirname, '../public'))

const app = express()
// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPaths = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPaths)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))
 
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Ratnesh'
    }) 
})

app.get('/help', (req, res) => {
    res.render('help', {
        help:'Need some help.',
        title: 'Help',
        name: 'Ratnesh'
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Ratnesh"
    })
})

// app.get('/help', (req,res) => {
//     res.send([{
//         name: 'Ratnesh'
//     },{
//         name: 'Andrew'
//     }])
// })

// app.get('/about', (req, res) =>{
//     res.send('<h2>About page</h2>')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })        
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
           return res.send({error})
        }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({error})
                 }
                
                res.send({
                    forecast: forecastData,
                    location:location,
                    address: req.query.address
                })
          })
    })
  
})

app.get('/help/*', (req, res) => {
    res.render('pageNotFound', {
        title: '404 no page',
        errorMessage: 'Help article not found.',
        name: 'Ratnesh'
    })
})
app.get('*', (req, res) => {
    res.render('pageNotFound', {
        title: '404',
        errorMessage: 'Page not available.',
        name: 'Ratnesh'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})