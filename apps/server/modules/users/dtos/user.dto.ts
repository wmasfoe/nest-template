import { IsEmail, IsOptional, IsString, Length, IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Juan Perez',
    description: 'The full name of the user.',
    required: false,
  })
  readonly name: string;

  @IsString()
  @Length(8, 16)
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

export class UpdateUserDto {
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
  @IsOptional()
  @ApiProperty({
    example: '123456',
    description: 'The password of the user.',
  })
  readonly password?: string;
}
