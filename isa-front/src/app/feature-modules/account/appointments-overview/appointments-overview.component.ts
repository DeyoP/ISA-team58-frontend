import { Component } from '@angular/core';
import { EquipmentAppointment } from 'src/app/shared/model/equipmentAppointment.model';
import { EquipmentAppointmentService } from '../../company/equipment-appointment.service';
import { Account } from 'src/app/shared/model/account.model';
import { RegisteredUser } from 'src/app/shared/model/registered-user.model';
import { AuthenticationService } from '../../auth/auth.service';
import { CompanyService } from '../../company/company.service';
import { Observable, catchError, map, of } from 'rxjs';
import { Company } from 'src/app/shared/model/company.model';

@Component({
  selector: 'app-appointments-overview',
  templateUrl: './appointments-overview.component.html',
  styleUrls: ['./appointments-overview.component.css']
})
export class AppointmentsOverviewComponent {
  appointments: EquipmentAppointment[] = [];
  takenAppointments: EquipmentAppointment[] = [];

  loggedInAccount: Account | null = null;
  loggedInRegisteredUser : RegisteredUser | null = null;

  companies: { [companyId: number]: Company } = {};

  constructor(private service : EquipmentAppointmentService, private authService: AuthenticationService, private companyService: CompanyService) {}

  ngOnInit(): void {

    this.loggedInAccount =  this.authService.getCurrentUser();
    console.log(this.loggedInAccount);

    if (this.loggedInAccount) {
      this.loggedInRegisteredUser = this.loggedInAccount as RegisteredUser;
      console.log(this.loggedInRegisteredUser);

      this.service.getAllReservedByUserId(this.loggedInAccount.id).subscribe({
        next: (result) => {
          this.appointments = result;
          console.log(result);
  
          for(let appointment of result){
            this.companyService.getCompanyById(appointment.companyId).subscribe({
              next: (company: Company) => { console.log(company)
                this.companies[appointment.companyId] = company;
              }
            })
          }
        }
      })

      this.service.getAllTakenByUserId(this.loggedInAccount.id).subscribe({
        next: (result) => {
          this.takenAppointments = result;
          console.log(result)
        }
      })
    } 
  }

  getReservedAppointments() : void {
    
  }

  cancelAppointment(appointmentId : number) : void {
    this.service.cancelAppointment(appointmentId).subscribe();

    this.service.getAllReservedByUserId(this.loggedInAccount!.id).subscribe({
      next: (result) => {
        this.appointments = result;
        console.log(result)
      }
    });
  }

  getCompanyName(companyId: number): Observable<string> {
    return this.companyService.getCompanyById(companyId).pipe(
      map((result) => result.name),
      catchError((error) => {
        console.error('Error fetching company:', error);
        return of('Undefined');
      })
    );
  }
  
}
