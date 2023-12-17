import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyAdministrator } from 'src/app/shared/model/company-administrator.model';
import { CompanyAdministratorService } from '../company-administrator.service';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../company/company.service';
import { Company } from 'src/app/shared/model/company.model';

@Component({
  selector: 'app-company-administrator-overview',
  templateUrl: './company-administrator-overview.component.html',
  styleUrls: ['./company-administrator-overview.component.css']
})
export class CompanyAdministratorOverviewComponent {
  companyAdmin: CompanyAdministrator = {} as CompanyAdministrator;
  companyAdminId: number | null = null;
  shouldRenderCompanyAdminForm = false;
  shouldEdit = false;
  companyAdminForm: FormGroup;

  shouldRenderChangePasswordForm = false;
  shouldChange = false;
  changePasswordForm: FormGroup;
  
  constructor(private companyAdminService: CompanyAdministratorService, private route: ActivatedRoute, private formBuilder: FormBuilder, private companyService: CompanyService) {
    this.companyAdminForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      company: ['', Validators.required]
    });

    this. changePasswordForm = this.formBuilder.group({
      oldPassword: [this.companyAdmin.password || '', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.companyAdminId = id ? parseInt(id, 10) : null;
  
      if (this.companyAdminId !== null) {
        this.getCompanyAdminDetails(this.companyAdminId);
      }
    });
  }
  
  private getCompanyAdminDetails(id: number): void {
    this.companyAdminService.getCompanyAdminById(id).subscribe({
      next: (result: CompanyAdministrator) => {
        this.companyAdmin = result;
        this.loadCompany(this.companyAdminId!)
      },
      error: () => {}
    });
  }

  loadCompany(adminId: number): void {
    if (this.companyAdmin && this.companyAdmin.company) {
      this.companyService.getCompanyByAdmin(adminId).subscribe({
        next: (company: Company) => {
          this.companyAdmin.company.name = company?.name || '';
        }
      });
    }
  }
  

  onEditClicked() {
    this.shouldEdit = true;
    this.shouldRenderCompanyAdminForm = true;

    this.companyAdminForm.patchValue({
      firstName: this.companyAdmin.firstName,
      lastName: this.companyAdmin.lastName,
      city: this.companyAdmin.city,
      country: this.companyAdmin.country,
      company: this.companyAdmin.company
    });
  }
  
  updateCompany() {
    if (this.companyAdminForm.valid) {
      const updatedCompanyAdmin: CompanyAdministrator = this.companyAdminForm.value;

      this.companyAdminService.updateCompanyAdmin(this.companyAdmin.id, updatedCompanyAdmin).subscribe(
          () => {
              this.companyAdmin = updatedCompanyAdmin;
              this.shouldRenderCompanyAdminForm = false;
              this.shouldEdit = false;
              console.log('Company administrator updated successfully');
           },
          error => {
              console.error('Error updating company administrator:', error);
          }
      );
    }
  }
  
  cancelUpdate() {
    this.shouldEdit = false;
    this.shouldRenderCompanyAdminForm = false;
  }

  onChangePasswordClicked() {
    this.shouldChange = true;
    this.shouldRenderChangePasswordForm = true;

    this.changePasswordForm.patchValue({
      oldPassword: this.companyAdmin.password,
    });
  }
  
  changePassword() {
    if (this.changePasswordForm.valid) {
      const oldPassword = this.changePasswordForm.get('oldPassword')?.value;
      const newPassword = this.changePasswordForm.get('newPassword')?.value;
  
      // Dodajte proveru da li stara lozinka odgovara trenutnoj lozinci korisnika
      if (oldPassword !== this.companyAdmin.password) {
        console.error('Old password does not match current password');
        // Dodajte odgovarajući korisnički interfejs ili poruku o grešci
        return;
      }
  
      // Ako stara lozinka odgovara, izvršite ažuriranje lozinke
      const updatedCompanyAdmin: CompanyAdministrator = { ...this.companyAdmin, password: newPassword };
  
      this.companyAdminService.changePassword(this.companyAdmin.id, updatedCompanyAdmin).subscribe(
        () => {
          this.companyAdmin = updatedCompanyAdmin;
          this.shouldRenderChangePasswordForm = false;
          this.shouldChange = false;
          console.log('Company administrator updated successfully');
        },
        error => {
          console.error('Error updating company administrator:', error);
          // Dodajte odgovarajući korisnički interfejs ili poruku o grešci
        }
      );
    }
  }
  
  cancelChange() {
    this.shouldEdit = false;
    this.shouldRenderCompanyAdminForm = false;
  }
}
