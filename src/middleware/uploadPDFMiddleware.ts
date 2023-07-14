import { Request, Response, NextFunction } from "express";

async function uploadPDFMiddleware (
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    if (req.file.mimetype == "application/pdf"){

      next()  

    } else res.status(400).json({message: "Tipo de Arquivo Inválido."})
};
  
export {uploadPDFMiddleware};