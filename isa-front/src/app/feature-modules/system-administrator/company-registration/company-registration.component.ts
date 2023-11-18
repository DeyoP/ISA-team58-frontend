import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/shared/model/company.model';
import { SystemAdministratorService } from '../system-administrator.service';
import { Account } from 'src/app/shared/model/account.model';
import { AccountService } from '../../account/account.service';

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
    phoneNumber: ['', Validators.required]
  });

  user: Account | null = null;

  constructor(private fb: FormBuilder, private service: SystemAdministratorService, private accountService: AccountService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.companyForm.valid) {
      const newCompany: Company = this.companyForm.value;
      newCompany.id = 0;
      newCompany.administratorId = 0;
      this.service.saveCompany(newCompany).subscribe({
        next: () => {}
      });
      console.log('Company registered:', newCompany);
    }
  }
}
