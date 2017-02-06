
class Book {
    constructor({name, isbn, author, page, available = false}) {
        this.name = name;
        this.isbn = isbn;
        this.author = author;
        this.page = page;
        this._validate();

    }

    _validate () {

        if (!this.name) {
            throw new Error('Book name is required');
        }

        if (!this.isbn) {
            throw new Error('ISBN is required');
        }

        if (!this.author) {
            throw new Error('Author is required');
        }

        if (!this._isValidISBN()) {
            throw new Error('ISBN is invalid!');
        }
    }

    _isValidISBN () {
        // Very basic logic.

        if (this.isbn.length < 5) {
            return false;
        }

        return true;
    }
}


module.exports  = Book;