import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { Repository } from '@app/common/domain/abstract/abstract.repository';
import { User } from '@app/user/domain/interface/user.interface';

@Injectable()
export abstract class UserRepository<T> extends Repository<T, User> {
  abstract getUsers(): Observable<User[]>;
  abstract getUserById(userId: number): Observable<User>;
}
