import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { TaxesModule } from './taxes/taxes.module';

@Module({
  imports: [UsersModule, AuthModule, DbModule, TaxesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
