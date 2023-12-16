import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompanyRegistrationComponent } from './company-registration/company-registration.component';
import { AdministratorRegistrationComponent } from './administrator-registration/administrator-registration.component';



@NgModule({
  declarations: [
    CompanyRegistrationComponent,
    AdministratorRegistrationComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ]
})
export class SystemAdministratorModule { }
