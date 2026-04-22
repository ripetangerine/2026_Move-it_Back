import { Column, Entity, PrimaryGeneratedColumn } from "node_modules/typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;
}