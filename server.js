const express = require('express');

const app = express();
const { characters } = require('./characters.js');

let myCharacters = characters;

const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/characters', (req, res) => {
  res.send(myCharacters);
});

app.get('/character', (req, res) => {
  const { name } = req.query;
  res.send(myCharacters.find((character) => character.username === name));
});

app.get('/charactersByProfile', (req, res) => {
  const { profile } = req.query;
  res.send(myCharacters.filter((character) => character.role === profile));
});

app.post('/newCharacter', (req, res) => {
  const { id, username, role } = req.body;
  myCharacters.push({ id: parseInt(id), username, role });
  res.send(myCharacters);
});

app.put('/updateCharacter', (req, res) => {
  const { id } = req.query;
  const { username, role } = req.body;
  myCharacters = characters.map((character) => {
    if (character.id === parseInt(id)) {
      character.role = role;
      character.username = username;
    }
    return character;
  });

  res.send(myCharacters);
});

app.delete('/deleteCharacter', (req, res) => {
  const { id } = req.query;
  myCharacters = characters.filter(
    (character) => character.id !== parseInt(id)
  );
  res.send(myCharacters);
});

app.use('*', (req, res) => {
  res.send('<h1>NOT FOUND</h1>');
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});
