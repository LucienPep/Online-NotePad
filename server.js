//requires used methods
const express = require('express');
const path = require('path');
const api = require('./routes/index')

//declares port to be used and fall back
const PORT = process.env.PORT || 3001;

const app = express()

//middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//route to index.js
app.use('/api', api);

//get method for home page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
  );

//get method for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//provision method to go to home page if any random url is entered
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//port js is displayed on
app.listen(PORT, () =>
  console.log(`http://localhost:${PORT}`)
);
