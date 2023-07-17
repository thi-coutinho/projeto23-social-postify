import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { AuthGuard } from 'src/auth/authGuard/auth.guard';
import { UserRequest } from 'src/auth/decorators/auth.decorator';
import { User } from '@prisma/client';

@Controller()
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @UseGuards(AuthGuard)
  @Post('publication')
  create(
    @UserRequest() user: User,
    @Body() createPublicationDto: CreatePublicationDto,
  ) {
    return this.publicationService.create(createPublicationDto, user.id);
  }

  @UseGuards(AuthGuard)
  @Get('publications')
  findAll(@UserRequest() user: User) {
    return this.publicationService.findAll(user.id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.publicationService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePublicationDto: UpdatePublicationDto,
  // ) {
  //   return this.publicationService.update(+id, updatePublicationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.publicationService.remove(+id);
  // }
}
