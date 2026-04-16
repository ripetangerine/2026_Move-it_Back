import { Column, Entity, PrimaryColumn } from "node_modules/typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;
}