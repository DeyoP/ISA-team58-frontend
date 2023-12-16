import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SystemAdministratorService } from '../../system-administrator/system-administrator.service';
import { AccountService } from '../account.service';
import { Account } from 'src/app/shared/model/account.model';
import { SystemAdministrator } from 'src/app/shared/model/system-administrator.module';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm: FormGroup;
  loggedInUser: Account | null = null;

  constructor(private fb: FormBuilder, private service: SystemAdministratorService, private accountService: AccountService) {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.accountService.getLoggedInAccount().subscribe({
      next: (result) => {
        this.loggedInUser = result;
        console.log(this.loggedInUser)
      }
    });
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      let updatedUser: SystemAdministrator = {
        id: this.loggedInUser!.id,
        email: this.loggedInUser!.email,
        password: this.passwordForm.value.password,
        isActive: true,
        isDeleted: false,
        dtype: 'SystemAdministrator',
        firstLogin: false,
      }

      this.service.updateSystemAdministrator(updatedUser).subscribe();
    } else {
      console.log('not good');
    }
  }
}
