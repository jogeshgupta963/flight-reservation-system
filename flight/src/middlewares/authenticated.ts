import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";

export interface UserPayload {
    id: string;
    email: string;
}
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}
async function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    // fetching cookie
    const decoded = req.cookies[process.env.COOKIE_NAME!];

    if (!decoded) {
        return res.status(403).json({
            success: false,
            data: "Not Authorised",
        });
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
            return res.status(400).json({
                success: false,
                data: err.message,
            });
        }

        return res.status(400).json({
            success: false,
            data: "Something went wrong",
        });
    }
    next();
}

export { isLoggedIn };
