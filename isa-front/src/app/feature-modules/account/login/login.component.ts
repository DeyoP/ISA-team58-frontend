// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { Account } from 'src/app/shared/model/account.model';
import { AuthenticationService } from '../../auth/auth.service';
import { SystemAdministrator } from 'src/app/shared/model/system-administrator.model';

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
  constructor(private fb: FormBuilder, private service: AuthenticationService, private router: Router, private accountService: AccountService) {}

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
    this.loginError = null;
  
    if (this.loginForm.valid) {
      const email = this.emailControl?.value;
      const password = this.passwordControl?.value;
  
      this.service.login(email, password).subscribe(
        response => {
          console.log('Login successful. Response:', response);
  
          const accessToken = response.accessToken;
          const decodedToken = this.service.decodeToken(accessToken);
          const userEmail = decodedToken.sub;

  
          localStorage.setItem('accessToken', accessToken);
  
          // Call the getAccountByEmail method to fetch additional user details
          this.accountService.getAccountByEmail(userEmail).subscribe(
            (account) => {
              this.service.setCurrentUser(account);
              
              console.log(account.roles);
              
              if (account) {
                if ('firstLogin' in account) {
                  const registeredUser = account as SystemAdministrator;
                  if (registeredUser.firstLogin) {
                    console.log('First login. Redirecting to /change-password');
                    this.router.navigate(['/change-password']);
                  } else {
                    console.log('Not first login. Redirecting to /');
                    this.router.navigate(['/']);
                  }
                } else {
                  console.log('Account does not have "firstLogin" property. Redirecting to /');
                  this.router.navigate(['/']);
                }
              } else {
                console.log('Account not found. Redirecting to /');
                this.router.navigate(['/']);
              }
            },
            (error) => {
              console.error('Error fetching user details:', error);
              // Handle the error
            }
          );
  
        },
        error => {
          console.error('Login failed:', error);
          this.loginError = 'Invalid email or password';
        }
      );
    }
  }
  

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
