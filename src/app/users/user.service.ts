import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from './user';

const users: User[] = [{
  id: 0,
  email: '0@mail.com',
  name: 'John0',
  surname: 'Doe0'
}, {
  id: 1,
  email: '1@mail.com',
  name: 'John1',
  surname: 'Doe1'
}, {
  id: 2,
  email: '2@mail.com',
  name: 'John2',
  surname: 'Doe2'
}];

@Injectable()
export class UserService {

  private $users: Observable<User[]>;

  constructor() {
    this.$users = Observable.of(users);
  }

  all() {
    return this.$users;
  }

  getUser(id: number): Observable<User> {
    return Observable.create(function ($observer) {
      setTimeout(function () {
        const user = users.find(function (_user) {
          return _user.id === id;
        });
        $observer.next(user);
      }, 1000);
    });
  }

  save(user: User): Observable<User> {
    return Observable.create(($observer) => {
      setTimeout(function () {
        const index = users.findIndex(_user => user.id === _user.id);
        users.splice(index, 1, user);
        $observer.next(user);
        this.$users.next(users);
      }, 1000);
    });
  }

  isUniq(email: string, omitId: number): Observable<boolean> {
    return Observable.create(($observer) => {
      setTimeout(function () {
        const index = users.findIndex(user => user.email === email && omitId !== user.id);
        $observer.next(index === -1);
      }, 1000);
    });
  }



}

