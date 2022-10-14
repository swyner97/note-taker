const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const notes = require('../../db/notes.json');
const uniqid = require('uniqid');


// GET /notes should return the notes.html file.
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get('/api/notes', (req, res) => {
    res.json(notes);

});

router.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        newNote = {
            title,
            text,
            id: uniqid()
        }

        readAndrouterend(newNote, './db/notes.json');
        res.json(`Note successfully added`);
    } else {
        res.error('Error adding note')
    }
});

// GET * should return the index.html file.
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

module.exports = router;