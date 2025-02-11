let { body, validationResult } = require("express-validator");

const inputValidatorForUser = [
    body('email').optional().trim().isEmail()
    .withMessage('Invalid Email'),
    body('password').optional().trim().isLength({ min: 8 })
    .withMessage('Provide Valid password'),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            error: "Invalid Input",
        });
    }
    next();
};

module.exports = { inputValidatorForUser, handleValidationErrors };