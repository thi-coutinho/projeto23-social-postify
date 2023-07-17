import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreatePublicationDto } from './dto/create-publication.dto';

@Injectable()
export class PublicationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async addPublication(data: CreatePublicationDto, authorId: number) {
    const dateToPublish = new Date(data.dateToPublish).toISOString();
    return await this.prisma.publication.create({
      data: { ...data, dateToPublish, authorId },
    });
  }

  async findByTitle(title: string) {
    return await this.prisma.publication.findFirst({ where: { title } });
  }

  async findAllByAuthorId(authorId: number) {
    return await this.prisma.publication.findMany({ where: { authorId } });
  }
}
