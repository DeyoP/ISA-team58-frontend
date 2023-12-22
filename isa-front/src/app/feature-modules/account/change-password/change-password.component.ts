import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SystemAdministratorService } from '../../system-administrator/system-administrator.service';
import { AccountService } from '../account.service';
import { Account } from 'src/app/shared/model/account.model';
import { SystemAdministrator } from 'src/app/shared/model/system-administrator.model';
import { AuthenticationService } from '../../auth/auth.service';
import { CompanyAdministratorService } from '../../company-administrator/company-administrator.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm: FormGroup;
  loggedInUser: Account | null = null;

  constructor(private fb: FormBuilder, private service: SystemAdministratorService, private authService: AuthenticationService, private companyAdminService: CompanyAdministratorService, private accountService: AccountService) {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.loggedInUser = this.authService.currentUserValue;
  }

  onSubmit() {
    if (this.passwordForm.valid) {

      if(this.accountService.hasRole(this.loggedInUser, "ROLE_SYSTEM_ADMIN")){

        console.log("changing sysadmin")
      this.service.updatePassword(this.loggedInUser!.id, this.passwordForm.value.password).subscribe(
        response => {
          console.log('Password updated successfully:', response);
          // Handle success
        },
        error => {
          console.error('Error updating password:', error);
          // Handle error
        }
      );
      }else if(this.accountService.hasRole(this.loggedInUser, "ROLE_COMPANY_ADMIN")){
        console.log("changing compadmin")

        this. companyAdminService.updatePassword(this.loggedInUser!.id, this.passwordForm.value.password).subscribe(
          response => {
            console.log('Password updated successfully:', response);
            // Handle success
          },
          error => {
            console.error('Error updating password:', error);
            // Handle error
          }
        );
        }
    }
  }


}