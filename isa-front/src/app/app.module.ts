// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Updated import statement
import { AccountModule } from './feature-modules/account/account.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CompanyModule } from './feature-modules/company/company.module';
import { EquipmentModule } from './feature-modules/equipment/equipment.module';
import { SearchModule } from './feature-modules/search/search.module';
import { CompanyAdministratorModule } from './feature-modules/company-administrator/company-administrator.module';
import { SystemAdministratorModule } from './feature-modules/system-administrator/system-administrator.module';
import { AvailableTimeSlotsModule } from './feature-modules/available-time-slots/available-time-slots.module';

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
    AvailableTimeSlotsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
