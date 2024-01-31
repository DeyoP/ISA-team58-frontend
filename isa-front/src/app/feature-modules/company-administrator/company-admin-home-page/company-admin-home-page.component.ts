import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/auth.service';
import { CompanyService } from '../../company/company.service';
import { Company } from 'src/app/shared/model/company.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-company-admin-home-page',
  templateUrl: './company-admin-home-page.component.html',
  styleUrls: ['./company-admin-home-page.component.css']
})
export class CompanyAdminHomePageComponent implements OnInit {

  isMenuOpen = false;
  userId: any;
  companyId: number | undefined;
 
  constructor(private authService: AuthenticationService, private companyService: CompanyService, private router: Router) {}

  ngOnInit(): void {
    const user = this.authService.currentUserValue;
    this.userId = user ? user.id : null;

    this.companyService.getCompanyByAdmin(this.userId).subscribe(
      (company: Company) => {
          this.companyId = company.id;
          console.log('Podaci o kompaniji:', company);
      },
      (error) => {
        console.error('Greška pri dobavljanju podataka o kompaniji:', error);
      }
    );
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
 
}
