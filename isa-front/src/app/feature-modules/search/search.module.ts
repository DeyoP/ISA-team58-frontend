import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanySearchComponent } from './company-search/company-search.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CompanySearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class SearchModule { }
