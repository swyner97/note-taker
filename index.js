const express = require('express');
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');
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

app.get('/notes', (req,res) => {
    res.readFile('notes.html')
    // .then(contents => {
    //     res.setHeader("Content-Type", "text/html");
    //     res.writeHead(200);
    //     res.end(contents);
    // })
    // .catch(err => {
    //     res.writeHead(500);
    //     res.end(err);
    //     return;
    // });
})

app.post('/api/notes', (req, res) => {
    const notes = require('./db/notes.json');
    const id = uniqid();
    const { title, text } = req.body;
    notes.push({ title, text, id });

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


// app.delete("/api/notes/:id", (req, res) => {
//     const notes = require("./db/notes.json");

//     // grab the note by comparing ids
//     const noteToDelete = notes.find(note => note.id === req.params.id);
//     console.log(noteToDelete);
//     if (noteToDelete) {
//         res.json({ deleted: noteToDelete });
//     } else {
//         res.status(400).json({ msg: `No note with the id of ${req.params.id}` });
//     }


//     if (!fs.existsSync(DB_DIR)) {
//         fs.mkdirSync(DB_DIR);
//     }
//     fs.writeFileSync(dbPath, generateJSON(notes))
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
