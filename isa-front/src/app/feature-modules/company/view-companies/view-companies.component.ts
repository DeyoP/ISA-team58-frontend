import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Company } from 'src/app/shared/model/company.model';

@Component({
  selector: 'app-view-companies',
  templateUrl: './view-companies.component.html',
  styleUrls: ['./view-companies.component.css']
})
export class ViewCompaniesComponent implements OnInit {

  companies: Company[] | undefined;
  searchTerm: string = '';
  lowerRating: number | undefined;
  upperRating: number | undefined;

  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private service: CompanyService) {}

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(): void {
    this.service.getAllCompanies().subscribe(
      companies => {
        // Filter companies based on search term and rating
        this.companies = companies.filter(company =>
          this.containsSearchTerm(company) && this.isRatingInRange(company.rating)
        );
        console.log(this.companies);
      },
      error => {
        console.error('Error fetching companies:', error);
      }
    );
  }
  
  private isRatingInRange(rating: number | undefined): boolean {
    if (this.lowerRating !== undefined && rating !== undefined && rating < this.lowerRating) {
      return false;
    }
  
    if (this.upperRating !== undefined && rating !== undefined && rating > this.upperRating) {
      return false;
    }
  
    return true;
  }
  
  
  
  private containsSearchTerm(company: Company): boolean {
    // Check if any property contains the search term
    return (
      company.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      company.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      company.address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      company.city.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      company.certification.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      company.phoneNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
  searchCompanies(): void {
    this.getCompanies();
  }

  filterByRating(): void {
    this.getCompanies();
  }

  sortCompanies(): void {
    if (this.companies) {
      this.companies.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (this.sortOrder === 'asc') {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      });
    }
  }
}
