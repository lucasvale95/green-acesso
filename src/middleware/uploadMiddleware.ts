import { Request, Response, NextFunction } from "express";
import csv from 'csv-parser'
import fs from 'fs'

async function uploadMiddleware (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (req.file.mimetype == "text/csv"){
      res.locals.boletos = [];
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => res.locals.boletos.push(data))
        .on('end', () => {
          fs.unlinkSync(req.file.path)
          next()
        })
      
    } else res.status(400).json({message: "Tipo de Arquivo Inválido."})
};
  
export {uploadMiddleware};
  