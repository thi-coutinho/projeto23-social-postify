import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateUserDTO } from './dtos/createUser.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async addUser(data: CreateUserDTO) {
    return await this.prisma.user.create({ data });
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findUserById(id: number) {
    return await this.prisma.user.findFirst({ where: { id } });
  }
}
