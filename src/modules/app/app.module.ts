import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from '../hello/hello.module';
import { WorldModule } from '../world/world.module';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';

@Module({
  imports: [HelloModule, WorldModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'hello', method: RequestMethod.GET });
  }
}
