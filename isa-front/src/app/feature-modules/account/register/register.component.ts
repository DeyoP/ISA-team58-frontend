// register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  hidePassword: boolean = true; // Add this property
  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      job: ['', [Validators.required]],
      workplace: ['', [Validators.required]],
    });
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

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  ngOnInit(): void {}

  onSubmit() {
    // Handle form submission here
  }
}
