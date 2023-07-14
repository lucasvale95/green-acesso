import AppDataSource from "../data-source";
import { Boleto } from "../entities/Boleto";
import { PDFDocument, StandardFonts } from 'pdf-lib';
import fs from 'fs';

interface IFiltros {
  nome?: string;
  valor_inicial?: string;
  valor_final?: string;
  id_lote?: string;
  relatorio?: string;
}

const obterBoletoPDFService = async (
    query
: IFiltros): Promise<Boleto[] | null | string> => {
    const {nome, valor_inicial, valor_final, id_lote, relatorio} = query

    const boletosRepo = AppDataSource.getRepository(Boleto)
    let boletos = await boletosRepo.find({ relations: ['lote'] })
    
    if (relatorio === '1') {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
  
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontSize = 12;
        const lineHeight = fontSize * 1.5;
        const margin = 100;
  
        // Cabeçalho da tabela
        const headers = ['id', 'nome_sacado', 'id_lote', 'valor', 'linha_digitavel', 'ative', 'criado_em'];
  
        // Posicionamento inicial
        let x = margin;
        let y = page.getHeight() - margin;
  

        headers.forEach((header, index) => {
          page.drawText(header, { x: x + index * 100, y: y - lineHeight, size: fontSize, font });
        });

        // Escrever dados dos boletos na tabela
        boletos.forEach((boleto, index) => {   
            const rowData = [boleto.id.toString(), boleto.nome_sacado.toString(), boleto.lote.id.toString(), boleto.valor.toString(), boleto.linha_digitavel.toString(), boleto.ativo.toString(), boleto.criado_em.getTime().toString()];
            rowData.forEach((data, dataIndex) => {
                page.drawText(data, { x: x + dataIndex * 100, y: y - (index + 2) * lineHeight, size: fontSize, font });
            });
        });
  
        // Salvar o PDF em um arquivo temporário e transformar em Base64
        const pdfBytes = await pdfDoc.save();
        const tmpFilePath = './uploads/report.pdf';
        fs.writeFileSync(tmpFilePath, pdfBytes);
        const base64Data = fs.readFileSync(tmpFilePath, 'base64');
 
        fs.unlinkSync(tmpFilePath);

        // Retornar o base64 do PDF
        return base64Data

    } else {
        let filters:Boleto[] | null = boletos;

        // Aplicando filtros de rota

        if (nome) filters = boletos.filter(boleto => boleto.nome_sacado.includes(nome));
        if (valor_inicial) filters = filters?.filter(boleto => boleto.valor >= Number(valor_inicial));
        if (valor_final) filters = filters?.filter(boleto => boleto.valor <= Number(valor_final));
        if (id_lote) filters = filters?.filter(boleto => boleto.lote.id == id_lote);

        if (null || filters?.length == 0 ) {
            return null;
        } else {
            return filters
        }   
    }
      
};

export default obterBoletoPDFService;