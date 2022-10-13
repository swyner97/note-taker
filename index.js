const express = require('express');
const fs = require('fs');
const uniqid = require('uniqid')
const { reset } = require('nodemon');

const idFilter = req => note => note.id === parseInt(req.params.id);

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

// app.get('/api/notes/:id', (req, res) => {
//     const notes = require('./db/notes.json');
//     const found = notes.some(idFilter(req));

//     if (found) {
//         res.json(notes.filter(idFilter(req)));
//     } else {
//         res.status(400).json({ msg: `No notes with the id of ${req.params.id}` });
//     }

// });


app.delete('/api/notes/:id', (req, res) => {
    const notes = require('./db/notes.json');
    const found = notes.some(idFilter(req));

    if (found) {
        res.json({
            msg: 'Note deleted.',
            notes: notes.filter(note => !idFilter(req)(note))
        });
    } else {
        res.status(400).json({ msg: `No note with the id of ${req.params.id}` });
    }

})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
