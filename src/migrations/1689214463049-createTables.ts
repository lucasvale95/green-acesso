import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1689214463049 implements MigrationInterface {
    name = 'CreateTables1689214463049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lotes" ("id" SERIAL NOT NULL, "nome" character varying(100) NOT NULL, "ativo" boolean NOT NULL, "criado_em" TIMESTAMP NOT NULL, CONSTRAINT "PK_6eda564423c09706b95cbf8ae1c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "boletos" ("id" SERIAL NOT NULL, "nome_sacado" character varying(255) NOT NULL, "valor" numeric(10,2) NOT NULL, "linha_digitavel" character varying(255) NOT NULL, "ativo" boolean NOT NULL, "criado_em" TIMESTAMP NOT NULL, "loteId" integer, CONSTRAINT "PK_c4b38689a32d5f2f065f98d593a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "boletos" ADD CONSTRAINT "FK_de4ffbf70dc3f8752214a7523db" FOREIGN KEY ("loteId") REFERENCES "lotes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boletos" DROP CONSTRAINT "FK_de4ffbf70dc3f8752214a7523db"`);
        await queryRunner.query(`DROP TABLE "boletos"`);
        await queryRunner.query(`DROP TABLE "lotes"`);
    }

}
