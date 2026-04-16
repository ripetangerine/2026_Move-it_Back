import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from '@/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){};

    async signIn(username:string, pass:string): Promise<any>{ //TODO: 리턴 형변환
        const user = UserService.findOne(username);
    }
}
