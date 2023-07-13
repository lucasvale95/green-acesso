import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Lote } from "./Lote";

@Entity("boletos")
export class Boleto {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 255 })
    nome_sacado: string

    @ManyToOne(() => Lote, (lote) => lote.boletos)
    lote: Lote

    @Column("decimal", { precision: 10, scale: 2 })
    valor: number

    @Column({ length: 255 })
    linha_digitavel: string

    @Column()
    ativo: boolean

    @Column({ type: "timestamp"})
    criado_em: Date
}