import { IsNotEmpty, IsString, Length } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address used as account identifier.',
  })
  readonly account: string;

  @IsString()
  @Length(8, 16)
  @IsNotEmpty()
  @ApiProperty({
    example: 'password123',
    description: 'User password (8-16 characters).',
  })
  readonly password: string;
}
