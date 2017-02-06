const express = require('express');
const adminRouter = express.Router();
const authentication = require('../middlewares/authentication');
const Book  = require('../domain/book');

module.exports = function (model, app) {

    let BookModel = model.Book;

    if (app.get('env') === 'production') {
        adminRouter.use(authentication(app));
    }

    adminRouter
        .route('/books')
        .post((req, res, next) => {

            let body = req.body;
            let book  = new Book(body);
            let bookModel = new BookModel(book);

            bookModel.save((err, results) => {
                if (err) return next(err);
                res.json(results);
            });
        });


    adminRouter
        .route('/books/:id')
        .put((req, res, next) => {
            BookModel.findOne({ _id: req.params.id })
                .then((result) => {

                    result.set(req.body);
                    return result.save();
                })
                .then((result) => {
                    res.json(result);
                })
                .catch((reason) => {
                    next(reason);
                });
        });

    return adminRouter;
};