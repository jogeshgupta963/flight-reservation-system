import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";

export interface UserPayload {
    id: string;
    email: string;
}

async function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    // fetching cookie
    const decoded = req.cookies[process.env.COOKIE_NAME!];

    if (!decoded) {
        throw new Error("NOT AUTHORISED");
    }
    try {
        const payload = jwt.verify(
            decoded,
            process.env.JWT_SECRET!
        ) as UserPayload;
        //fetch user

        const user = payload;
        req.user = user;
    } catch (err) {
        if (err instanceof Error) {
            return res.json({
                success: false,
                data: err.message,
            });
        }
        if (err instanceof Error) {
            return res.json({
                success: false,
                data: err.message,
            });
        }
        return res.json({
            success: false,
            data: "Something went wrong",
        });
    }
    next();
}

export { isLoggedIn };
