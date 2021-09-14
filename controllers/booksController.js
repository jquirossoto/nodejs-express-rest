const { model } = require("mongoose");

function booksController(Book) {
    function post(req, res) {
        if (!req.body.title) {
           res.status(400);
           res.send('Title is required');
        }
        const book = new Book(req.body);
        book.save();
        res.status(201)
        res.json(book);
    }
    function get(req, res) {
        let query = {};
        if (req.query.genre) {
            query = req.query;
        }
        Book.find(query, (err, books) => {
            if (err) {
                res.send(err);
            } else {
                const returnBooks = books.map((book) => {
                    let b = book.toJSON();
                    b.links = {};
                    b.links.self = `http://${req.headers.host}/api/books/${b._id}`;
                    return b;
                });
                return res.json(returnBooks);
            }
        });
    }
    return { post, get };
}

module.exports = booksController;