const express = require('express');
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');
const { readAndAppend } = require('./helpers/fsUtils');


const app = express();

app.use(express.static('public'));
app.use(express.json());
app.get(express.urlencoded({ extended: true }));

// npm run dev

// GET /notes should return the notes.html file.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});


// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    const notes = require('./db/notes.json');
    res.json(notes);

});

app.post('/api/notes', (req, res) => {
    const notes = require('./db/notes.json');
    const { title, text } = req.body;

    if (req.body) {
        newNote = {
            title,
            text,
            id: uniqid()
        }

        readAndAppend(newNote, './db/notes.json');
        res.json(`Note successfully added`);
    } else {
        res.error('Error adding note')
    }
});

// GET * should return the index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));