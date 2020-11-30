import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing-module';
import { SampleViewComponent } from './sample/view/sample-view/sample-view.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './login-page/login-page.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { HeaderComponent } from './header/header.component';
import { DataTablesModule } from 'angular-datatables';
import { MasterPageComponent } from './master-page/master-page.component';
import { UserMasterListComponent } from './user-master-list/user-master-list.component';
import { UserService } from './services/user.service';
import { CreateUserComponent } from './create-user/create-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RoleMasterComponent } from './role-master/role-master.component';
import { RoleAccessRelationComponent } from './role-access-relation/role-access-relation.component';
import { CustomerMasterListComponent } from './customer-master-list/customer-master-list.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CustomerService } from './services/customer.service';
import { CommonService } from './services/common.service';
import { FileLocationComponent } from './file-location/file-location.component';
import { ProcessingListComponent } from './processing-list/processing-list.component';
import { DefineFileDetailsComponent } from './define-file-details/define-file-details.component';
import { FileMappingComponent } from './file-mapping/file-mapping.component';
import { CreateInterfaceComponent } from './create-interface/create-interface.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    SampleViewComponent,
    LoginPageComponent,
    SidebarMenuComponent,
    HeaderComponent,
    MasterPageComponent,
    UserMasterListComponent,
    CreateUserComponent,
    RoleMasterComponent,
    RoleAccessRelationComponent,
    CustomerMasterListComponent,
    CreateCustomerComponent,
    FileLocationComponent,
    ProcessingListComponent,
    DefineFileDetailsComponent,
    FileMappingComponent,
    CreateInterfaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule,
    AutocompleteLibModule
  ],
  providers: [CommonService,UserService, CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
