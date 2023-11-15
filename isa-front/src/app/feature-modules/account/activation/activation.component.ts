import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/shared/model/account.model';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent {

  activationResult: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService
  ) {
    this.activatedRoute.params.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.activateAccount(token);
      }
    });
  }

  activateAccount(token: string): void {
    this.accountService.activateAccount(token).subscribe(
      result => this.activationResult = result,
      error => console.error(error)
    );
  }
}
