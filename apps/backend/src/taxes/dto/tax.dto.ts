import { IsNotEmpty } from 'class-validator';

export class TaxDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  year: number;

  @IsNotEmpty()
  salary: number;

  @IsNotEmpty()
  dependents: number;

  @IsNotEmpty()
  education_expenses: number;

  @IsNotEmpty()
  health_expenses: number;

  @IsNotEmpty()
  irrf: number;
}
