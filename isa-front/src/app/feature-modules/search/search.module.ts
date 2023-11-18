import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanySearchComponent } from './company-search/company-search.component';
import { EquipmentSearchComponent } from './equipment-search/equipment-search.component';



@NgModule({
  declarations: [
    CompanySearchComponent,
    EquipmentSearchComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SearchModule { }
