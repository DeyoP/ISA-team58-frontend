import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/shared/model/company.model';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.css']
})
export class CompanySearchComponent implements OnInit {
  companies: Company[] = [];
  companiesByName: Company[] = [];

  constructor(private service: SearchService) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
