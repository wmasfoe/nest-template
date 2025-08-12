import { IsNotEmpty, IsString, Length } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import type { LoginRequest } from '@packages/shared';
import { USER_CONSTRAINTS } from '@packages/shared';

export class AuthLoginDto implements LoginRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address used as account identifier.',
  })
  readonly account: string;

  @IsString()
  @Length(USER_CONSTRAINTS.password.minLength, USER_CONSTRAINTS.password.maxLength)
  @IsNotEmpty()
  @ApiProperty({
    example: 'password123',
    description: 'User password (8-16 characters).',
  })
  readonly password: string;
}
