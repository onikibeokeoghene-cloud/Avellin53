const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({
    status: 'error',
    errors: errors.array().map(err => ({ field: err.param, message: err.msg }))
  });
};

const registerValidation = [
  body('email').isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character'),
  body('fullName').notEmpty().withMessage('Full name is required').trim().escape(),
  body('phoneNumber').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  validate
];

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  validate
];

const productValidation = [
  body('name').notEmpty().withMessage('Product name is required').trim().escape(),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('stock_quantity').isInt({ min: 0 }).withMessage('Stock quantity must be a non-negative integer'),
  body('category').isIn(['mens-fashion', 'womens-fashion', 'skincare']).withMessage('Invalid category'),
  validate
];

module.exports = {
  registerValidation,
  loginValidation,
  productValidation
};
