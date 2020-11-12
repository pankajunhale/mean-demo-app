import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SampleViewComponent } from './sample/view/sample-view/sample-view.component';
import { UserMasterListComponent } from './user-master-list/user-master-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RoleMasterComponent } from './role-master/role-master.component';
import { RoleAccessRelationComponent } from './role-access-relation/role-access-relation.component';

const routes: Routes = [
  {
    path: '', component: LoginPageComponent
  }, 
  {
    path: 'userList', component: UserMasterListComponent
  },
  {
    path: 'createUser/:id/:pageStatus', component: CreateUserComponent
  },
  {
    path: 'login', component: LoginPageComponent
  },
  {
    path: 'roleMaster', component: RoleMasterComponent
  },
  {
    path: 'roleAccessRelation', component: RoleAccessRelationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

