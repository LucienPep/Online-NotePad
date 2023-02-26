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

notes.delete('/:id', (req, res) => {
  console.info(`${req.method} Note`);
  var db = require('../db/db.json')
  const id = req.params.id
  console.log(id)
  console.log(db.length)
  console.log(db)

  for(i = 0; i < db.length; i++){

    if(db[i].id === id){
      db.splice(i,1)
      //console.log(db)
      delete require.cache

      fs.writeFile('./db/db.json', JSON.stringify(db), function (err) {
        
        if (err){
          throw err
        }
      })
      
      break
    }
  }

})
 
module.exports = notes