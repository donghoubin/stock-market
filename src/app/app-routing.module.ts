import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { ImportExcelComponent } from './import-excel/import-excel.component';
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

const routes: Routes = [
        {path:'',component:LoginComponent},
         {path: 'adminmenu',component: AdminMenuComponent,
         children:[{path:'importexcel',component: ImportExcelComponent},
                    {path:'uploadsummary',component: UploadSummaryComponent},
                    {path:'managecompany',component: ManageCompanyComponent},
                    {path:'addcompany',component: AddCompanyComponent},
                    {path:'editcompany',component: EditCompanyComponent},
                    {path:'managestockexchange',component: ManangeStockexhangeComponent},
                    {path:'addstockexchange',component: AddStockexchangeComponent},
                    {path:'editstockexchange',component: EditStockexchangeComponent},
                    {path:'manageipo',component: ManageIpoComponent},
                    {path:'addipo',component: AddIpoComponent},
                    {path:'editipo',component: EditIpoComponent}]},
          {path: 'usermenu', component: UserMenuComponent,
          children:[{path:'edituser',component: EditUserComponent},
                     {path:'ipolist',component: IpoListComponent}]},
          {path: 'userregister', component: UserRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
