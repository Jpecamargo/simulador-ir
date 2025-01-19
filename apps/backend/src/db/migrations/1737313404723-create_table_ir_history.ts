import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableIrHistory1737313404723 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'ir_history',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'salary',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'dependents',
            type: 'int',
          },
          {
            name: 'education_expenses',
            type: 'float',
          },
          {
            name: 'health_expenses',
            type: 'float',
          },
          {
            name: 'irrf',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('ir_history');
  }
}
