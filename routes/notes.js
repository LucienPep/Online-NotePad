const notes = require('express').Router()
const path = require('path');

notes.get('/', (req, res) => {
    console.info(`${req.method} From Notes`);
    res.sendFile(path.join(__dirname, '../db/db.json'))
});

notes.post('/', (req, res) => {
    console.info(`${req.method} To Notes`);

    
})
 
module.exports = notes