import { Component, OnInit } from '@angular/core';
import { RegisteredUser } from 'src/app/shared/model/registered-user.model';
import { EquipmentAppointmentService } from '../../company/equipment-appointment.service';

@Component({
  selector: 'app-users-with-appointment',
  templateUrl: './users-with-appointment.component.html',
  styleUrls: ['./users-with-appointment.component.css']
})
export class UsersWithAppointmentComponent implements OnInit {
  users: RegisteredUser[] = [];
  user: RegisteredUser = {} as RegisteredUser;

  constructor(private appointmentService: EquipmentAppointmentService) {}

  ngOnInit(): void {
    this.getUsersWithAppointment();
  }

  getUsersWithAppointment(): void {
    this.appointmentService.getUsersWithAppointment().subscribe(
      (usersWithAppointment) => {
        console.log('Korisnici sa rezervacijama:', usersWithAppointment);
        this.users = usersWithAppointment;
      },
      (error) => {
        console.error('Greška prilikom dobijanja korisnika sa rezervacijama:', error);
      }
    );
    
  }
}
