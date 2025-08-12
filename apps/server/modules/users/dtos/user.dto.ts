import { IsEmail, IsOptional, IsString, Length, IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import type { CreateUserRequest } from '@packages/shared';
import { USER_CONSTRAINTS } from '@packages/shared';

export class CreateUserDto implements CreateUserRequest {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Juan Perez',
    description: 'The full name of the user.',
    required: false,
  })
  readonly name: string;

  @IsString()
  @Length(USER_CONSTRAINTS.password.minLength, USER_CONSTRAINTS.password.maxLength)
  @ApiProperty({
    example: '12345678',
    description: 'The password of the user.',
  })
  readonly password: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'juan.perez@mail.com',
    description: 'The email address of the user. It is unique and used for login.',
  })
  readonly email: string;
}

export class UpdateUserDto implements Partial<CreateUserRequest> {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Juan Perez',
    description: 'The full name of the user.',
  })
  readonly name?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  @ApiProperty({
    example: 'juan.perez@mail.com',
    description: 'The email address of the user. It is unique and used for login.',
  })
  readonly email?: string;

  @IsString()
  @Length(USER_CONSTRAINTS.password.minLength, USER_CONSTRAINTS.password.maxLength)
  @IsOptional()
  @ApiProperty({
    example: '123456',
    description: 'The password of the user.',
  })
  readonly password?: string;
}
