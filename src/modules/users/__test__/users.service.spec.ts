import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@app/common/services/prisma.service';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '@prisma/client';

const mockUser: User = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockPrismaService = {
  user: {
    findMany: jest.fn().mockResolvedValue([mockUser]),
    findUnique: jest.fn().mockResolvedValue(mockUser),
    create: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue(mockUser),
    delete: jest.fn().mockResolvedValue(mockUser),
    count: jest.fn().mockResolvedValue(1),
  },
};

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a paginated list of users', async () => {
      const response = await service.findAll({ page: 1, size: 10 });
      expect(prisma.user.count).toHaveBeenCalled();
      expect(prisma.user.findMany).toHaveBeenCalledWith({ skip: 0, take: 10 });
      expect(response.data).toEqual([mockUser]);
      expect(response.meta.total).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const id = 1;
      await service.findOne(id);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id } });
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow('User #999 not found');
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const dto: CreateUserDto = { name: 'New User', email: 'new@example.com', gender: 'x', seniority: 'jr', experience: '' };
      await service.create(dto);
      expect(prisma.user.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const id = 1;
      const dto: UpdateUserDto = { name: 'Updated User' };
      await service.update(id, dto);
      expect(prisma.user.update).toHaveBeenCalledWith({ where: { id }, data: dto });
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const id = 1;
      await service.remove(id);
      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id } });
    });
  });
});