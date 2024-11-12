import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HelloService } from './hello.service';
import {
  HelloResponse,
  Data,
  HelloByIdResponse,
} from 'src/modules/hello/interfaces';
import { AuthGuard } from '../auth/guards/auth.guard';
import { LogGuard } from '../auth/guards/log.guard';
import { Log } from 'src/custom-decorators/log.decorator';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';

@Controller('hello')
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get()
  @UseGuards(LogGuard)
  @Log()
  getHello(): HelloResponse {
    return this.helloService.getHello();
  }

  @Get(':id')
  getByIdHello(@Param('id', ParseIntPipe) id: number): HelloByIdResponse {
    return this.helloService.getByIdHello(id);
  }

  @Post()
  postHello(@Body() newData: Data): HelloResponse {
    return this.helloService.postHello(newData);
  }

  @Put(':id')
  putHello(@Param('id') id: number, @Body() updatedData: Data): HelloResponse {
    return this.helloService.putHello(id, updatedData);
  }

  @Patch(':id')
  patchHello(
    @Param('id') id: number,
    @Body() partialData: Partial<Data>,
  ): HelloResponse {
    return this.helloService.patchHello(id, partialData);
  }

  @Delete(':id')
  deleteHello(@Param('id') id: number): HelloResponse {
    return this.helloService.deleteHello(id);
  }

  @Get('forbidden/exception')
  getHelloException(): HelloResponse {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
