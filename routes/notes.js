const notes = require('express').Router()
const fs = require('fs')
const path = require('path');

const {readAndAppend} = require('../helpers/fsUtils');

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
 
module.exports = notes