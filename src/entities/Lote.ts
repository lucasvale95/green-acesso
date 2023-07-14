import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Boleto } from "./Boleto";

@Entity("lotes")
export class Lote {

    @PrimaryGeneratedColumn()
    readonly id: string;

    @Column({length: 100})
    nome: string

    @Column()
    ativo: boolean

    @Column()
    nome_lote: number

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    criado_em: Date

    @OneToMany(() => Boleto, boleto => boleto.lote)
    boletos: Boleto[];
}