import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

import { User } from '@app/user/domain/interface/user.interface';

type UserParams = Pick<User, 'name'>;

export class UserDTO implements UserParams {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
}
