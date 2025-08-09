import { ApiProperty } from '@nestjs/swagger';
import type { User } from '@prisma/client';

export abstract class UserSwaggerDto
  implements Pick<User, 'id' | 'email' | 'name' | 'createdAt' | 'updatedAt'>
{
  private constructor() {}

  @ApiProperty({
    description: 'The password of the user.',
    example: '123456',
  })
  password: string;

  @ApiProperty({
    description: 'The unique identifier of the user.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The email address of the user.',
    example: 'test@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The full name of the user.',
    example: 'Test User',
    required: false,
    nullable: true,
  })
  name: string | null;

  @ApiProperty({
    description: 'The date and time the user was created.',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time the user was last updated.',
  })
  updatedAt: Date;
}
