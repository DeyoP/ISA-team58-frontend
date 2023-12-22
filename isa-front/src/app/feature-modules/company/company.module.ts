import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyOverviewComponent } from './company-overview/company-overview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewCompaniesComponent } from './view-companies/view-companies.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { CompanyAdministratorModule } from '../company-administrator/company-administrator.module';

@NgModule({
  declarations: [
    CompanyOverviewComponent,
    ViewCompaniesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatTableModule,
    CompanyAdministratorModule,
  ],
  exports: [
    CompanyOverviewComponent
  ]
})
export class CompanyModule { }
