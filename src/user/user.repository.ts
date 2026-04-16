import { Repository } from "node_modules/typeorm";
import { User } from "./entities/user.entitiy";
import { DataSource } from "node_modules/typeorm/browser";


export class UserRepository{
    private userRepository: Repository<User>;
    constructor(private readonly dataSource: DataSource){
        this.userRepository = this.dataSource.getRepository(User);
    }

    SignIn(){
        return this.userRepository.save;
    }
}