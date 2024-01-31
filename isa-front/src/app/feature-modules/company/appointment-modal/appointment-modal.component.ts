import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AvailableTimeSlots } from 'src/app/shared/model/available-time-slots.model';
import { Equipment } from 'src/app/shared/model/equipment.model';
import { appointmentStatus, EquipmentAppointment } from 'src/app/shared/model/equipmentAppointment.model';
import { AuthenticationService } from '../../auth/auth.service';
import { AvailableTimeSlotsService } from '../../available-time-slots/available-time-slots.service';
import { EquipmentAppointmentService } from '../equipment-appointment.service';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.css']
})
export class AppointmentModalComponent {
  selectedTime: string = '';
  equipments: Equipment[]; // Declare a property to store the equipments
  userId: string; // Declare a property to store the userId
  companyAdministratorId: number; // Declare a property to store the companyId
  selectedDate!: Date; // Add this property to store the selected date
  selectedDuration!: number;
  companyId!: number; // Declare a property to store the companyId

  constructor(
    public dialogRef: MatDialogRef<AppointmentModalComponent>,
    private slotService: AvailableTimeSlotsService,
    private appointmentService: EquipmentAppointmentService,
    private authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Access the data properties from the passed object
    this.equipments = data.equipments;
    this.userId = data.userId;
    this.companyAdministratorId = data.companyAdministratorId;
    this.companyId = data.companyId
  }

  onSaveClick(): void {
    this.addEquipment();
  }

  addEquipment(): void {
    const [hours, minutes] = this.selectedTime.split(':').map(Number);
  
    // Create a Time object
    const selectedTime: Time = {
      hours: hours,
      minutes: minutes,
    };
    
    // Format hours and minutes as strings with leading zeros
    const formattedHours = selectedTime.hours.toString().padStart(2, '0');
    const formattedMinutes = selectedTime.minutes.toString().padStart(2, '0');
    
    // Combine formatted hours and minutes into a time string
    const formattedTime = `${formattedHours}:${formattedMinutes}`;
    
    // Now you can use formattedTime in your AvailableTimeSlots object
    const slot: AvailableTimeSlots = {
      id: 0,
      date: this.selectedDate,
      time: formattedTime,
      duration: this.selectedDuration,
      companyAdministratorId: this.companyAdministratorId,
      companyId: this.companyId,
      equipmentId: this.equipments[0].id,
      registeredUser: this.authService.currentUserValue!.id
      
    };
    
    console.log(formattedTime); // This will log the formatted time, e.g., "08:30"

  
  this.slotService.addAvailabeTimeSlot(slot, this.companyId, this.companyAdministratorId, this.equipments[0].id)
  .subscribe(
    (createdSlot) => {
      // Handle the response here, 'createdSlot' contains the response data.
      console.log('Successfully added available time slot:', createdSlot);

      console.log('Available time slot added successfully');

      const appointment : EquipmentAppointment = {
      id : 0,
      equipmentId: slot.id,
      userId: slot.registeredUser,
      availableTimeSlotId: createdSlot.id,
      extraordinary: true,
      companyId : slot.companyId,
      status : appointmentStatus.RESERVED,
    }

    },
    error => {
      console.error('Error adding available time slot:', error);
      // Handle the error here if needed.
    }
  );

  
  }
}

interface Time {
  hours: number;
  minutes: number;
}