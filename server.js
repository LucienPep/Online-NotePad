const express = require('express');
const path = require('path');
const api = require('./routes/index')

const PORT = process.env.PORT || 3001;

const app = express()

//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api', api);

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
  );

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

/*app.get('/api/notes', (req, res)  => {
  res.sendFile(path.join(__dirname, ''))
})*/

app.listen(PORT, () =>
  console.log(`http://localhost:${PORT}`)
);
