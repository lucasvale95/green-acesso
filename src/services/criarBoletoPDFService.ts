import AppDataSource from "../data-source";
import { Boleto } from "../entities/Boleto";
import fs from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";
import PDFParser from "pdf-parse";

const criarBoletoPDFService = async (
  pdfDoc
: PDFDocument): Promise<void> => {
    const outputPath = path.join(require('os').homedir(), 'Desktop', 'Boletos-Green');

    // Verifica se existe a pasta 'Boletos-Green' no Desktop, caso contrário ele cria.
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
    }

    // Buscar os boletos na tabela
    const boletosRepo = AppDataSource.getRepository(Boleto)
    let boletos = await boletosRepo.find()
    
    // Verifica a quantidade de páginas do PDF.
    const numberOfPages = pdfDoc.getPages().length

    for (let i = 0; i < numberOfPages; i++) {

        // Criação e cópia de cada página do PDF
        const subDocument = await PDFDocument.create();
        const [copiedPage] = await subDocument.copyPages(pdfDoc, [i])

        subDocument.addPage(copiedPage);
        const pdfBytes = await subDocument.save()

        const data = await PDFParser(pdfBytes);
        
        boletos.forEach((boleto) => {
            if (data.text.split('/f')[0].includes(boleto.nome_sacado)) {
                const fileName = path.join(outputPath, `${boleto.id}.pdf`);
                fs.writeFileSync(fileName, pdfBytes);
            }
        });
    }
};

export default criarBoletoPDFService;