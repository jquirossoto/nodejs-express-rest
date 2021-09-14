const should = require('should');
const sinon = require('sinon');
const booksController = require('./../controllers/booksController');

describe('Book Controller', () => {
    describe('Post', () => {
        it('Should not allow empty title on post', () => {
            const Book = function (book) { this.save = () => {}};
            const req = {
                body: {
                    author: 'Jon'
                }
            };
            const res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json: sinon.spy()
            };

            const controller = new booksController(Book);
            controller.post(req, res);
            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('Title is required').should.equal(true);
        });
    })
});