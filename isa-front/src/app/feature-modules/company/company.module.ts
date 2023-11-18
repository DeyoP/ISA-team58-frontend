import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyOverviewComponent } from './company-overview/company-overview.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CompanyOverviewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CompanyOverviewComponent
  ]
})
export class CompanyModule { }
