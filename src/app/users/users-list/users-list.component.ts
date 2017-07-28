import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[];

  constructor(private _users: UserService) { }

  ngOnInit() {
    this._users.all()
    .subscribe((users) => {
      this.users = users;
    });
  }

}
