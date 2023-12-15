import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EquipmentAppointment } from 'src/app/shared/model/equipmentAppointment.model';
import { EquipmentAppointmentService } from '../equipment-appointment.service';

@Component({
  selector: 'app-time-slots-modal',
  templateUrl: './time-slots-modal.component.html',
  styleUrls: ['./time-slots-modal.component.css']
})
export class TimeSlotsModalComponent {
  
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
        // Do something with the data, for example, assign it to a property
        console.log(equipmentAppointments);
      }, error => {
        // Handle errors
        console.error('Error loading equipment appointments', error);
      });
  }
}
