const should = require('should');
const request = require('supertest');
const mongoose = require('mongoose');

const app = require('./../app');
const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book Integration Tests', () => {

    afterEach((done) => {
        Book.deleteMany({}).exec();
        done();
    });

    after((done) => {
        mongoose.connection.close();
        app.server.close(done());
    })


    it('Should allow a book to be posted', (done) => {
        const bookPost = {
            title: 'Book',
            author: 'John',
            genre: 'fiction'
        };
        agent.post('/api/books')
            .send(bookPost)
            .expect(200)
            .end((err, data) => {
                data.body.read.should.equal(false);
                data.body.should.have.property('_id');
                done();
            });
    });
})