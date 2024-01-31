import { Component } from '@angular/core';
import { EquipmentAppointment } from 'src/app/shared/model/equipmentAppointment.model';
import { EquipmentAppointmentService } from '../../company/equipment-appointment.service';
import { Account } from 'src/app/shared/model/account.model';
import { RegisteredUser } from 'src/app/shared/model/registered-user.model';
import { AuthenticationService } from '../../auth/auth.service';
import { CompanyService } from '../../company/company.service';
import { Company } from 'src/app/shared/model/company.model';
import { from, Observable, of } from 'rxjs';
import { catchError, finalize, map, shareReplay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-appointments-overview',
  templateUrl: './appointments-overview.component.html',
  styleUrls: ['./appointments-overview.component.css']
})
export class AppointmentsOverviewComponent {
  appointments: EquipmentAppointment[] = [];
  takenAppointments: EquipmentAppointment[] = [];
qrCodeImageUrl: string | undefined;

  loggedInAccount: Account | null = null;
  loggedInRegisteredUser : RegisteredUser | null = null;

  companies: { [companyId: number]: Company } = {};
  qrCodeUrl: any;

  constructor(private service : EquipmentAppointmentService, private authService: AuthenticationService, private companyService: CompanyService) {}

   // Create a cache to store observables for generated QR code URLs
   private qrCodeObservableCache: Map<number, Observable<string>> = new Map<number, Observable<string>>();

   generateQRCode(equipmentId: number): Observable<string> {
     const cachedObservable = this.qrCodeObservableCache.get(equipmentId);
     if (cachedObservable) {
       return cachedObservable;
     }
 
     const newObservable = this.service.getQRCode(equipmentId).pipe(
       switchMap((blob: Blob) => {
         return from(new Promise<string>((resolve, reject) => {
           const reader = new FileReader();
           reader.onloadend = () => {
             const qrCodeUrl = reader.result as string;
             resolve(qrCodeUrl);
           };
           reader.onerror = reject;
           reader.readAsDataURL(blob);
         }));
       }),
       catchError((error) => {
         console.error('Error fetching QR code:', error);
         return of(''); // Return an empty string or some placeholder URL on error
       }),
       shareReplay(1)
     );
 
     this.qrCodeObservableCache.set(equipmentId, newObservable);
 
     return newObservable;
   }
  

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
