import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '@/app/user/domain/user/interface/user.interface';

type UserParams = Pick<User, 'name'>;

export class UserDTO implements UserParams {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
}
