import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/shared/model/company.model';
import { CompanyService } from '../company.service';
import { ActivatedRoute } from '@angular/router';
import { Equipment } from 'src/app/shared/model/equipment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvailableTimeSlots } from 'src/app/shared/model/available-time-slots.model';
import { MatDialog } from '@angular/material/dialog';
import { EquipmentAppointmentService } from '../equipment-appointment.service';
import { EquipmentAppointment, appointmentStatus } from 'src/app/shared/model/equipmentAppointment.model';
import { AuthenticationService } from '../../auth/auth.service';
import { AppointmentModalComponent } from '../appointment-modal/appointment-modal.component';

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
  shouldRenderCalendar: boolean = false;

  constructor(private companyService: CompanyService, private equipmentAppointmentService: EquipmentAppointmentService, private route: ActivatedRoute, private formBuilder: FormBuilder, private authService: AuthenticationService,private dialog: MatDialog) {
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
        userId: this.authService.currentUserValue?.id || 0,
        availableTimeSlotId: avaibleTimeSlot.id,
        extraordinary: false,
        companyId : this.company.id,
        status : appointmentStatus.RESERVED,
      }

      this.equipmentAppointmentService.create(appointment).subscribe({
        next: () => {
          console.log("DEYAN PELEMISHSHHSHS")
        }
      });
    }
  }

  makeExtraordinaryAppointment(equipments: Equipment[]): void {
    if(this.reservedEquipments.length === 1){
    const dialogRef = this.dialog.open(AppointmentModalComponent, {
      width: '500px', // Set the width as per your requirement
      data: { equipments:  equipments,
              userId: this.authService.currentUserValue?.id, 
              companyAdministratorId: this.company.administratorId,
              companyId: this.companyId }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle any data returned when the modal is closed
      console.log('The dialog was closed', result);
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
        this.shouldRenderCalendar = true;
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
    // Check if the equipment is not already reserved and the reservedEquipments list is empty
    if (!this.reservedEquipments.includes(equipment) && this.reservedEquipments.length < 1) {
      // Call userHasAppointmentInCompany
      this.equipmentAppointmentService.userHasAppointmentInCompany(this.authService.currentUserValue?.id || 0, this.company.id)
        .subscribe(hasAppointment => {
          // If hasAppointment is false, add the equipment to the reserved list
          if (!hasAppointment) {
            this.reservedEquipments.push(equipment);
          } else {
            // Handle the case where the user already has an appointment
            console.log('User already has an appointment in the company');
          }
        });
    }
  }

  removeReservedEquipment(reservedEquipment: Equipment) {
    // Remove the equipment from the reserved list
    this.reservedEquipments = this.reservedEquipments.filter(e => e !== reservedEquipment);
  }
  
    
}
