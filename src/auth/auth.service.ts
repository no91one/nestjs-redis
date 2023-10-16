import { JwtPayload } from './jwt-interface';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AuthCredsDto } from './dto/authCreds.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  async getUsers(): Promise<User[]> {
    return this.usersRepository.getUsers();
  }
  async signUp(authCredsDto: AuthCredsDto): Promise<void> {
    return this.usersRepository.createUser(authCredsDto);
  }
  async signIn(credentials: AuthCredsDto): Promise<{ accessToken: string }> {
    const { username, password } = credentials;
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your credentials');
    }
  }
}
