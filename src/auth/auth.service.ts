import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import * as bcrypt from "bcrypt";
import { JwtService } from 'node_modules/@nestjs/jwt';
import { ConfigService } from 'node_modules/@nestjs/config';
import { SignupDto } from './dto/signup.dto';
import { UserRepository } from '@/user/user.repository';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private userRepository: UserRepository, 
    ){};

    async validateUser(username:string, password:string){
        const user = await this.userService.findOne(username);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        console.log(user);

    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: '15m'
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: '7d'
        });
        // await this.updateRefreshTokenInDB(user.id, refreshToken); //DB 저장 필수 ;;

        return { token, refreshToken, tokenExpires: new Date(Date.now() + 15 * 60 * 1000) };
        // return { access_token: this.jwtService.sign(payload)}
    }

    async refresh(user: any){
        const payload = { username: user.username, sub: user.id };
        const newToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: '15m'
        });
        return { token: newToken };
    }

    async signup(dto: SignupDto): Promise<void> {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = this.userRepository.create({
            ...dto,
            password: hashedPassword,
        });
        await this.userRepository.save(user);
    }

    async logout(user: any){
        this.jwtService.
    }
}
