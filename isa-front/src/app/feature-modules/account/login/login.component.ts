// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { Account } from 'src/app/shared/model/account.model';
import { SystemAdministrator } from 'src/app/shared/model/system-administrator.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  hidePassword = true;
  loginError: string | null = null; 
  constructor(private fb: FormBuilder, private service: AccountService, private router: Router) {}

  ngOnInit() {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
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
    this.loginError = null; // Reset login error on each submit

    if (this.loginForm.valid) {
      const email = this.emailControl?.value;
      const password = this.passwordControl?.value;

      // Call the login method from the service
      this.service.login(email, password).subscribe(
        response => {
          console.log('Login successful:', response);

          this.service.getLoggedInAccount().subscribe(account => {
            if (account) {
              if ('firstLogin' in account) {
                const registeredUser = account as SystemAdministrator;
                if (registeredUser.firstLogin) {
                  this.router.navigate(['/change-password']);
                } else {
                  this.router.navigate(['/']);
                }
              } else {
                this.router.navigate(['/']);
              }
            } else {
              this.router.navigate(['/']);
            }
          })
        },
        error => {
          console.error('Login failed:', error);
          this.loginError = 'Invalid email or password';
          // Handle login error, e.g., display an error message
        }
      );
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
