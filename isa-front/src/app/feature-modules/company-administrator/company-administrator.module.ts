import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyAdministratorOverviewComponent } from './company-administrator-overview/company-administrator-overview.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CompanyAdministratorOverviewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CompanyAdministratorOverviewComponent
  ]
})
export class CompanyAdministratorModule { }
