import { validationResult,body } from 'express-validator';
export const validate = (validations) => {
    return async (req, res, next) => {
      for (let validation of validations) {
        const result = await validation.run(req);
        if (!result.isEmpty()) {
          break;
        }
      }
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      return res.status(422).json({ errors: errors.array() });
    };
  };

export const userSignupValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

export const loginValidator = [
  body("email").trim().isEmail().withMessage("Email is required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password should contain atleast 6 characters"),
];
