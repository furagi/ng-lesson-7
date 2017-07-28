import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;

  constructor(private _route: ActivatedRoute, private _users: UserService) { }

  ngOnInit() {
    this._route.params
      .switchMap((params: Params) => this._users.getUser(+params['id']))
      .subscribe(user => this.user = user);
  }

}


