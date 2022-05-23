require('dotenv').config()

const path = require('path')
const express = require('express')
const app = express()
const pagesRoutes = require('./routes/pages')
const seriesRoutes = require('./routes/series')

const PORT = process.env.PORT || 3000
const mongoStringConnection = process.env.MONGODB || 'mongodb://localhost/minhas-series-v2'
//Pegar informações do sistema
const os = require('os')
//pegar o hostname
const hostname = os.hostname()

const mongoose = require('mongoose')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//template engine para HTML/JS
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//assets
app.use(express.static('public'))


//routes
app.use('/', pagesRoutes)
app.use('/series', seriesRoutes)

const dbState = [{
    value: 0,
    label: "disconnected"
},
{
    value: 1,
    label: "connected"
},
{
    value: 2,
    label: "connecting"
},
{
    value: 3,
    label: "disconnecting"
}];

mongoose
    .connect(mongoStringConnection, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        const state = Number(mongoose.connection.readyState);
        console.log(dbState.find(f => f.value == state).label, "to db");
        app.listen(PORT, ()=> console.log(`Server running in ${hostname} on port ${PORT}`))
    })
    .catch(e=>{
        console.log(e)
    })


