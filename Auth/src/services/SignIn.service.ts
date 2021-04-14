import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { findUserByEmail } from "./FindUser.service";
import { comparePasswords } from "./password.service";
import jsonwebtoken from "jsonwebtoken";
import { BadRequestError, RequestValidationError, ServerError } from "@durgakiran-org/common";

export default async function SingInService(req: Request, res: Response, next: NextFunction) {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        const {email, password } = req.body;
        const result = await getEmail(email);
        try {
            if(await comparePasswords(result.password, password)) {
                const token = jsonwebtoken.sign({email }, process.env.JWT_KEY!);
                res.send({ token: token, email, name: result.name, id: result.user_id });
            } else {
                res.status(403).end();
            }
        } catch (e) {
            console.log(e);
            throw new ServerError();
        }

    } catch (err) {
        next(err);
    }
}

async function getEmail(email: string): Promise<{ email: string; password: string; name: string; user_id: string }> {
    const [count, rows] = await findUserByEmail(email);
    if(count === 0) {
        throw new BadRequestError('User with email does not exists');
    }
    return rows[0];
}

