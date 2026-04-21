import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import * as bcrypt from "bcrypt";
import { JwtService } from 'node_modules/@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ){};

    async validateUser(username:string, password:string){
        const user = await this.userService.findOne(username);
        console.log(user);

        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async signIn(username:string, pass:string): Promise<any>{ //TODO: 리턴 형변환
        const user = UserService.findOne(username);
    }
}
