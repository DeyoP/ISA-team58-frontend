import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/shared/model/company.model';
import { CompanyService } from '../company.service';
import { ActivatedRoute } from '@angular/router';
import { Equipment } from 'src/app/shared/model/equipment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.css']
})
export class CompanyOverviewComponent implements OnInit {
  company: Company = {} as Company;
  companyId: number | null = null;
  equipments: Equipment[] = []; 
  shouldRenderCompanyForm = false;
  shouldEdit = false;
  companyForm: FormGroup;
  
  constructor(private companyService: CompanyService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      averageRating: ['', Validators.required]
  });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.companyId = id ? parseInt(id, 10) : null;
  
      if (this.companyId !== null) {
        this.getCompanyDetails(this.companyId);
      }
    });
  }
  
  private getCompanyDetails(id: number): void {
    this.companyService.getCompanyById(id).subscribe({
      next: (result: Company) => {
        this.company = result;
        this.loadCompanyEquipments(this.companyId!);
      },
      error: () => {}
    });
  }

  loadCompanyEquipments(companyId: number): void {
    this.companyService.getCompanyEquipments(companyId).subscribe({
        next: (equipmentList: Equipment[]) => {
            this.equipments = equipmentList;
        }
    });
  }

  onEditClicked() {
    this.shouldEdit = true;
    this.shouldRenderCompanyForm = true;

    this.companyForm.patchValue({
      name: this.company.name,
      description: this.company.description,
      address: this.company.address,
      averageRating: this.company.rating
    });
  }
  
  updateCompany() {
    if (this.companyForm.valid) {
      const updatedCompany: Company = this.companyForm.value;

      this.companyService.updateCompany(this.company.id, updatedCompany).subscribe(
          () => {
              this.company = updatedCompany;
              this.shouldRenderCompanyForm = false;
              this.shouldEdit = false;
              console.log('Company updated successfully');
           },
          error => {
              console.error('Error updating company:', error);
          }
      );
    }
  }
  
  cancelUpdate() {
    this.shouldEdit = false;
    this.shouldRenderCompanyForm = false;
  }
}
