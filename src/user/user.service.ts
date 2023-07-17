import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UsersRepository } from './user.repository';
import { AuthDTO } from './dtos/auth.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  async addUser(data: CreateUserDTO) {
    const emailDuplication = await this.repository.findUserByEmail(data.email);
    if (emailDuplication)
      throw new ConflictException('Email is already in use');
    const hashPassword = bcrypt.hashSync(data.password, 10);
    const user = await this.repository.addUser({
      ...data,
      password: hashPassword,
    });
    return this.authService.createToken(user);
  }

  async signIn(data: AuthDTO) {
    const user = await this.repository.findUserByEmail(data.email);
    if (!user) throw new UnauthorizedException();

    const validPassword = bcrypt.compareSync(data.password, user.password);
    if (!validPassword) throw new UnauthorizedException();
    return this.authService.createToken(user);
  }
}
