import { Express, Request } from "express";
import { UserPayload } from "../../middlewares/authenticated";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
    interface Response {
      json(): {
        body: {
          success?: boolean;
          data: any;
        };
      };
    }
  }
}
