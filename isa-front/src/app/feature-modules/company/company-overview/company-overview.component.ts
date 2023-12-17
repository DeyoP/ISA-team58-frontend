import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/shared/model/company.model';
import { CompanyService } from '../company.service';
import { ActivatedRoute } from '@angular/router';
import { Equipment } from 'src/app/shared/model/equipment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvailableTimeSlots } from 'src/app/shared/model/available-time-slots.model';
import { MatDialog } from '@angular/material/dialog';
import { EquipmentAppointmentService } from '../equipment-appointment.service';
import { EquipmentAppointment } from 'src/app/shared/model/equipmentAppointment.model';

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
  availableTimeSlots: AvailableTimeSlots[] = [];
  reservedEquipments: Equipment[] = [];
  showTimeSlotsButtonVisible = false;
  filteredEquipments: Equipment[] = []; 
  search: string = '';
  allAppointments: EquipmentAppointment[] = [];

  constructor(private companyService: CompanyService, private equipmentAppointmentService: EquipmentAppointmentService, private route: ActivatedRoute, private formBuilder: FormBuilder, private dialog: MatDialog) {
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      rating: ['', Validators.required],
      certification: ['', Validators.required],
      phoneNumber: ['', Validators.required]
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

    this.equipmentAppointmentService.getAll().subscribe({
      next: (result) => {
        this.allAppointments = result;
      }
    })
  }

  makeAppointment(avaibleTimeSlot: AvailableTimeSlots): void {
    for (const reservedEquipment of this.reservedEquipments) {
      const appointment : EquipmentAppointment = {
        id : 0,
        equipmentId: reservedEquipment.id,
        userId: 1,
        availableTimeSlotId: avaibleTimeSlot.id,
        extraordinary: false
      }

      this.equipmentAppointmentService.create(appointment).subscribe({
        next: () => {
          console.log("DEYAN PELEMISHSHHSHS")
        }
      });
    }
  }

  makeExtraordinaryAppointment(avaibleTimeSlot: AvailableTimeSlots): void {
    for (const reservedEquipment of this.reservedEquipments) {
      const appointment : EquipmentAppointment = {
        id : 0,
        equipmentId: reservedEquipment.id,
        userId: 1,
        availableTimeSlotId: avaibleTimeSlot.id,
        extraordinary: true
      }

      this.equipmentAppointmentService.createExtraordinary(appointment).subscribe({
        next: () => {
          console.log("DEYAN PELEMISHSHHSHS")
        }
      });
    }
  }

  isAdvailable(availableTimeSlot: any): boolean {
    for (const reservedEquipment of this.reservedEquipments) {
      for (const appointment of this.allAppointments) {
        if (appointment.availableTimeSlotId === availableTimeSlot.id && reservedEquipment.id === appointment.equipmentId) {
          return false;
        }
      }
    }

    return true;
  }

  isExtroardinarliyAdvailable(availableTimeSlot: any): boolean {
    for (const reservedEquipment of this.reservedEquipments) {
      for (const appointment of this.allAppointments) {
        if (appointment.availableTimeSlotId === availableTimeSlot.id && reservedEquipment.id === appointment.equipmentId && appointment.extraordinary) {
          return false;
        }
      }
    }

    return true;
  }
  
  private getCompanyDetails(id: number): void {
    this.companyService.getCompanyById(id).subscribe({
      next: (result: Company) => {
        this.company = result;
        this.loadCompanyEquipments(this.companyId!);
        this.loadCompanyAvailableTimeSlots(this.companyId!);
      },
      error: () => {}
    });
  }

  loadCompanyEquipments(companyId: number): void {
    this.companyService.getCompanyEquipments(companyId).subscribe({
        next: (equipmentList: Equipment[]) => {
            this.equipments = equipmentList;
            this.filteredEquipments = [...this.equipments];
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
      city: this.company.city,
      rating: this.company.rating,
      certification: this.company.certification,
      phoneNumber: this.company.phoneNumber
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

  onSearch(): void {
    this.filteredEquipments = this.equipments.filter((equipment) => {
        return equipment.name.toLowerCase().includes(this.search.toLowerCase());
    });
}

  
  cancelUpdate() {
    this.shouldEdit = false;
    this.shouldRenderCompanyForm = false;
  }

  loadCompanyAvailableTimeSlots(companyId: number): void {
    this.companyService.getCompanyAvailableTimeSlots(companyId).subscribe({
        next: (availableTimeSlotsList: AvailableTimeSlots[]) => {
            this.availableTimeSlots = availableTimeSlotsList;
        }
    });
  }

  reserveEquipment(equipment: Equipment) {
    // Check if the equipment is not already reserved
    if (!this.reservedEquipments.includes(equipment)) {
      // Add the equipment to the reserved list
      this.reservedEquipments.push(equipment);
    }
  }

  removeReservedEquipment(reservedEquipment: Equipment) {
    // Remove the equipment from the reserved list
    this.reservedEquipments = this.reservedEquipments.filter(e => e !== reservedEquipment);
  }
  
    
}
