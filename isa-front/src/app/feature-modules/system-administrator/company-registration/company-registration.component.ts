import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/shared/model/company.model';
import { SystemAdministratorService } from '../system-administrator.service';
import { Account } from 'src/app/shared/model/account.model';
import { AccountService } from '../../account/account.service';
import { RegisteredUser } from 'src/app/shared/model/registered-user.model';
import { CompanyAdministrator } from 'src/app/shared/model/company-administrator.model';
import { CompanyAdministratorService } from '../../company-administrator/company-administrator.service';
import { CompanyService } from '../../company/company.service';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.css']
})
export class CompanyRegistrationComponent implements OnInit {

  companyForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    description: [''],
    certification: [''],
    phoneNumber: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    cityAdmin: ['', Validators.required],
    country: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private service: CompanyAdministratorService, private companyService: CompanyService) { }

  //nonCompanyAdmins: RegisteredUser[] = []

  ngOnInit() {
    // this.accountService.getNonAdmins().subscribe({
    //   next: (result) => {
    //     this.nonCompanyAdmins = result;console.log(result)
    //   }
    // })
  }

  onSubmit() {
    if (this.companyForm.valid) {
      const newCompany: Company = {
        id: 0,
        administratorId: 0,
        name: this.companyForm.value.name,
        description: this.companyForm.value.description,
        address: this.companyForm.value.address,
        city: this.companyForm.value.city,
        rating: 0,
        equipments: [],
        certification: this.companyForm.value.certification,
        phoneNumber: this.companyForm.value.phoneNumber,
      }

      const newAdmin: CompanyAdministrator = {
        id: 0,
        firstName: this.companyForm.value.firstName,
        lastName: this.companyForm.value.lastName,
        city: this.companyForm.value.cityAdmin,
        country: this.companyForm.value.country,
        company: newCompany,
        email: this.companyForm.value.email,
        password: this.companyForm.value.password,
        isActive: true,
        isDeleted: false,
        dtype: 'CompanyAdministrator',
      }

      this.service.saveCompanyAdministrator(newAdmin).subscribe({
        next: (result) => {
          newCompany.administratorId = result.id;
          this.companyService.saveCompany(newCompany).subscribe();
        }
      });
    }
  }
}
