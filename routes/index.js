//calls express to continue route
const express = require('express');

//declares notes.js file
const notesRoute = require('./notes')

const app = express()

//connects /notes to notes.js
app.use('/notes', notesRoute)

module.exports = app