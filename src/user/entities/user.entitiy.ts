import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    username: string;

    @Column({select: false})
    password: string;

    @Column({})
    refreshToken: string; //로그인시 업뎃|아웃시 삭제
}