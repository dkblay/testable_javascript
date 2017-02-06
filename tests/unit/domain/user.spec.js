const chai = require('chai');
const User = require('../../../domain/user');
const DateTime = require('../../../utils/dateTime');


const expect = chai.expect;
const should = chai.should();


describe('User Domain', function () {

    beforeEach(function () {
        DateTime.init(() => new Date(2016, 05, 05));

    });
    describe('When adding a user', function () {

    
        it('email is mandatory', () => {
            expect(() => {
                new User({ username: 'David' })
            }).to.Throw(Error, /Email is required/);
        });

        it('should set registration date to current date', () => {

            let user = new User({ username: 'dblay', email: 'dkblaay@gmail.com' });
            expect(user.registrationDate).to.eql(DateTime.now());
        })

    });

    describe('when borrowing a book', function () {
        let user;
        beforeEach(function () {
            user = new User({
                username: 'David',
                email: 'dkblay@gmail.com',
            });
        });
        

        it('should be able to borrow a book for the first time', () => {
            user.borrowBook();
            expect(user.borrowedBooksCount).to.equal(1);
            expect(user.lastBookBorrowedDate).to.eql(DateTime.now());
        });


        it('users with borrowedBookCount greater than 5 cannot', () => {
            user.lastBookBorrowedDate = new Date(2016, 01, 01);
            user.borrowedBooksCount = 5
            
            expect(() => {
                user.borrowBook();
            }).to.Throw(Error, /You can not borrow any book now. Try again latter/);
        });

        it('users with borrowedBookCount less than 5 and who haven\'t  borrowed a book in a month are allowed', () => {
            user.borrowedBooksCount = 3;
            user.lastBookBorrowedDate = new Date(2016, 01, 01);

            user.borrowBook();
            expect(user.borrowedBooksCount).to.equal(4);
            expect(user.lastBookBorrowedDate).to.eql(DateTime.now());
        })
    });

});