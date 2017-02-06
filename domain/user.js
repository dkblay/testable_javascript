const moment = require('moment');
const DateTime  = require('../utils/dateTime');

DateTime.init(() => new Date());


class User {
    constructor({username, email, password, borrowedBooksCount, registrationDate}) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.borrowedBooksCount = borrowedBooksCount || 0;
        this._validate();
        this.registrationDate = registrationDate || DateTime.now();
    }

    _validate() {
        if(!this.username) {
            throw new Error('Username is required.')
        }

        if(!this.email) {
            throw new Error('Email is required');
        }
    }

    _canBorrow(book) {
        if(!this.lastBookBorrowedDate) {
            return true;
        }
        
        return this.borrowedBooksCount < 5
            && moment.duration(moment(DateTime.now()).diff(this.lastBookBorrowedDate)).asMonths() > 1;
    }

    borrowBook(book) {
        if (!this._canBorrow(book)) {
            throw new Error('You can not borrow any book now. Try again latter');
        }
        this.lastBookBorrowedDate = DateTime.now();
        this.borrowedBooksCount = this.borrowedBooksCount + 1;
    }
}


module.exports = User;