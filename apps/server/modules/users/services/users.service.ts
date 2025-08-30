import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@app/services/prisma.service';
import {
  AuthUser,
  IUserAuthRepository,
} from '@packages/core/auth/interfaces/user-repository.interface';
import { PasswordUtil } from '@packages/core/auth/utils/password.util';
import { PaginationParams, PaginationResponse } from '@tresdoce-nestjs-toolkit/paas';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService implements IUserAuthRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordUtil: PasswordUtil,
    private readonly logger: Logger,
  ) {}

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
    const hashedPassword = await this.passwordUtil.hashPassword(data.password);
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async update(id: number, changes: UpdateUserDto): Promise<User> {
    try {
      const updateData = { ...changes };

      // Hash password if it's being updated
      if (changes.password) {
        updateData.password = await this.passwordUtil.hashPassword(changes.password);
      }

      return await this.prisma.user.update({
        where: { id },
        data: updateData,
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

  async findUserByUsername(username: string): Promise<AuthUser | null> {
    return this.prisma.user.findFirst({ where: { name: username } });
  }

  async findUserByEmail(email: string): Promise<AuthUser | null> {
    try {
      return this.prisma.user.findFirst({ where: { email } });
    } catch (error) {
      this.logger.warn('没有通过email查询到用户', {
        email,
        error,
      });
      return null;
    }
  }
}
