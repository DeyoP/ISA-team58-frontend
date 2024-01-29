import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/auth.service';

@Component({
  selector: 'app-company-admin-home-page',
  templateUrl: './company-admin-home-page.component.html',
  styleUrls: ['./company-admin-home-page.component.css']
})
export class CompanyAdminHomePageComponent implements OnInit {

  isMenuOpen = false;
  userId: any;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    const user = this.authService.currentUserValue;
    this.userId = user ? user.id : null;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
}
