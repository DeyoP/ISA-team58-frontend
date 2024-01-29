import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyAdministratorOverviewComponent } from './company-administrator-overview/company-administrator-overview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CompanyAdminHomePageComponent } from './company-admin-home-page/company-admin-home-page.component';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    CompanyAdministratorOverviewComponent,
    CalendarComponent,
    CompanyAdminHomePageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FullCalendarModule,
    RouterLink
  ],
  exports: [
    CompanyAdministratorOverviewComponent,
    CalendarComponent,
    CompanyAdminHomePageComponent
  ]
})
export class CompanyAdministratorModule { }
