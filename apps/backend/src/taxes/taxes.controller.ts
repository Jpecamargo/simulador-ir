import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TaxesService } from './taxes.service';
import { TaxDto } from './dto/tax.dto';

@Controller('taxes')
export class TaxesController {
    constructor(
        private readonly taxesService: TaxesService,
    ) {}

    @Post('create')
    async createTax(@Body() tax: TaxDto) {
        return this.taxesService.create(tax);
    }

    @Get('all/:user_id')
    async findAllByUser(@Param() user_id: number) {
        return this.taxesService.findAllByUser(user_id);
    }

    @Get('find/:id')
    async findOne(@Param() id: number) {
        return this.taxesService.findOne(id);
    }

    @Post('update/:id')
    async updateTax(@Param() tax: TaxDto, id: number) {
        return this.taxesService.update(id, tax);
    }

    @Post('delete/:id')
    async deleteTax(@Param() id: number) {
        return this.taxesService.delete(id);
    }
}
