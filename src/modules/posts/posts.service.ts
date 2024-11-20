import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {} // Inject PrismaService

  async create(createPostDto: CreatePostDto) {
    try {
      const post = await this.prisma.post.create({ data: createPostDto });
      return post;
    } catch (error) {
      throw new HttpException(
        `Failed to create post. Error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.post.findMany({ include: { user: true } });
    } catch (error) {
      throw new HttpException(
        `Failed to retrieve posts. Error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id },
        include: { user: true },
      });
      if (!post) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }
      return post;
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to retrieve post. Error: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      const post = await this.prisma.post.findUnique({ where: { id } });
      if (!post) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }
      await this.prisma.post.update({
        where: { id },
        data: updatePostDto,
      });
      return this.findOne(id);
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to update post. Error: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const post = await this.prisma.post.findUnique({ where: { id } });
      if (!post) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }
      await this.prisma.post.delete({ where: { id } });
      return { message: 'Post successfully deleted.' };
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to delete post. Error: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
