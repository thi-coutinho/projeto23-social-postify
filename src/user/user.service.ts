import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UsersRepository } from './user.repository';
import { AuthDTO } from './dtos/auth.dto';

@Injectable()
export class UserService {
  constructor(private readonly repository: UsersRepository) {}

  async addUser(data: CreateUserDTO) {
    const emailDuplication = await this.repository.findUserByEmail(data.email);
    if (emailDuplication)
      throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
    await this.repository.addUser(data);
  }

  async signIn(data: AuthDTO) {
    const user = await this.repository.findUserByEmail(data.email);
    if (!user || data.password !== user.password)
      throw new UnauthorizedException();
  }
}
