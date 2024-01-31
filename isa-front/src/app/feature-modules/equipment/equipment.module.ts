import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentOverviewComponent } from './equipment-overview/equipment-overview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EquipmentReservationQrComponent } from './equipment-reservation-qr/equipment-reservation-qr.component';



@NgModule({
  declarations: [
    EquipmentOverviewComponent,
    EquipmentReservationQrComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    EquipmentOverviewComponent
  ]
})
export class EquipmentModule { }
