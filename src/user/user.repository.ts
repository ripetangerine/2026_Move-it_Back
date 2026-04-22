import { Injectable } from '@nestjs/common';
import { Repository } from "node_modules/typeorm";
import { User } from "./entities/user.entitiy";


@Injectable()
export class UserRepository extends Repository<User>{
    private userRepository: Repository<User>;
    // constructor(private readonly dataSource: DataSource){
    //     this.userRepository = this.dataSource.getRepository(User);
    // }

    async findById(id: User['id']): Promise<User|any> {
        const entity = await this.findOne({
            where: { id: Number(id) },
        });
        return entity;
    }

    async findByName(username: string): Promise<User|any>{
        if(!username) return null;
        return await this.findOne({
            where: { username: username }
        });
    }

}