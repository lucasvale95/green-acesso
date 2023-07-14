import { Request, Response } from "express";
import fs from "fs";
import criarBoletoService from "../services/criarBoletoService";
import criarBoletoPDFService from "../services/criarBoletoPDFService";
import obterBoletoService from "../services/obterBoletoService";
import { PDFDocument } from 'pdf-lib';

interface IBoletoCSV {
    nome: string;
    unidade: number;
    valor: number;
    linha_digitavel: string;
}

const criarBoletoController = async (req: Request, res: Response) => {
    try {
      const boletos : Array<IBoletoCSV> = res.locals.boletos.map((data) => {

        const [nome, unidade, valor, linha_digitavel] = data['nome;unidade;valor;linha_digitavel'].split(';');
        return {
          nome,
          unidade: parseInt(unidade),
          valor: parseFloat(valor),
          linha_digitavel
        };
      });

      await Promise.all(boletos.map(criarBoletoService));
      
      return res.status(201).json({ message: 'Boletos criados com sucesso'});

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ocorreu um erro ao criar os boletos' });
  }
};

const criarBoletoPDFController = async (req: Request, res: Response) => {
  try {
    const document = await fs.promises.readFile(req.file.path);
    const pdfDoc = await PDFDocument.load(document)

    await criarBoletoPDFService(pdfDoc)

    fs.unlinkSync(req.file.path)

    return res.status(201).json({ message: 'Arquivo PDF processado com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ocorreu um erro ao processar o arquivo PDF' });
  }
};

const obterBoletoController = async (req: Request, res: Response) => {
  try {
    const query = req.query;

    const boletos = await obterBoletoService(query);

    if (boletos.length === 0) {
      return res.status(200).json({ message: 'Nenhum boleto encontrado com base nos critérios de consulta' });
    }

    if (typeof boletos == 'string') return res.status(200).json({base64: boletos});
    else res.status(200).json(boletos);
  
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ocorreu um erro ao obter os boletos' });
  }
};


module.exports = { criarBoletoController, criarBoletoPDFController, obterBoletoController}