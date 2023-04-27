const { body } = require('express-validator');
const validationResult = require('express-validator')

const validateSchema = ()  => [
  
  body("email")
    .isLength({ min: 1 })
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please provide a valid email address"),
  body("username")
    .isLength({ min: 6 })
    .withMessage("Username must contain at least 6 chars."),
  body("password")
    .isLength({ min: 6, max: 25 })
    .withMessage("Password must be between 8-25 characters long."),
  body("confirm")
    .isLength({ min: 1 })
    .withMessage("Confirm password is required.")
    .custom((value, { req, loc, path }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match");
      } else {
        return value;
      }
    })
    .withMessage("Passwords must match."),
];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
};

module.exports = validateRequest
module.exports = validateSchema
