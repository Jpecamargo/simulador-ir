import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaxesService } from './taxes.service';
import { TaxDto } from './dto/tax.dto';

@Controller('taxes')
export class TaxesController {
  constructor(private readonly taxesService: TaxesService) {}

  @Post('create')
  async createTax(@Body() tax: TaxDto) {
    return this.taxesService.create(tax);
  }

  @Get('all/:user_id')
  async findAllByUser(@Param('user_id') user_id: number) {
    return this.taxesService.findAllByUser(user_id);
  }

  @Get('find/:id')
  async findOne(@Param('id') id: number) {
    return this.taxesService.findOne(id);
  }

  @Put('update/:id')
  async updateTax(@Param('id') id: number, @Body() tax: TaxDto) {
    return this.taxesService.update(id, tax);
  }

  @Delete('delete/:id')
  async deleteTax(@Param('id') id: number) {
    return this.taxesService.delete(id);
  }
}
