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
import { EquipmentOverviewComponent } from './feature-modules/equipment/equipment-overview/equipment-overview.component';
import { AvailableTimeSlotsOverviewComponent } from './feature-modules/available-time-slots/available-time-slots-overview/available-time-slots-overview.component';
import { ComplaintsComponent } from './feature-modules/system-administrator/complaints/complaints.component';
import { AdministratorRegistrationComponent } from './feature-modules/system-administrator/administrator-registration/administrator-registration.component';
import { ChangePasswordComponent } from './feature-modules/account/change-password/change-password.component';
import { CalendarComponent } from './feature-modules/company-administrator/calendar/calendar.component';
import { CompanyAdminHomePageComponent } from './feature-modules/company-administrator/company-admin-home-page/company-admin-home-page.component';
import { ProfileOverviewComponent } from './feature-modules/account/profile-overview/profile-overview.component';
import { AppointmentsOverviewComponent } from './feature-modules/account/appointments-overview/appointments-overview.component';
import { EquipmentReservationQrComponent } from './feature-modules/equipment/equipment-reservation-qr/equipment-reservation-qr.component';
//import { CompanyAdminHomePageComponent } from './feature-modules/company-administrator/company-admin-home-page/company-admin-home-page.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'activate/:token', component: ActivationComponent },
  { path: 'editUser', component: EditUserComponent},
  { path: 'company-registration', component: CompanyRegistrationComponent },
  { path: 'company-search', component: CompanySearchComponent },
  { path: 'equipment-search', component: EquipmentSearchComponent },
  { path: 'company/:id', component: CompanyOverviewComponent },
  { path: 'view-companies', component: ViewCompaniesComponent },
  { path: 'companies/:id', component: CompanyOverviewComponent },
  { path: 'equipmentReservationQR', component: EquipmentReservationQrComponent },
  { path: 'companyAdministrator/:id', component: CompanyAdministratorOverviewComponent},
  { path: 'company/:id/equipments', component: EquipmentOverviewComponent},
  { path: 'availableTimeSlots', component: AvailableTimeSlotsOverviewComponent},
  { path: 'complaints', component: ComplaintsComponent},
  { path: 'administratorRegistration', component: AdministratorRegistrationComponent},
  { path: 'change-password', component: ChangePasswordComponent},
  { path: 'calendar', component: CalendarComponent},
  { path: 'companyAdminHome', component: CompanyAdminHomePageComponent},
  { path: 'companyAdminHome', component: CompanyAdministratorOverviewComponent},
  { path: 'profile-overview', component: ProfileOverviewComponent},
  { path: 'profile-overview/edit-user', component: EditUserComponent},
  { path: 'equipment-appointments', component: AppointmentsOverviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


