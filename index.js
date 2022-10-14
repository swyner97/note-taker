const express = require('express');
const fs = require('fs');
const path = require('path');
const { readAndAppend } = require('./helpers/fsUtils');


const app = express();

app.use(express.static('public'));
app.use(express.json());
app.get(express.urlencoded({ extended: true }));

app.use('/api/notes', require('./routes/api/notes'))

// npm run dev

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));