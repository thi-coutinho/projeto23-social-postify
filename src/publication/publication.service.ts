import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { PublicationsRepository } from './publication.repository';

@Injectable()
export class PublicationService {
  constructor(private readonly repository: PublicationsRepository) {}
  async create(createPublicationDto: CreatePublicationDto, id: number) {
    const duplicateTitle = await this.repository.findByTitle(
      createPublicationDto.title,
    );
    if (duplicateTitle) throw new ConflictException('Title already exists');
    return await this.repository.addPublication(createPublicationDto, id);
  }

  async findAll(authorId: number) {
    return await this.repository.findAllByAuthorId(authorId);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} publication`;
  // }

  // update(id: number, updatePublicationDto: UpdatePublicationDto) {
  //   return `This action updates a #${id} publication`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} publication`;
  // }
}
