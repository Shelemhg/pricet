const { check, validationResult } = require('express-validator');

const validateCreateProduct = [
    check('asin')
        .exists()
        .notEmpty().withMessage('ASIN cannot be empty.'),
    check('title')
        .exists()
        .notEmpty().withMessage('Title cannot be empty.'),
    check('price')
        .exists()
        .notEmpty().withMessage('Price cannot be empty.')
        .isNumeric().withMessage('Price must be a number.'),
    check('quantity')
        .exists()
        .notEmpty().withMessage('Quantity cannot be empty.')
        .isNumeric().withMessage('Quantity must be a number.'),
    (req, res, next) => {
        try {
            validationResult(req).throw()
            return next();
        } catch (err) {
            res.status(400);
            res.send({ errors: err.array()});
        }
    }
];



module.exports = { validateCreateProduct }
