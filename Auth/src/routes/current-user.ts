import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/v1/users/currentuser', (req: Request, res: Response) => {
    res.send('this is current user');
});

// eslint-disable-next-line import/prefer-default-export
export { router as currentUserRouter };
