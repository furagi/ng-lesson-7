import { Route } from '@angular/router';

import { UsersListComponent } from './users/users-list/users-list.component';
import { UserComponent } from './users/user/user.component';
import { UserFormComponent } from './users/user-form/user-form.component';

const routes: Route[] = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  {
    path: 'users',
    data: { title: 'Users' },
    component: UsersListComponent
  }, {
    path: 'users/:id',
    data: { title: 'Show user' },
    component: UserComponent,
    children: [{
      path: 'edit',
      data: { title: 'Edit user' },
      component: UserFormComponent
    }]
  }
];

export { routes };