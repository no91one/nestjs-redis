import { Repository, DataSource } from 'typeorm';
import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.entity';
import { AuthCredsDto } from './dto/authCreds.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async getUsers(): Promise<User[]> {
    const query = this.createQueryBuilder('user');
    const tasks = await query.getMany();
    return tasks;
  }

  async createUser(authCredsDto: AuthCredsDto): Promise<void> {
    try {
      const { username, password } = authCredsDto;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = this.create({
        username,
        password: hashedPassword,
      });
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User already exists');
      }
      throw new InternalServerErrorException('User already exists');
    }
  }
}
