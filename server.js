//Basic server.js setup
// import dependencies
const express = require('express')
const app = express()
const mysql = require('mysql2')
const dotenv = require('dotenv')

/*
// basic endpoint to say Hello world
app.get('', (req, res) => {
    res.send("Hello World, i am Fasasi Babatunde")
})
*/

//configure environment variables
dotenv.config();


// create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

//test the connection
db. connect((err,) => {
  // if the connection is not successful
  if (err){
    return console.log("Error connecting to the database: ", err)
  }

  // if the connection is successful
  console.log("Successfully connected to the database: ", db.threadId)
})



// No 1. Retrieve all patients
app.get('/patients', (req, res) => {
  const getPatients = "SELECT * FROM patients"
  db.query(getPatients, (err, data) => {
    // if error occur
    if(err) {
      return res.status(400).send("Failed to get patients", err)
    }

    res.status(200).send(data)
  })
})



// No 2. Retrieve all providers
app.get('/providers', (req, res) => {
  const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers"
  db.query(getProviders, (err, data) => {
    // if error occur
    if(err) {
      return res.status(400).send("Failed to get provider", err)
    }

    res.status(200).send(data)
  })
})



// No 3. Filter patients by First Name
app.get('/patients-firstname', (req, res) => {
  const getPatients = "SELECT first_name FROM patients"
  db.query(getPatients, (err, data) => {
    // if error occur
    if(err) {
      return res.status(400).send("Failed to get patients", err)
    }

    res.status(200).send(data)
  })
})



// No 4. Retrieve all providers by their specialty
app.get('/provider-specialty', (req, res) => {
  const getProviders = "SELECT provider_specialty FROM providers"
  db.query(getProviders, (err, data) => {
    // if error occur
    if(err) {
      return res.status(400).send("Failed to get provider", err)
    }

    res.status(200).send(data)
  })
})



// start and listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})

