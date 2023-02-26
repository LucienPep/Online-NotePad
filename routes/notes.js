const notes = require('express').Router()
const fs = require('fs')
const path = require('path');

const {readFromFile, readAndAppend} = require('../helpers/fsUtils');

const uuid = require('uuid')

notes.get('', (req, res) => {
    console.info(`${req.method} From Notes`);
    res.sendFile(path.join(__dirname, '../db/db.json'))
});
notes.post('', (req, res) => {
  console.info(`${req.method} To Notes`);

  const { title, text } = req.body;

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

notes.delete("/:id", async (req, res) => {
  console.info(`${req.method} Note`);
  let db = {};
  const id = req.params.id;

  await readFromFile("./db/db.json").then((data) => {
    db = JSON.parse(data);
  });

  for (i = 0; i < db.length; i++) {
    if (db[i].id === id) {
      db.splice(i, 1);
      break;
    }
  }

  fs.writeFile("./db/db.json", JSON.stringify(db), function (err) {
    if (err) {
      throw err;
    }
  });
});
 
module.exports = notes