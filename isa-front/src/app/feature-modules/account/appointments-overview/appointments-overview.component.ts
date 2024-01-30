import { Component } from '@angular/core';
import { EquipmentAppointment } from 'src/app/shared/model/equipmentAppointment.model';
import { EquipmentAppointmentService } from '../../company/equipment-appointment.service';
import { Account } from 'src/app/shared/model/account.model';
import { RegisteredUser } from 'src/app/shared/model/registered-user.model';
import { AuthenticationService } from '../../auth/auth.service';

@Component({
  selector: 'app-appointments-overview',
  templateUrl: './appointments-overview.component.html',
  styleUrls: ['./appointments-overview.component.css']
})
export class AppointmentsOverviewComponent {
  appointments: EquipmentAppointment[] = [];

  loggedInAccount: Account | null = null;
  loggedInRegisteredUser : RegisteredUser | null = null;

  constructor(private service : EquipmentAppointmentService, private authService: AuthenticationService) {}

  ngOnInit(): void {

    this.loggedInAccount =  this.authService.getCurrentUser();
    console.log(this.loggedInAccount);

    if (this.loggedInAccount) {
      this.loggedInRegisteredUser = this.loggedInAccount as RegisteredUser;
      console.log(this.loggedInRegisteredUser);

      this.service.getAllReservedByUserId(this.loggedInAccount.id).subscribe({
        next: (result) => {
          this.appointments = result;
          console.log(result)
        }
      })
    }
  }

  cancelAppointment(appointmentId : number) : void {
    this.service.cancelAppointment(appointmentId).subscribe();

    this.service.getAllReservedByUserId(this.loggedInAccount!.id).subscribe({
      next: (result) => {
        this.appointments = result;
        console.log(result)
      }
    });

    // registered account gets one penalty point
    this.loggedInRegisteredUser!.penaltyPoints += 1;
    //this.authService.update()
  }
}
