import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyAdministratorOverviewComponent } from './company-administrator-overview/company-administrator-overview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';



@NgModule({
  declarations: [
    CompanyAdministratorOverviewComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FullCalendarModule,
  ],
  exports: [
    CompanyAdministratorOverviewComponent
  ]
})
export class CompanyAdministratorModule { }
