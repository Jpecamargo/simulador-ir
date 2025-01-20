import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'simulador_ir',
  synchronize: false,
  entities: [`${__dirname}/**/*.entity{.ts,*js}`],
  migrations: [`${__dirname}/migrations/*{.ts,*js}`],
  migrationsRun: true,
});

export default AppDataSource;
