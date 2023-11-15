// register.component.ts
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/shared/model/account.model';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  currentStep: number = 0;
  formSteps = ['personalInfo', 'locationInfo', 'contactWorkInfo', 'passwordInfo', 'emailInfo'];

  constructor(private fb: FormBuilder, private service: AccountService) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      job: ['', [Validators.required]],
      workplace: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.passwordMatchValidator });
  }
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
  
    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { 'passwordMismatch': true };
    } else {
      control.get('confirmPassword')?.setErrors(null);
      return null;
    }
  }
  
  
  get firstNameControl() {
    return this.registrationForm.get('firstName');
  }

  get lastNameControl() {
    return this.registrationForm.get('lastName');
  }

  get cityControl() {
    return this.registrationForm.get('city');
  }

  get countryControl() {
    return this.registrationForm.get('country');
  }

  get phoneNumberControl() {
    return this.registrationForm.get('phoneNumber');
  }

  get jobControl() {
    return this.registrationForm.get('job');
  }

  get workplaceControl() {
    return this.registrationForm.get('workplace');
  }
  get emailControl() {
    return this.registrationForm.get('email');
  }
  get passwordControl() {
    return this.registrationForm.get('password');
  }

  get confirmPasswordControl() {
    return this.registrationForm.get('confirmPassword');
  }

  nextStep() {
    if (this.currentStep < this.formSteps.length - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
  ngOnInit(): void {}

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData: Account = {
        firstName: this.registrationForm.value.firstName,
        lastName: this.registrationForm.value.lastName,
        city: this.registrationForm.value.city,
        country: this.registrationForm.value.country,
        phoneNumber: this.registrationForm.value.phoneNumber,
        job: this.registrationForm.value.job,
        workplaceId: 0, // Assuming workplaceId corresponds to the workplace field
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
        id: 0, // You can set a default value for id or adjust as needed
        isActive:false,
        isDeleted:false,
      };

      this.service.saveAccount(formData).subscribe(
        () => {
          console.log('Account saved successfully!');
        },
        (error) => {
          console.error('Error saving account:', error);
        }
      );
    }
  }
}
