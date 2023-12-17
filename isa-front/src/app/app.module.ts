// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AccountModule } from './feature-modules/account/account.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CompanyModule } from './feature-modules/company/company.module';
import { EquipmentModule } from './feature-modules/equipment/equipment.module';
import { SearchModule } from './feature-modules/search/search.module';
import { CompanyAdministratorModule } from './feature-modules/company-administrator/company-administrator.module';
import { SystemAdministratorModule } from './feature-modules/system-administrator/system-administrator.module';
import { AvailableTimeSlotsModule } from './feature-modules/available-time-slots/available-time-slots.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AccountModule,
    CompanyModule,
    EquipmentModule,
    SearchModule,
    EquipmentModule, 
    CompanyAdministratorModule,
    SystemAdministratorModule,
    AvailableTimeSlotsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
