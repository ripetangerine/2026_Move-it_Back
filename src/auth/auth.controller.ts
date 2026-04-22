import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UnauthorizedException, 
  Res, Req,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from "./dto/login.dto";
import { SignupDto } from './dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';
// import { AuthGuard } from 

// TODO : @nestjs/swagger ApiTag처리

@Controller('api/v1/auth')
export class AuthController{
  constructor(private readonly authService: AuthService) {}
  
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const user = await this.authService.validateUser( // todo; pipe
      loginDto.username,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('signup')
  async signup(
    @Body() signupDTO: SignupDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const user = await this.users.create(signupDTO);

      return res.success(
        await this.transform(user, new UserDetailTransformer()),
      );

    } catch (error) {
      console.error('Signup error:', error);

      return res.error({
        message: error.message || 'Something went wrong',
        statusCode: error.status || 500,
      });
    }
  }

  @Post('logout')
  async logout(){
    // TODO: 로그아웃 관련 로직
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  async refresh(@Req() req){
    return this.authService.refresh(req.user);
  }

}
