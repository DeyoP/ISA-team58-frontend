import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivationComponent } from './feature-modules/account/activation/activation.component';
import { LoginComponent } from './feature-modules/account/login/login.component';
import { RegisterComponent } from './feature-modules/account/register/register.component';
import { CompanyOverviewComponent } from './feature-modules/company/company-overview/company-overview.component';
import { CompanyAdministratorOverviewComponent } from './feature-modules/company-administrator/company-administrator-overview/company-administrator-overview.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'activate/:token', component: ActivationComponent },
  { path: 'companies/:id', component: CompanyOverviewComponent },
  { path: 'companyAdministrator/:id', component: CompanyAdministratorOverviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
