import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentOverviewComponent } from './equipment-overview/equipment-overview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EquipmentOverviewComponent
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
