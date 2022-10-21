import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'nestjs-with-rxjs.sqlite',
  synchronize: false,
  logging: false,
  entities: ['src/**/infra/repository/sqlite/entity/*.entity.ts'],
  migrations: ['external/database/seeds/*.ts'],
});

AppDataSource.initialize()
  .then(async () => {
    console.log('Database has initialized');
  })
  .catch((error) => console.log(error));
