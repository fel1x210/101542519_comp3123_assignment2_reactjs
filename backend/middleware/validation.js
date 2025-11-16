const { body, param, query, validationResult } = require('express-validator');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: false,
            message: "Validation failed",
            errors: errors.array()
        });
    }
    next();
};

// User validation rules
const validateUserSignup = [
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3, max: 50 })
        .withMessage('Username must be between 3 and 50 characters')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username can only contain letters, numbers, and underscores'),
    
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
    
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one letter and one number'),
    
    handleValidationErrors
];

const validateUserLogin = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
    
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    
    handleValidationErrors
];

// Employee validation rules
const validateEmployeeCreate = [
    body('first_name')
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('First name can only contain letters and spaces'),
    
    body('last_name')
        .notEmpty()
        .withMessage('Last name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Last name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Last name can only contain letters and spaces'),
    
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
    
    body('position')
        .notEmpty()
        .withMessage('Position is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Position must be between 2 and 100 characters'),
    
    body('salary')
        .notEmpty()
        .withMessage('Salary is required')
        .isNumeric()
        .withMessage('Salary must be a number')
        .isFloat({ min: 0 })
        .withMessage('Salary must be a positive number'),
    
    body('date_of_joining')
        .notEmpty()
        .withMessage('Date of joining is required')
        .isISO8601()
        .withMessage('Date of joining must be a valid date (YYYY-MM-DD format)'),
    
    body('department')
        .notEmpty()
        .withMessage('Department is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Department must be between 2 and 100 characters'),
    
    handleValidationErrors
];

const validateEmployeeUpdate = [
    body('first_name')
        .optional()
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('First name can only contain letters and spaces'),
    
    body('last_name')
        .optional()
        .isLength({ min: 2, max: 50 })
        .withMessage('Last name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Last name can only contain letters and spaces'),
    
    body('email')
        .optional()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
    
    body('position')
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage('Position must be between 2 and 100 characters'),
    
    body('salary')
        .optional()
        .isNumeric()
        .withMessage('Salary must be a number')
        .isFloat({ min: 0 })
        .withMessage('Salary must be a positive number'),
    
    body('date_of_joining')
        .optional()
        .isISO8601()
        .withMessage('Date of joining must be a valid date (YYYY-MM-DD format)'),
    
    body('department')
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage('Department must be between 2 and 100 characters'),
    
    handleValidationErrors
];

// Parameter validation
const validateEmployeeId = [
    param('eid')
        .isMongoId()
        .withMessage('Invalid employee ID format'),
    
    handleValidationErrors
];

const validateEmployeeIdQuery = [
    query('eid')
        .notEmpty()
        .withMessage('Employee ID is required')
        .isMongoId()
        .withMessage('Invalid employee ID format'),
    
    handleValidationErrors
];

module.exports = {
    validateUserSignup,
    validateUserLogin,
    validateEmployeeCreate,
    validateEmployeeUpdate,
    validateEmployeeId,
    validateEmployeeIdQuery,
    handleValidationErrors
};