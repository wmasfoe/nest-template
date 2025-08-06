import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  LoggerService,
  Param,
  Post,
  Put,
  Version,
} from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  Pagination,
  PaginationParams,
  PaginationResponse,
  PaginationParamsDto,
} from '@tresdoce-nestjs-toolkit/paas';

import { User } from '@prisma/client';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { UserSwaggerDto } from '../dtos/user.swagger.dto';
import { Public } from '@app/common/auth/decorators';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @ApiOperation({
    summary: 'Get all users with pagination',
    description: 'Retrieves a list of users with optional pagination.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users retrieved successfully.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginationResponse) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(UserSwaggerDto) },
            },
          },
        },
      ],
    },
  })
  @ApiExtraModels(UserSwaggerDto)
  @ApiQuery({ type: PaginationParamsDto })
  @Get() // api/users
  findAll(@Pagination() pagination?: PaginationParams): Promise<PaginationResponse<User>> {
    this.logger.log('user.controller.findAll', pagination);
    return this.usersService.findAll(pagination);
  }

  @Version('2')
  @Get() // api/v2/users
  async findAllV2(
    @Pagination() pagination?: PaginationParams,
  ): Promise<PaginationResponse<User> & { version: string }> {
    this.logger.log('user.controller.findAllV2', pagination);
    const res = await this.usersService.findAll(pagination);
    return {
      version: '2',
      ...res,
    };
  }

  @ApiOperation({
    summary: 'Find user',
  })
  @ApiResponse({
    status: 200,
    description: 'Return user by id',
    type: CreateUserDto,
    isArray: false,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: Object,
    isArray: false,
  })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Public()
  @ApiOperation({
    summary: 'Create user',
  })
  @ApiBody({
    type: CreateUserDto,
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'Return user created',
    type: UserSwaggerDto,
    isArray: false,
  })
  @Post()
  create(@Body() payload: CreateUserDto): Promise<User> {
    return this.usersService.create(payload);
  }

  @ApiOperation({
    summary: 'Update user',
  })
  @ApiResponse({
    status: 201,
    description: 'Return user updated',
    type: CreateUserDto,
    isArray: false,
  })
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateUserDto): Promise<User> {
    return this.usersService.update(+id, payload);
  }

  @ApiOperation({
    summary: 'Delete user',
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted',
    //type: Boolean,
    //isArray: false,
  })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<any> {
    return this.usersService.remove(+id);
  }
}
