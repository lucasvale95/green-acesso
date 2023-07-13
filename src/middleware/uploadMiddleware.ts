import { Request, Response, NextFunction } from "express";

const uploadMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
  
  

    next();
};
  
export {uploadMiddleware};
  