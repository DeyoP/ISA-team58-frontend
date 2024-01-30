import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { AuthenticationService } from '../../auth/auth.service';
import { Account } from 'src/app/shared/model/account.model';
import { RegisteredUser } from 'src/app/shared/model/registered-user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.css']
})
export class ProfileOverviewComponent {
  loggedInAccount: Account | null = null;
  loggedInRegisteredUser : RegisteredUser | null = null;

  constructor(private accountService: AccountService, private authService: AuthenticationService) {

  }

  ngOnInit(): void {
    
    this.loggedInAccount =  this.authService.getCurrentUser();
    console.log(this.loggedInAccount);

    if (this.loggedInAccount) {
      this.loggedInRegisteredUser = this.loggedInAccount as RegisteredUser;
      console.log(this.loggedInRegisteredUser);
    }
  }

}
