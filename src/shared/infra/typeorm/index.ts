import "reflect-metadata";
import path from 'path';
import dotenv from 'dotenv';
import { DataSource } from "typeorm";

dotenv.config({ path: path.resolve("./",".env")});

const port = parseInt(process.env.TYPEORM_PORT.toString()) ;

export const dataSource = new DataSource(
  {
    type: "postgres",
    host: process.env.TYPEORM_HOST,
    port: port,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: ( process.env.NODE_ENV === 'test' 
      ? process.env.TYPEORM_TESTDATABASE 
      : process.env.TYPEORM_DATABASE)   ,
    entities: [ "src/**/entities/*.ts" ],
    migrations: ['src/shared/infra/typeorm/migrations/*.ts'],
    logging: false,
  }
);

dataSource.initialize();
