import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { Template } from "./model/template.entity";
import { UserController } from './controller/user.controller';
import { TemplateController } from "./controller/template.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'flexehr',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      User, Template
    ])
  ],
  controllers: [AppController,UserController, TemplateController],
  providers: [AppService],
})
export class AppModule {}
