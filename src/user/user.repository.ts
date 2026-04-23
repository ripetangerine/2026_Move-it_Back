import { Injectable } from '@nestjs/common';
import { User } from "./entities/user.entitiy";
import { InjectRepository } from 'node_modules/@nestjs/typeorm';
import { Repository } from 'node_modules/typeorm';

@Injectable()
export class UserRepository{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async findById(id: User['id']): Promise<User|null> {
        const entity = await this.userRepository.findOne({
            where: { id: Number(id) },
        });
        return entity;
    }

    async findByName(username: string): Promise<User|null>{
        if(!username) return null;
        return await this.userRepository.findOne({
            where: { username: username }
        });
    }

}