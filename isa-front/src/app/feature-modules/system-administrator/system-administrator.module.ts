import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompanyRegistrationComponent } from './company-registration/company-registration.component';
import { AdministratorRegistrationComponent } from './administrator-registration/administrator-registration.component';
import { ComplaintsComponent } from './complaints/complaints.component';



@NgModule({
  declarations: [
    CompanyRegistrationComponent,
    AdministratorRegistrationComponent,
    ComplaintsComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ]
})
export class SystemAdministratorModule { }
