import { User } from './user.entity';
import { AuthCredsDto } from './dto/authCreds.dto';
import { AuthService } from './auth.service';
import { Controller, Post, Body, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('/all')
  getUsers(): Promise<User[]> {
    return this.authService.getUsers();
  }
  @Post('/signup')
  signUp(@Body() credentials: AuthCredsDto): Promise<void> {
    return this.authService.signUp(credentials);
  }

  @Post('/signin')
  signIn(@Body() credentials: AuthCredsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(credentials);
  }
}
