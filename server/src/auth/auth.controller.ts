import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './decorator/public.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post('login')
  async login(@Body() param: LoginDto) {
    return this.authService.login(param.username, param.password);
  }

  @Public()
  @Post('register')
  async register(@Body() param: RegisterDto) {
    return this.authService.register(param.username, param.password);
  }
}
