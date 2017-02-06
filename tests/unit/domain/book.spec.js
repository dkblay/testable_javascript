const chai = require('chai');
const expect  = chai.expect;
const should  = chai.should();

const Book = require('../../../domain/book');

describe('Book Domain', function() {

    describe('When creating a book', function() {

        it('name should be defined', function() {
            expect(() => {
                new Book({})
            }).to.throw(Error);
        });

        it('should have a valid ISBN', function() {

            expect(() => {
                new Book({name: 'TDD in practice', author: 'someAuthor', isbn: '567'});
            }).to.Throw(/ISBN is invalid/);
        });
    });

});