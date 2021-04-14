import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/api/v1/users/signout', (req: Request, res: Response) => {
    res.send('sinout application');
});

// eslint-disable-next-line import/prefer-default-export
export { router as signOutRouter };
