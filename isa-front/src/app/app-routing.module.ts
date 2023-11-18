import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivationComponent } from './feature-modules/account/activation/activation.component';
import { LoginComponent } from './feature-modules/account/login/login.component';
import { RegisterComponent } from './feature-modules/account/register/register.component';
import { EditUserComponent } from './feature-modules/account/edit-user/edit-user.component';
import { CompanyRegistrationComponent } from './feature-modules/system-administrator/company-registration/company-registration.component';
import { CompanySearchComponent } from './feature-modules/search/company-search/company-search.component';
import { EquipmentSearchComponent } from './feature-modules/search/equipment-search/equipment-search.component';
import { CompanyOverviewComponent } from './feature-modules/company/company-overview/company-overview.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'activate/:token', component: ActivationComponent },
  { path: 'editUser/:id', component: EditUserComponent },
  { path: 'company-registration', component: CompanyRegistrationComponent },
  { path: 'company-search', component: CompanySearchComponent },
  { path: 'equipment-search', component: EquipmentSearchComponent },
  { path: 'company/:id', component: CompanyOverviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
