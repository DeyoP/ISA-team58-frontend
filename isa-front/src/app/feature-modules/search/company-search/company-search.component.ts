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

  sortOrderName: 'asc' | 'desc' = 'asc';
  sortOrderCity: 'asc' | 'desc' = 'asc';
  sortOrderRating: 'asc' | 'desc' = 'asc';
  
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

sortCompaniesByName(): void {
  if (this.filteredCompanies) {
    this.filteredCompanies.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      const sortOrderMultiplier = (this.sortOrderName === 'asc') ? 1 : -1;

      return sortOrderMultiplier * nameA.localeCompare(nameB);
    });

    // Toggle sortOrder for the next click
    this.sortOrderName = (this.sortOrderName === 'asc') ? 'desc' : 'asc';
  }
}

sortCompaniesByCity(): void {
  if (this.filteredCompanies) {
    this.filteredCompanies.sort((a, b) => {
      const nameA = a.city.toLowerCase();
      const nameB = b.city.toLowerCase();

      const sortOrderMultiplier = (this.sortOrderCity === 'asc') ? 1 : -1;

      return sortOrderMultiplier * nameA.localeCompare(nameB);
    });

    // Toggle sortOrder for the next click
    this.sortOrderCity = (this.sortOrderCity === 'asc') ? 'desc' : 'asc';
  }
}

sortCompaniesByRating(): void {
  if (this.filteredCompanies) {
    this.filteredCompanies.sort((a, b) => {
      let valueA, valueB;

      if (typeof a.rating === 'number' && typeof b.rating === 'number') {
        // If both ratings are numbers, compare them directly
        valueA = a.rating;
        valueB = b.rating;
      } else {
        // If one or both ratings are not numbers, compare them as strings
        valueA = String(a.rating);
        valueB = String(b.rating);
      }

      const sortOrderMultiplier = (this.sortOrderRating === 'asc') ? 1 : -1;

      if (valueA < valueB) {
        return -1 * sortOrderMultiplier;
      } else if (valueA > valueB) {
        return 1 * sortOrderMultiplier;
      } else {
        return 0;
      }
    });

    // Toggle sortOrder for the next click
    this.sortOrderRating = (this.sortOrderRating === 'asc') ? 'desc' : 'asc';
  }
}


}
