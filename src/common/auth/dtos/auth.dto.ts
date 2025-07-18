import { IsNotEmpty, IsString, Length } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Juan Perez',
    description: 'The full name of the user.',
  })
  readonly account: string;

  @IsString()
  @Length(8, 16)
  @IsNotEmpty()
  @ApiProperty({
    example: '12345678',
    description: 'The password of the user.',
  })
  readonly password: string;
}
