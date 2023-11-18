import { Component, Input, OnInit } from '@angular/core';
import { Company } from 'src/app/shared/model/company.model';
import { SearchService } from '../search.service';
import { NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.css']
})
export class CompanySearchComponent implements OnInit {
  companies: Company[] = [];
  filteredCompanies: Company[] = [];

  nameSearch: string = '';
  citySearch: string = '';
  
  constructor(private service: SearchService) {}

  ngOnInit(): void {
    this.service.getAllCompanies().subscribe({
      next: (result) => {
        this.companies = result;
        console.log(this.companies);

        this.filteredCompanies = [...this.companies];
      }
      });
    
    
  }

  onSearch(searchTerm: string, searchCity: string): void {
    this.filteredCompanies = this.companies.filter((company) => {
      const nameMatch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
      const cityMatch = company.city.toLowerCase().includes(searchCity.toLowerCase());
      return nameMatch && cityMatch;
    });
}
}
