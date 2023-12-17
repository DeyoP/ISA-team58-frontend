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
  minRating: number = 1;
  maxRating: number = 5;
  
  constructor(private service: SearchService) {}

  ngOnInit(): void {
    this.service.getAllCompanies().subscribe({
      next: (result) => {
        this.companies = result;
        this.filteredCompanies = [...this.companies];
      }
      });
    
    
  }

onSearch(): void {
  this.filteredCompanies = this.companies.filter((company) => {
    const nameMatch = company.name.toLowerCase().includes(this.nameSearch.toLowerCase());
    const cityMatch = company.city.toLowerCase().includes(this.citySearch.toLowerCase());
    const ratingMatch = company.rating >= this.minRating && company.rating <= this.maxRating;
    return nameMatch && cityMatch && ratingMatch;
  });
}
}
