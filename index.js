const express = require('express');
const fs = require('fs');
const uniqid = require('uniqid')
const { reset } = require('nodemon');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.get(express.urlencoded({ extended: true }));

// npm run dev

app.get('/api/notes', (req, res) => {
    const notes = require('./db/notes.json');
    res.json(notes);
});

app.get('*', (req, res) => {
    const notes = require('./db/notes.json');
    res.json(notes)
})

app.post('/api/notes', (req, res) => {
    const notes = require('./db/notes.json');
    const newNote = {
        id: uniqid(),
        title: req.body,
        note: req.body
    }
    notes.push(newNote);

    fs.writeFile('./db/notes.json', JSON.stringify(notes), (err) => {
        if (err) {
            res.status(500).end();
        } else {
            res.status(200).json({
                message: 'Everything went ok!'
            })
        }
    })
})

app.delete('/api/notes/:id', (req, res))


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
