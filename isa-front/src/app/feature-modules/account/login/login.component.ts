// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  hidePassword = true;

  constructor(private fb: FormBuilder, private service: AccountService) {}

  ngOnInit() {

    this.service.getWelcomeMessage().subscribe(
      data => {
        let welcomeMessage = data.message;
        console.log(welcomeMessage)
      },
      error => {
        console.error('Error fetching welcome message:', error);
      }
    );

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      // Your login logic here
      console.log('Form submitted');
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
