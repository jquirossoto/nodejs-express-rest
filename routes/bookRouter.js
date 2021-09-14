const express = require('express');
const booksController = require('./../controllers/booksController');

function routes(Book) {
    const bookRouter = express.Router();
    const controller = booksController(Book);
    bookRouter.route('/books')
        .post(controller.post)
        .get(controller.get);
    bookRouter.use('/books/:id', (req, res, next) => {
        Book.findById(req.params.id, (err, book) => {
            if (err) {
                res.send(err);
            } else {
                if (book) {
                    req.book = book;
                    return next();
                } else {
                    res.sendStatus(404);
                }
            }
        });
    });
    bookRouter.route('/books/:id')
        .get((req, res) => {
            const returnBook = req.book.toJSON();
            const genre = req.book.genre.replace(' ', '%20');
            returnBook.links = {};
            returnBook.links.filterByThisGenre = `http://${req.headers.host}/api/books/?genre=${genre}`;
            res.json(returnBook);
        })
        .put((req, res) => {
            const { book } = req;
            book.title = req.body.title;
            book.author = req.body.author;
            book.genre = req.body.genre;
            book.read = req.body.read;
            book.save((err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json(book);
                }
            });
        })
        .patch((req, res) => {
            const { book } = req;
            if (req.body.id) {
                delete req.body._id;
            }
            Object.entries(req.body).forEach(item => {
                const key = item[0];
                const value = item[1];
                book[key] = value;
            });
            book.save((err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json(book);
                }
            });
        })
        .delete((req, res) => {
            const { book } = req;
            book.remove((err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.sendStatus(204);
                }
            });
        });
    return bookRouter;
}

module.exports = routes;