import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';

@Controller('users')
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // CRUD Operations
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  // Joins
  @Get('joins/with-posts')
  findUsersWithPosts() {
    return this.usersService.findUsersWithPosts();
  }

  // Unions
  @Get('unions/users-and-posts')
  findUsersAndPosts() {
    return this.usersService.findUsersAndPosts();
  }

  // Intersections
  @Get('intersections/with-posts')
  findUsersWithSpecificPosts(@Query('title') title: string) {
    return this.usersService.findUsersWithSpecificPosts(title);
  }

  // Aggregations
  @Get('aggregations/posts-aggregate')
  aggregatePosts() {
    return this.usersService.aggregatePosts();
  }

  // Transactions
  @Post('transactions/with-post')
  createUserWithPost(
    @Body('user') userDto: CreateUserDto,
    @Body('postTitle') postTitle: string,
  ) {
    return this.usersService.createUserWithPost(userDto, postTitle);
  }

  // Get users and their posts with 'new' in the content
  @Get('raw/posts-with-new')
  getUsersWithPostsContainingNew() {
    return this.usersService.findUsersWithPostsContainingNew();
  }
}
