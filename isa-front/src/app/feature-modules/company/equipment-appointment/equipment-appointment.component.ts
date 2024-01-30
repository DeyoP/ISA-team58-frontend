import { Component, OnInit } from '@angular/core';
import { EquipmentAppointment } from 'src/app/shared/model/equipmentAppointment.model';
import { EquipmentAppointmentService } from '../equipment-appointment.service';
import { EquipmentService } from '../../equipment/equipment.service';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthenticationService } from '../../auth/auth.service';

@Component({
  selector: 'app-equipment-appointment',
  templateUrl: './equipment-appointment.component.html',
  styleUrls: ['./equipment-appointment.component.css']
})
export class EquipmentAppointmentComponent implements OnInit {
  appointment: EquipmentAppointment = {} as EquipmentAppointment;
  appointments: EquipmentAppointment[] = [];
  adminId: any;
  selectedAppointment: EquipmentAppointment = {} as EquipmentAppointment;

  constructor(private appointmentService: EquipmentAppointmentService, private equipmentService: EquipmentService, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.getEquipmentAppointments();

    const user = this.authService.currentUserValue;
    this.adminId = user ? user.id : null;
  }

  getEquipmentAppointments(): void {
    this.appointmentService.getAll().subscribe({
      next: (equipmentAppointments: EquipmentAppointment[]) => {
        this.appointments = equipmentAppointments;
      },
      error: (error: any) => {
        console.error('Error loading equipment appointments:', error);
      },
    });
  }
  
  takenEquipment(equipmentAppointment: EquipmentAppointment): void {
    this.appointment = equipmentAppointment;
    this.appointmentService.markAppointmentAsTaken(this.appointment.id, this.adminId)
      .subscribe(
        (result) => {
          console.log('Appointment marked as taken:', result);
          this.getEquipmentAppointments();
        },
        (error) => {
          console.error('Error marking appointment as taken:', error);
        }
      );
  }

}
