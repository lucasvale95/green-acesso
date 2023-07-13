import { DataSource } from "typeorm";
import "dotenv/config";

const AppDataSource = new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PWD,
        database: process.env.POSTGRES_DB,
        logging: true,
        synchronize: false,
        entities: ["src/entities/*.ts"],
        migrations: ["src/migrations/*.ts"],
      }
);

// AppDataSource.initialize()
//   .then(() => {
//     console.log("Database connected");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

export default AppDataSource;
