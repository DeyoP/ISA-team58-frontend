import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvailableTimeSlotsOverviewComponent } from './available-time-slots-overview/available-time-slots-overview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AvailableTimeSlotsOverviewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    AvailableTimeSlotsOverviewComponent
  ]
})
export class AvailableTimeSlotsModule { }
