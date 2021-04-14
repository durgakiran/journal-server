import express from 'express';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/singout';
import { signUpRouter } from './routes/signup';
import cors from "cors";
import { clientDB } from './db';
import { DatabaseConnectionError, errorHandler, NotFoundError } from '@durgakiran-org/common';

const app = express();
app.use(json());
app.use(cors());
app.use(
    currentUserRouter, 
    signInRouter, 
    signOutRouter, 
    signUpRouter
);

app.all('*', async (req, res, next) => {
    try {
        throw new NotFoundError(); 
    } catch (err) {
        next(err);
    }
});

app.use(errorHandler);

if (!process.env.JWT_KEY) {
    throw Error('JWT_KEY missing');
}

const connectToDB = async () => {
    try {
        await clientDB.connect();
        await clientDB.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
        await clientDB.query(`CREATE TABLE IF NOT EXISTS
            users (user_id uuid default uuid_generate_v4() PRIMARY KEY,email VARCHAR(200) UNIQUE, password VARCHAR NOT NULL, name VARCHAR NOT NULL);`);
        console.log('connection successful');
    } catch (err) {
        console.log(err);
        throw new DatabaseConnectionError();
    }
}

connectToDB();

export default app;