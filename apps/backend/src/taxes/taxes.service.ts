import { Injectable } from '@nestjs/common';
import { Tax } from './entities/tax.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaxesService {
  constructor(
    @InjectRepository(Tax)
    private readonly taxRepository: Repository<Tax>,
  ) {}

  async create(tax: Partial<Tax>): Promise<Tax> {
    return this.taxRepository.save(tax);
  }

  async findAllByUser(user_id: number): Promise<Tax[]> {
    const taxes = await this.taxRepository.find({ where: { user_id } });
    return taxes;
  }

  async findOne(id: number): Promise<Tax> {
    return this.taxRepository.findOne({ where: { id } });
  }

  async update(id: number, tax: Partial<Tax>): Promise<Tax> {
    await this.taxRepository.update(id, tax);
    return this.taxRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.taxRepository.update(id, { deleted_at: new Date() });
  }
}
