import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRegistrationComponent } from './company-registration/company-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministratorRegistrationComponent } from './administrator-registration/administrator-registration.component';
import { ComplaintsComponent } from './complaints/complaints.component';



@NgModule({
  declarations: [
    CompanyRegistrationComponent,
    AdministratorRegistrationComponent,
    ComplaintsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SystemAdministratorModule { }
