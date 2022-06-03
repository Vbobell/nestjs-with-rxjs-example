import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { User } from '@/app/user/domain/user/interface/user.interface';

@Injectable()
export abstract class UserRepository {
  abstract getUsers(): Observable<User[]>;
}
