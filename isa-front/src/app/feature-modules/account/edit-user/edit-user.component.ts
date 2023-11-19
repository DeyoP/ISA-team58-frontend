import { Component, OnDestroy, OnChanges, OnInit } from '@angular/core';
import { RegisteredUser } from 'src/app/shared/model/registered-user.model';
import { Account } from 'src/app/shared/model/account.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../account.service';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnChanges, OnDestroy, OnInit {

  loggedInAccount: RegisteredUser | null = null;
  editUserForm: FormGroup;

  submitted = false;
  private subscription!: Subscription; 

  constructor(private fb: FormBuilder, private accountService: AccountService) {
    this.editUserForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      city: [''],
      country: [''],
      phoneNumber: [''],
      job: [''],
      password: [''],
    });
  }
  
  
  private populateFormWithUserData() {
    if (this.loggedInAccount) {
      this.editUserForm.patchValue({
        firstName: this.loggedInAccount.firstName,
        lastName: this.loggedInAccount.lastName,
        city: this.loggedInAccount.city,
        country: this.loggedInAccount.country,
        phoneNumber: this.loggedInAccount.phoneNumber,
        job: this.loggedInAccount.job,
        password: this.loggedInAccount.password // Assuming you don't want to display the password
      });
    }
  }
  
  ngOnInit(): void {
    this.accountService.getLoggedInAccount().subscribe(
      (account) => {
        this.loggedInAccount = account as RegisteredUser;
        this.populateFormWithUserData();
 
      }
    );
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

  if (this.editUserForm.valid) {
    // Create an object with the updated user data
    const updatedUserData: RegisteredUser = {
      id: this.loggedInAccount?.id ?? -1,
      workplaceId: this.loggedInAccount?.workplaceId ?? -1, 
      email: this.loggedInAccount?.email ?? "",
      password: this.editUserForm.value.password,
      isActive: true,
      isDeleted: false,
      dtype: this.loggedInAccount?.dtype ?? "",
      firstName: this.editUserForm.value.firstName,
      lastName: this.editUserForm.value.lastName,
      city: this.editUserForm.value.city,
      country: this.editUserForm.value.country,
      phoneNumber: this.editUserForm.value.phoneNumber,
      job: this.editUserForm.value.job,
    };

    this.accountService.setLoggedInAccount(updatedUserData);

    // Update the user data in the service
    this.accountService.updateRegisteredUser(updatedUserData).subscribe({
        next: () => {
          console.log('Account saved successfully!');
          this.populateFormWithUserData();
        }
      });
  }
}

}
