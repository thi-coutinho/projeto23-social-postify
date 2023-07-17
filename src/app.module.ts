import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { PublicationModule } from './publication/publication.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, PublicationModule],
})
export class AppModule {}
