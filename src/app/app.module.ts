import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ImportExcelComponent } from './import-excel/import-excel.component';
import { FileUploadModule } from 'ng2-file-upload';
import { UploadSummaryComponent } from './upload-summary/upload-summary.component';
import { ManageCompanyComponent } from './manage-company/manage-company.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { ManangeStockexhangeComponent } from './manange-stockexhange/manange-stockexhange.component';
import { AddStockexchangeComponent } from './add-stockexchange/add-stockexchange.component';
import { EditStockexchangeComponent } from './edit-stockexchange/edit-stockexchange.component';
import { ManageIpoComponent } from './manage-ipo/manage-ipo.component';
import { AddIpoComponent } from './add-ipo/add-ipo.component';
import { EditIpoComponent } from './edit-ipo/edit-ipo.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { IpoListComponent } from './ipo-list/ipo-list.component';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      AdminMenuComponent,
      UserMenuComponent,
      ImportExcelComponent,
      UploadSummaryComponent,
      ManageCompanyComponent,
      AddCompanyComponent,
      EditCompanyComponent,
      ManangeStockexhangeComponent,
      AddStockexchangeComponent,
      EditStockexchangeComponent,
      ManageIpoComponent,
      AddIpoComponent,
      EditIpoComponent,
      UserRegisterComponent,
      EditUserComponent,
      IpoListComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      FileUploadModule,
      ToastrModule.forRoot()
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
