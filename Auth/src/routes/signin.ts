import express from 'express';
import SingInService from '../services/SignIn.service';
import SingInValidation from '../validations/Signin.validations';

const router = express.Router();

router.post('/api/v1/users/signin', SingInValidation(), SingInService);

// eslint-disable-next-line import/prefer-default-export
export { router as signInRouter };
