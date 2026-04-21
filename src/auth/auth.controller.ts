import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UnauthorizedException, 
  Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from "./dto/login.dto";
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController{
  constructor(private readonly authService: AuthService) {}
  
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const user = await this.authService.validateUser( // todo; pipe
      loginDto.username,
      loginDto.password,
    )
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

}
