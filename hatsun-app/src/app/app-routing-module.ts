import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SampleViewComponent } from './sample/view/sample-view/sample-view.component';
import { UserMasterListComponent } from './user-master-list/user-master-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RoleMasterComponent } from './role-master/role-master.component';
import { RoleAccessRelationComponent } from './role-access-relation/role-access-relation.component';
import { CustomerMasterListComponent } from './customer-master-list/customer-master-list.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { FileLocationComponent } from './file-location/file-location.component';
import { ProcessingListComponent } from './processing-list/processing-list.component';
import { DefineFileDetailsComponent } from './define-file-details/define-file-details.component';
import { FileMappingComponent } from './file-mapping/file-mapping.component';
import { CreateInterfaceComponent } from './create-interface/create-interface.component';
import { InterfaceListComponent } from './interface-list/interface-list.component';

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
  },
  {
    path: 'customerList', component: CustomerMasterListComponent
  },
  {
    path: 'createCustomer/:id/:pageStatus', component: CreateCustomerComponent
  },
  {
    path: 'fileLocation', component: FileLocationComponent
  },
  {
    path: 'processingList', component: ProcessingListComponent
  },
  {
    path: 'defineFileDetails', component: DefineFileDetailsComponent
  },
  {
    path: 'fileMapping', component: FileMappingComponent
  },
  {
    path: 'createInterface', component: CreateInterfaceComponent
  },
  {
    path: 'interfaceList', component: InterfaceListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

