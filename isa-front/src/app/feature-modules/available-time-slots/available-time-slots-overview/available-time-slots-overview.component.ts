import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvailableTimeSlotsService } from '../available-time-slots.service';
import { AvailableTimeSlots } from 'src/app/shared/model/available-time-slots.model';
import { Company } from 'src/app/shared/model/company.model';
import { Equipment } from 'src/app/shared/model/equipment.model';
import { CompanyService } from '../../company/company.service';
import { CompanyAdministratorService } from '../../company-administrator/company-administrator.service';
import { AuthenticationService } from '../../auth/auth.service';
import { Time } from '@angular/common';
import { CompanyAdministrator } from 'src/app/shared/model/company-administrator.model';

@Component({
  selector: 'app-available-time-slots-overview',
  templateUrl: './available-time-slots-overview.component.html',
  styleUrls: ['./available-time-slots-overview.component.css']
})

export class AvailableTimeSlotsOverviewComponent implements OnInit{
  availableTimeSlot: AvailableTimeSlots = {} as AvailableTimeSlots;
  availableTimeSlots: AvailableTimeSlots[] = [];

  companies: Company[] = [];
  equipments: Equipment[] = [];
  selectedCompany: Company = {} as Company;
  selectedEquipment: Equipment = {} as Equipment;
  companyAdmins: CompanyAdministrator[] = [];
  selectedAdmin: CompanyAdministrator = {} as CompanyAdministrator;

  admininstartorId: number = 0;
  addForm: FormGroup;
  shouldRenderAddForm = false;
  shouldAdd = false;
  
  constructor(private service: AvailableTimeSlotsService, private companyService: CompanyService, private formBuilder: FormBuilder, private authService: AuthenticationService, 
    private adminService: CompanyAdministratorService) {
    this.addForm = this.formBuilder.group({
      duration: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      company: [this.selectedCompany.id, Validators.required],
      equipment:[this.selectedEquipment.id, Validators.required],
      administrator: [this.selectedAdmin.id, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAvailableTimeSlots();
    this.loadCompanies();
  }
  
  getAvailableTimeSlots(): void {
    this.service.getAllAvailableTimeSlots().subscribe({
      next: (availableTimeSlotList: AvailableTimeSlots[]) => {
        this.availableTimeSlots = availableTimeSlotList;
      },
      error: (error: any) => {
        console.error('Error loading available time slots:', error);
      },
    });
  }

  loadCompanies() {
    this.companyService.getAllCompanies().subscribe(companies => this.companies = companies);
  }  

  onCompanySelected() {
    const selectedCompanyId = this.addForm.controls['company'].value;
    const selectedCompany = this.companies.find(company => company.id == selectedCompanyId);
    if (selectedCompany) {
      this.selectedCompany = selectedCompany;
      this.loadEquipments(selectedCompany.id);
      this.loadAdmins(selectedCompany.id);
    }

    if(selectedCompany){
    this.admininstartorId = selectedCompany.administratorId ;
    console.log(this.admininstartorId)
    }
  }
  
  loadEquipments(companyId: number) {
    this.companyService.getCompanyEquipments(companyId).subscribe(equipments => {
      this.equipments = equipments;
    });
  }
  
  loadAdmins(companyId: number) {
    this.adminService.adminsByCompany(companyId).subscribe(admins => {
      this.companyAdmins = admins; 
    }) 
  }
  
  onAddClicked(): void {
    this.shouldRenderAddForm = true;
    this.shouldAdd = true;
  }

  addEquipment(): void {
    if (this.addForm.valid) {
      const selectedCompanyId = this.addForm.controls['company'].value;
      const selectedEquipmentId = this.addForm.controls['equipment'].value;
      const newAvailableTimeSlot: AvailableTimeSlots = this.addForm.value;
      
      console.log("add")
      this.service.addAvailabeTimeSlot(newAvailableTimeSlot, selectedCompanyId, this.admininstartorId, selectedEquipmentId).subscribe(
        () => {
          this.shouldRenderAddForm = false;
          this.shouldAdd = false;
          this.getAvailableTimeSlots();
          console.log('Availabe time slot added successfully');
        },
        error => {
          console.error('Error adding eavailable time slot:', error);
        }
      );
    }
  }

  cancelAdd() {
    this.shouldAdd = false;
    this.shouldRenderAddForm = false;
  } 
  
}