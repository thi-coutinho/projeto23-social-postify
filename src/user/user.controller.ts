import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos/createUser.dto';
import { AuthDTO } from './dtos/auth.dto';
import { AuthGuard } from 'src/auth/authGuard/auth.guard';
import { UserRequest } from 'src/auth/decorators/auth.decorator';
import { User } from '@prisma/client';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async addUser(@Body() data: CreateUserDTO) {
    return await this.userService.addUser(data);
  }

  @HttpCode(200)
  @Post('signin')
  async singIn(@Body() data: AuthDTO) {
    return await this.userService.signIn(data);
  }

  @UseGuards(AuthGuard)
  @Get()
  async userLogged(@UserRequest() user: User) {
    return user;
  }
}
