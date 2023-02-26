//calls in route path through express and needed methods
const notes = require('express').Router()
const fs = require('fs')
const path = require('path');
const uuid = require('uuid')

const {readFromFile, readAndAppend} = require('../helpers/fsUtils');

//get file for notes page sends db.json file data into index.js for front end viewing 
notes.get('', (req, res) => {
    console.info(`${req.method} From Notes`);
    res.sendFile(path.join(__dirname, '../db/db.json'))
});

//post method receives data from front end inputs and appends it into db.json
notes.post('', (req, res) => {
  console.info(`${req.method} To Notes`);
  //get data from body
  const { title, text } = req.body;
  //if data is present assign id and append into db.json
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid.v4(),
    };
    readAndAppend(newNote, './db/db.json');
  
  } else {
    res.error('Please Enter both fields');
  }  
});

//delete method for removing note pad value
notes.delete("/:id", async (req, res) => {
  console.info(`${req.method} Note`);
  let db = {};
  //get value from express path sent from index.js
  const id = req.params.id;

  //await function to read data from db.json
  await readFromFile("./db/db.json").then((data) => {
    db = JSON.parse(data);
  });

  //for each item in data check until id of selected matches and splice selected from db.json
  for (i = 0; i < db.length; i++) {
    if (db[i].id === id) {
      db.splice(i, 1);
      break;
    }
  }

  //rewrite db.json with new data after splicing
  fs.writeFile("./db/db.json", JSON.stringify(db), function (err) {
    if (err) {
      throw err;
    }
  });
});
 
module.exports = notes