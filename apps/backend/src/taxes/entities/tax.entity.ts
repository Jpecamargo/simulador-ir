import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('ir_history')
export class Tax {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    year: number;

    @Column()
    salary: number;

    @Column()
    dependents: number;

    @Column()
    education_expenses: number;

    @Column()
    health_expenses: number;

    @Column()
    irrf: number;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column()
    deleted_at: Date;
}