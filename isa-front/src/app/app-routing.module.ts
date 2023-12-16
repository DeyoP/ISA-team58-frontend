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
import { ViewCompaniesComponent } from './feature-modules/company/view-companies/view-companies.component';
import { CompanyAdministratorOverviewComponent } from './feature-modules/company-administrator/company-administrator-overview/company-administrator-overview.component';
import { AdministratorRegistrationComponent } from './feature-modules/system-administrator/administrator-registration/administrator-registration.component';
import { ChangePasswordComponent } from './feature-modules/account/change-password/change-password.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'activate/:token', component: ActivationComponent },
  { path: 'editUser', component: EditUserComponent},
  { path: 'company-registration', component: CompanyRegistrationComponent },
  { path: 'administrator-registration', component: AdministratorRegistrationComponent },
  { path: 'company-search', component: CompanySearchComponent },
  { path: 'equipment-search', component: EquipmentSearchComponent },
  { path: 'company/:id', component: CompanyOverviewComponent },
  { path: 'view-companies', component: ViewCompaniesComponent },
  { path: 'companies/:id', component: CompanyOverviewComponent },
  { path: 'companyAdministrator/:id', component: CompanyAdministratorOverviewComponent },
  { path: 'change-password', component: ChangePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
