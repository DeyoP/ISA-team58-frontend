import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyOverviewComponent } from './company-overview/company-overview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewCompaniesComponent } from './view-companies/view-companies.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CompanyOverviewComponent,
    ViewCompaniesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CompanyOverviewComponent
  ]
})
export class CompanyModule { }
