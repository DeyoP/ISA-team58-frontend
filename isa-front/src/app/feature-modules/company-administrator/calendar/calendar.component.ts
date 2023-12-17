import { Component } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [
      {
        title: 'Your Event Title',
        start: '2023-12-18',
        end: '2023-12-25T12:00:00',
      }
    ]
  };
}
