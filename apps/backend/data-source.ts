import { DataSource } from "typeorm"

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

  AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    console.log('Migrations:', AppDataSource.migrations);
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

  export default AppDataSource;