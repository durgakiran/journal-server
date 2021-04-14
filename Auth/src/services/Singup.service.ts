import { BadRequestError, RequestValidationError, ServerError } from "@durgakiran-org/common";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { clientDB } from "../db";
import { findUserByEmail } from "./FindUser.service";
import { hashPassword } from "./password.service";

export default async function SingUpService(req: Request, res: Response, next: NextFunction) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }
    
        const { email, password, name } = req.body;
        await ValidateData(email);
        const hashedPassword = await hashPassword(password);
    
        try {
            const data = await SingUp([email, hashedPassword, name]);
            res.send(data);
        } catch (e) {
            console.log(e);
            throw new ServerError();
        }
    } catch (err) {
        next(err);
    }
}

export async function ValidateData(email: string) {
    const [count, _ ] = await findUserByEmail(email);
    if (count !== 0) {
        throw new BadRequestError('User with email already exists');
    }
}

async function SingUp(args: Array<[string, string, string]>) {
    const query = `INSERT INTO users (email, password, name)
     values ($1, $2, $3) RETURNING email, name`;
    const res = await clientDB.query(query, args);
    return res.rows;
}
