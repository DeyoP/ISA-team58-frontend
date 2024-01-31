import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AvailableTimeSlots } from 'src/app/shared/model/available-time-slots.model';
import { CompanyAdministrator } from 'src/app/shared/model/company-administrator.model';
import { Company } from 'src/app/shared/model/company.model';
import { EquipmentAppointment } from 'src/app/shared/model/equipmentAppointment.model';
import { AccountService } from '../../account/account.service';
import { AuthenticationService } from '../../auth/auth.service';
import { AvailableTimeSlotsService } from '../../available-time-slots/available-time-slots.service';
import { EquipmentAppointmentService } from '../../company/equipment-appointment.service';
import { EquipmentService } from '../../equipment/equipment.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  events: EventInput[] = [
  ];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: this.events
  };
  appointments: EquipmentAppointment[] = [];
  @Input() company: Company | undefined;

  @ViewChild(FullCalendarComponent) fullCalendar!: FullCalendarComponent;

  constructor(
    private authService: AuthenticationService,
    private service: EquipmentAppointmentService,
    private timeSlotService: AvailableTimeSlotsService,
    private equipmentService: EquipmentService,
    private accountService: AccountService, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const companyId = params['companyId'];
      this.getCalendarDataForCompany(companyId);
    });

    let user = this.authService.currentUserValue as CompanyAdministrator;

    this.service.getByCompanyId(this.company!.id).subscribe(
      (data: EquipmentAppointment[]) => {
        this.appointments = data;

        this.appointments.forEach(appointment => {
          const availableTimeSlotId = appointment.availableTimeSlotId;


          this.timeSlotService.getAvailableTimeSlotById(availableTimeSlotId).subscribe(
            (timeSlot: AvailableTimeSlots) => {
              this.equipmentService.getEquipmentById(appointment.equipmentId)
              .subscribe(
                (result) => {
                  const equipmentName = result.name;
                  this.accountService.getAccountById(appointment.userId)
                  .subscribe(
                    (result) => {
                      const userEmail = result.email;

                      const name = equipmentName + " - " + userEmail;

                      const startTime = new Date(timeSlot.date);
                      const endTime = new Date(startTime.getTime() + timeSlot.duration * 60 * 60 * 1000);
        
                      const newEvent: EventInput = {
                        title: name,
                        start: startTime.toISOString().split('T')[0],
                        end: endTime.toISOString().split('T')[0],
                      };
        
                      this.events.push(newEvent);
        
                      this.calendarOptions = {
                        ...this.calendarOptions,
                        events: this.events
                      };
        
                      // Explicitly add the new event to FullCalendar
                      if (this.fullCalendar) {
                        this.fullCalendar.getApi().addEvent(newEvent);
                      }


                    },
                    (error) => {
                      console.error('Error fetching account:', error);
                    }
                  );


                },
                (error) => {
                  console.error('Error fetching equipment:', error);
                }
              );

            },
          );
        });
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
    
  }

  getCalendarDataForCompany(companyId: number): void {
    this.service.getByCompanyId(companyId).subscribe(
      (data: EquipmentAppointment[]) => {
        this.appointments = data;
  
        this.appointments.forEach(appointment => {
          const availableTimeSlotId = appointment.availableTimeSlotId;
  
          this.timeSlotService.getAvailableTimeSlotById(availableTimeSlotId).subscribe(
            (timeSlot: AvailableTimeSlots) => {
              this.equipmentService.getEquipmentById(appointment.equipmentId).subscribe(
                (result) => {
                  const equipmentName = result.name;
                  this.accountService.getAccountById(appointment.userId).subscribe(
                    (result) => {
                      const userEmail = result.email;
  
                      const name = equipmentName + " - " + userEmail;
  
                      const startTime = new Date(timeSlot.date);
                      const endTime = new Date(startTime.getTime() + timeSlot.duration * 60 * 60 * 1000);
  
                      const newEvent: EventInput = {
                        title: name,
                        start: startTime.toISOString().split('T')[0],
                        end: endTime.toISOString().split('T')[0],
                      };
  
                      this.events.push(newEvent);
  
                      this.calendarOptions = {
                        ...this.calendarOptions,
                        events: this.events
                      };

                      if (this.fullCalendar) {
                        this.fullCalendar.getApi().addEvent(newEvent);
                      }
                    },
                    (error) => {
                      console.error('Error fetching account:', error);
                    }
                  );
                },
                (error) => {
                  console.error('Error fetching equipment:', error);
                }
              );
            },
          );
        });
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }
  
}
