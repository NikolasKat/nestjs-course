import type { NextFunction, Request, Response } from "express";

export function LoggingMiddleware(
   req: Request,
   res: Response,
   next: NextFunction
) {
   console.log(`Request... ${req.method} ${req.url}`);
   next();
}
