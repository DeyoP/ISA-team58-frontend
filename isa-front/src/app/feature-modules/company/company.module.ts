import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyOverviewComponent } from './company-overview/company-overview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewCompaniesComponent } from './view-companies/view-companies.component';
import { FormsModule } from '@angular/forms';
import { TimeSlotsModalComponent } from './time-slots-modal/time-slots-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

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
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonToggleModule,
  ],
  exports: [
    CompanyOverviewComponent
  ]
})
export class CompanyModule { }
