import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '@prisma/client';
import { PrismaService } from '@app/common/services/prisma.service';

const mockUser: User = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockUsersService = {
  findAll: jest.fn().mockResolvedValue({ data: [mockUser], meta: { total: 1 } }),
  findOne: jest.fn().mockResolvedValue(mockUser),
  create: jest.fn().mockResolvedValue(mockUser),
  update: jest.fn().mockResolvedValue(mockUser),
  remove: jest.fn().mockResolvedValue(mockUser),
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        // Provide a mock for PrismaService even if not directly used by controller,
        // in case the real service gets instantiated by mistake.
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call findAll on service', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call findOne on service', async () => {
    const id = 1;
    await controller.findOne(id);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should call create on service', async () => {
    const dto: CreateUserDto = { name: 'New User', email: 'new@example.com', gender: 'x', seniority: 'jr', experience: '' };
    await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should call update on service', async () => {
    const id = 1;
    const dto: UpdateUserDto = { name: 'Updated User' };
    await controller.update(id, dto);
    expect(service.update).toHaveBeenCalledWith(id, dto);
  });

  it('should call remove on service', async () => {
    const id = 1;
    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});