import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos/createUser.dto';
import { AuthDTO } from './dtos/auth.dto';

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
}
