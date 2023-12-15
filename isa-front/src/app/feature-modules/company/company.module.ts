import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyOverviewComponent } from './company-overview/company-overview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewCompaniesComponent } from './view-companies/view-companies.component';
import { FormsModule } from '@angular/forms';
import { TimeSlotsModalComponent } from './time-slots-modal/time-slots-modal.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    CompanyOverviewComponent,
    ViewCompaniesComponent,
    TimeSlotsModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
  ],
  exports: [
    CompanyOverviewComponent
  ]
})
export class CompanyModule { }
