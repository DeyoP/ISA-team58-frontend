import { Component, OnDestroy, OnChanges, OnInit } from '@angular/core';
import { RegisteredUser } from 'src/app/shared/model/registered-user.model';
import { Account } from 'src/app/shared/model/account.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../account.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnChanges, OnDestroy, OnInit {

  account!: Account;
  user!: RegisteredUser;
  editUserForm: FormGroup;

  submitted = false;
  private subscription!: Subscription; 

  constructor(private fb: FormBuilder, private accountService: AccountService) {
    this.editUserForm = this.fb.group({
      // Define your form controls here
      firstName: [''],
      // Other form controls
    });
  }

  ngOnInit(): void {
    this.subscription = this.accountService.loggedInAccount$
      .pipe(
        map((account: Account | null) => account as RegisteredUser | null)
      )
      .subscribe((registeredUser: RegisteredUser | null) => {
        console.log("Registrovani korisnik:" + registeredUser?.id);
        if (registeredUser) {
          //this.account = registeredUser;
          //this.user = registeredUser;

          
          //this.user = this.accountService.getAccountById(1);
          
          

          console.log(this.user.firstName);

          // Update the form control
          this.editUserForm.patchValue({
            firstName: this.user.firstName,  //teba firstName: registeredUser.firstName,
            
          });

          console.log(registeredUser);
        }
      });
  }

  ngOnChanges(): void {
    // Handle ngOnChanges logic if needed
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit() {
    this.submitted = true;

    this.accountService.editRegisteredUser(this.account).subscribe(
      response => {
        console.log('Edit successful:', response);
        // Handle successful login, e.g., redirect to a new page
      },
      error => {
        console.error('Edit failed:', error);
      }
    );
  }
}
