import { IsBoolean, IsISO8601, IsOptional, IsString } from 'class-validator';

export class CreatePublicationDto {
  @IsString()
  image: string;

  @IsString()
  title: string;
  @IsString()
  text: string;
  @IsISO8601()
  dateToPublish: Date;

  @IsOptional()
  @IsBoolean()
  published: boolean;

  @IsString()
  socialMedia: string;
}
