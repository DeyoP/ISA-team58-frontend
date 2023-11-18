import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanySearchComponent } from './company-search/company-search.component';
import { EquipmentSearchComponent } from './equipment-search/equipment-search.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CompanySearchComponent,
    EquipmentSearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class SearchModule { }
