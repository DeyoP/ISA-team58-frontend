import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EquipmentAppointment } from 'src/app/shared/model/equipmentAppointment.model';
import { EquipmentAppointmentService } from '../equipment-appointment.service';

@Component({
  selector: 'app-time-slots-modal',
  templateUrl: './time-slots-modal.component.html',
  styleUrls: ['./time-slots-modal.component.css']
})
export class TimeSlotsModalComponent {
  selectedDate: Date | undefined;
  equipmentAppointments: EquipmentAppointment[] | undefined;
  filteredAppointments: EquipmentAppointment[] | undefined;
  selectedStartTime: Date | undefined;
  selectedEndTime: Date | undefined;

  constructor(
    public dialogRef: MatDialogRef<TimeSlotsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: EquipmentAppointmentService
  ) { 
    const equipmentIds = this.extractEquipmentIds(data.reservedEquipments);
    console.log(equipmentIds);
    this.loadEquipmentAppointments(equipmentIds);
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  private extractEquipmentIds(reservedEquipments: any[]): number[] {
    // Assuming each reserved equipment object has an 'equipmentId' property
    return reservedEquipments.map(equipment => equipment.id);
  }

  loadEquipmentAppointments(equipmentIds: number[]): void {
    this.service.getByEquipmentIds(equipmentIds)
      .subscribe((equipmentAppointments: EquipmentAppointment[]) => {
        this.equipmentAppointments = equipmentAppointments;
      }, error => {
        console.error('Error loading equipment appointments', error);
      });
  }

  loadEquipmentAppointmentsByDate(): void {
    if (this.selectedDate && this.equipmentAppointments) {
      console.log('Selected Date:', this.selectedDate);
      console.log('Equipment Appointments:', this.equipmentAppointments);

      
      
  
      this.filteredAppointments = this.equipmentAppointments
        .filter(appointment => {
          const startTime = new Date(appointment.startTime);
          const endTime = new Date(appointment.endTime);
  
          return (
            startTime instanceof Date &&
            endTime instanceof Date &&
            this.selectedDate! >= this.getStartOfDay(startTime) &&
            this.selectedDate! <= this.getEndOfDay(endTime)
          );
        });
  
      console.log('Filtered Appointments:', this.filteredAppointments);
    }
  }

  buttonClick(){
    if (this.selectedDate)
      console.log(this.isAppointmentExtraordinary(this.selectedDate));
  }
  
  private isAppointmentExtraordinary(date: Date): boolean {
    if (this.equipmentAppointments) {
      for (let appointment of this.equipmentAppointments) {
        console.log("Entered the loop");
  
        const modifiedDate = new Date(date);
        const appointmentStartTime = new Date(appointment.startTime);
        const appointmentEndTime = new Date(appointment.endTime);
        
        const dateUTC = appointmentStartTime.toUTCString();
        const appointmentStartTimeUTC = appointmentStartTime.toUTCString();
        const appointmentEndTimeUTC = appointmentEndTime.toUTCString();
  
        if (dateUTC >= appointmentStartTimeUTC && dateUTC <= appointmentEndTimeUTC) {
          console.log("Entered the if statement");
          return true;
        }
      }
    }
    return false;
  }
  
  
  private getStartOfDay(date: Date): Date {
    // Set hours, minutes, seconds, and milliseconds to 0 to get the start of the day
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  
  private getEndOfDay(date: Date): Date {
    // Set hours, minutes, seconds, and milliseconds to the end of the day
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
  }
  

  private isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
  
}
