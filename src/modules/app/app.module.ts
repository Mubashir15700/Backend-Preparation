import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from '../hello/hello.module';
import { WorldModule } from '../world/world.module';
import { UsersModule } from '../users/users.module';
import { PostsModule } from '../posts/posts.module';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';

// Import PrismaModule
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Import feature modules
    HelloModule,
    WorldModule,
    UsersModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService, // Inject Prisma service to use throughout the application
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'hello', method: RequestMethod.GET });
  }
}
