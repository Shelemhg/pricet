const { check, validationResult } = require('express-validator');
const { validateResult } = require('express-validator');

const validateCreateProduct = [
    check('asin')
        .exists()
        .not()
        .isEmpty(),
    check('title')
        .exists()
        .not()
        .isEmpty(),
    check('price')
        .exists()
        .not()
        .isEmpty(),
    check('quantity')
        .exists()
        .not()
        .isEmpty()
        .isNumeric(),
    (req, res, next) => {
        try {
            validationResult(req).throw()
            return next();
        } catch (err) {
            res.status(403);
            res.send({ errors: err.array()});
        }
    }

];

module.exports = { validateCreateProduct }
