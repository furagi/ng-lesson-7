import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  user: User;
  email: FormControl;
  userForm: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _users: UserService, private _router: Router,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this._route.parent.params
      .switchMap((params: Params) => this._users.getUser(+params['id']))
      .subscribe(user => {
        this.user = user;
        this.email = new FormControl(
          user.email,
          [Validators.required, emailValidator],
          uniqValidatorFactory(this._users, this.user)
        );
        this.userForm = new FormGroup({
          name: new FormControl(user.name, [Validators.required]),
          surname: new FormControl(user.surname, [Validators.required]),
          email: this.email
        });
      });
  }

  save() {
    if (!this.userForm.valid) {
      return;
    }
    this._users.save({ ...this.userForm.value, id: this.user.id })
      .subscribe(() => this._router.navigate(['../']));
  }

}

function uniqValidatorFactory(users: UserService, user: User) {
  return function (formControl: FormControl) {
    return users.isUniq(formControl.value, user.id)
      .take(1) // https://github.com/angular/angular/issues/13200
      .map(function (uniq) {
        if (uniq) {
          return null;
        } else {
          return { uniq: { error: `the email address isn't uniq` } };
        }
      });
  };
}

function emailValidator(formControl: FormControl) {
  const email: string = formControl.value;
  const error = { email: { error: 'invalid email' } };
  if (!email || typeof email !== 'string' || !email.match(/.+@.+\..+/i)) {
    return error;
  }
  return null;
}
