import { Module } from '@nestjs/common';
import { TaxesService } from './taxes.service';
import { TaxesController } from './taxes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tax } from './entities/tax.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tax])],
  providers: [TaxesService],
  controllers: [TaxesController]
})
export class TaxesModule {}
