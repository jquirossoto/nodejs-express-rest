const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

if (process.env.NODE_ENV === 'test') {
	mongoose.connect('mongodb://localhost/bookAPI_Test');
} else {
	mongoose.connect('mongodb://localhost/bookAPI');
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', bookRouter);

app.server = app.listen(port, () => {
	console.log(`Running on port ${port}`);
});

module.exports = app;