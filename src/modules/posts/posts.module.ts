import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
