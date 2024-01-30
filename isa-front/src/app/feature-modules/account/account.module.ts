import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivationComponent } from './activation/activation.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileOverviewComponent } from './profile-overview/profile-overview.component';
import { AppointmentsOverviewComponent } from './appointments-overview/appointments-overview.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ActivationComponent,
    EditUserComponent,
    ChangePasswordComponent,
    ProfileOverviewComponent,
    AppointmentsOverviewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
  ]
})
export class AccountModule { }
