import { Injectable } from '@nestjs/common';
import { User } from "./entities/user.entitiy";
import { UserRepository } from './user.repository';
import { SignupDto } from '@/auth/dto/signup.dto';

@Injectable()
export class UserService {
    private readonly userEntity: User;
    private readonly userRepository: UserRepository;
    // private readonly jwtService: JwtService;

    // async signup(dto: SignupDto): Promise<void>{
    //     const user = await this.userRepository.create({
    //         ...dto // TODO: 추후 이외 데이터 추가
    //     }); 
    //     const hPassword = await this.jwtService.signAsync({
    //         confirm: user.id,{
    //             secret: this.config
    //         }
    //     });
    // }

    async findById(id: User['id']): Promise<User|undefined>{
        return this.userRepository.findById(id);
    }

    async findByName(username:string): Promise<User|undefined> {
        return this.userRepository.findByName(username);
    }
}
