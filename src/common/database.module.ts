import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'nestjs-with-rxjs.sqlite',
      entities: [
        __dirname + '/../**/infra/repository/sqlite/entity/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
