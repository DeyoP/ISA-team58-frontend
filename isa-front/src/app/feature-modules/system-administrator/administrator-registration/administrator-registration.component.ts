import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SystemAdministrator } from 'src/app/shared/model/system-administrator.module';
import { SystemAdministratorService } from '../system-administrator.service';

@Component({
  selector: 'app-administrator-registration',
  templateUrl: './administrator-registration.component.html',
  styleUrls: ['./administrator-registration.component.css']
})
export class AdministratorRegistrationComponent {

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private service: SystemAdministratorService) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formValues = this.registrationForm.value;
      
      const newAdministrator: SystemAdministrator = {
        id: 0,
        email: formValues.email,
        password: formValues.password,
        isActive: true,
        isDeleted: false,
        dtype: 'SystemAdministrator',
        firstLogin: true,
      };

      this.service.saveSystemAdministrator(newAdministrator).subscribe();

    } else {
      console.log('not good');
    }
  }
}
