import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@app/services/prisma.service';
import { IUserRepository } from '@packages/core/auth/interfaces/user-repository.interface';
import { PaginationParams, PaginationResponse } from '@tresdoce-nestjs-toolkit/paas';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({ page = 1, size = 10 }: PaginationParams): Promise<PaginationResponse<User>> {
    const skip = (page - 1) * size;
    const take = size;
    const total = await this.prisma.user.count();
    const data = await this.prisma.user.findMany({
      skip,
      take,
    });

    return {
      data,
      meta: {
        page,
        size,
        total,
        totalPages: Math.ceil(total / size),
      },
    };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async update(id: number, changes: UpdateUserDto): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: changes,
      });
    } catch {
      throw new NotFoundException(`User #${id} not found`);
    }
  }

  async remove(id: number): Promise<User> {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch {
      throw new NotFoundException(`User #${id} not found`);
    }
  }

  async findUserByUsername(username: string): Promise<User> {
    return this.prisma.user.findFirst({ where: { name: username } });
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirst({ where: { email } });
  }
}
