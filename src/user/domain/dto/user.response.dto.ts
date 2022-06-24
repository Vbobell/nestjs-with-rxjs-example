import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

import { User } from '@app/user/domain/interface/user.interface';

type UserParams = Pick<User, 'id' | 'name'>;

export class UserResponseDTO implements UserParams {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
}
