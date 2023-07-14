import { Lote } from "../entities/Lote";
import { Boleto } from "../entities/Boleto";
import AppDataSource from "../data-source";

interface IBoletoRequest {    
    nome: string,
    unidade: number,
    valor: number,
    linha_digitavel: string  
}

const criarBoletoService = async ({
  nome, unidade, valor, linha_digitavel
}: IBoletoRequest): Promise<Boleto> => {
    const boletosRepo = AppDataSource.getRepository(Boleto)
    const loteRepo = AppDataSource.getRepository(Lote)

    let boletoExiste = await boletosRepo.findOne({
        where: {
          nome_sacado: nome,
          linha_digitavel
        }
    })

    if(boletoExiste) {
        console.log("Boleto já cadastrado!")
        return null
    }

    let lote = await loteRepo.findOne({
        where: {
          nome_lote: unidade
        }
    })

    if (!lote) {
        const criarLote = loteRepo.create({
            nome, 
            nome_lote: unidade,
            ativo: true,
            criado_em: new Date(),
        });
        await loteRepo.save(criarLote)

        const boleto = boletosRepo.save({
            nome_sacado: nome, 
            valor, 
            linha_digitavel, 
            lote: criarLote,
            ativo: criarLote.ativo
        });

        return boleto

    } else {

        const boleto = await boletosRepo.save({
            nome_sacado: nome, 
            valor, 
            linha_digitavel, 
            lote,
            ativo: lote.ativo
        });

        return boleto
    }
};

export default criarBoletoService;