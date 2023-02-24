const notes = require('express').Router()
const path = require('path');
const uid = require('../helpers/uid')

notes.get('/', (req, res) => {
    console.info(`${req.method} From Notes`);
    res.sendFile(path.join(__dirname, '../db/db.json'))
});

notes.post('/', (req, res) => {
    console.info(`${req.method} To Notes`);
    console.info('Bananarame', res)
    const {title, text} = req.body

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uid()
        }
        console.info(newNote)
    }else{
        res.send('Error')
    }


})
 
module.exports = notes