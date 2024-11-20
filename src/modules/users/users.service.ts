import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {} // Inject PrismaService

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({ data: createUserDto });
      return user;
    } catch (error) {
      throw new HttpException(
        'Failed to create user. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      throw new HttpException(
        `Failed to retrieve users. Error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve user.',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({ where: { id } });
      if (!existingUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update user.',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      await this.prisma.user.delete({ where: { id } });
      return { message: 'User successfully deleted.' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete user.',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Joins
  async findUsersWithPosts() {
    return this.prisma.user.findMany({
      include: {
        posts: true,
      },
    });
  }

  // Unions
  async findUsersAndPosts() {
    const users = await this.prisma.user.findMany();
    const posts = await this.prisma.post.findMany();
    return { users, posts };
  }

  // Intersections
  async findUsersWithSpecificPosts(title: string) {
    return this.prisma.user.findMany({
      where: {
        posts: {
          some: {
            title: { contains: title },
          },
        },
      },
      include: { posts: true },
    });
  }

  // Aggregations
  async aggregatePosts() {
    return this.prisma.post.aggregate({
      _count: true,
      _avg: { id: true },
      _sum: { id: true },
      _min: { id: true },
      _max: { id: true },
    });
  }

  // Transactions
  async createUserWithPost(userDto: CreateUserDto, postTitle: string) {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({ data: userDto });
      const post = await tx.post.create({
        data: { title: postTitle, content: 'Initial Post', userId: user.id },
      });
      return { user, post };
    });
  }

  // Raw SQL query to get users with post titles containing 'new'
  async findUsersWithPostsContainingNew() {
    try {
      const result = await this.prisma.$queryRaw`
        SELECT users.username, posts.title, posts.content
        FROM User users
        JOIN Post posts ON users.id = posts.userId
        WHERE posts.content LIKE '%new%'
      `;
      return result;
    } catch (error) {
      throw new Error('Error executing query');
    }
  }
}
