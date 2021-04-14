import { body, ValidationChain } from 'express-validator';

export default function SingUpValidation(): ValidationChain[] {
    return [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password')
            .isString()
            .isLength({ min: 8, max: 24 })
            .withMessage('Invalid Password'),
        body('name')
            .isString()
            .isLength({ min: 3 })
            .withMessage('Invalid Name'),
    ];
}
