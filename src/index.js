if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes)

const {DATABASE_URL} = process.env

    
mongoose.connect(DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true,
	useFindAndModify: false })

const connection = mongoose.connection;

connection.once("open", async function() {
    console.log("MongoDB database connection established successfully");
});



app.listen( process.env.PORT || 3333,() => {
    console.log('Listenning to requests on port 3333')
})