import { Component } from '@angular/core';
import { Equipment } from 'src/app/shared/model/equipment.model';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-equipment-search',
  templateUrl: './equipment-search.component.html',
  styleUrls: ['./equipment-search.component.css']
})
export class EquipmentSearchComponent {

  equipment: Equipment[] = [];
  filteredEquipment: Equipment[] = [];
  nameSearch: string = '';
  typeSearch: string = '';
  minRating: number = 1;
  maxRating: number = 5;

  constructor(private service: SearchService) {}

  ngOnInit(): void {
    this.service.getAllEquipment().subscribe({
      next: (result) => {
        this.equipment = result;
        this.filteredEquipment = [...this.equipment];
      }
      });
  }

  onSearch(): void {
    this.filteredEquipment = this.equipment.filter((equipment) => {
      const nameMatch = equipment.name.toLowerCase().includes(this.nameSearch.toLowerCase());
      const typeMatch = equipment.type.toLowerCase().includes(this.typeSearch.toLowerCase());
      const ratingMatch = equipment.rating >= this.minRating && equipment.rating <= this.maxRating;
      return nameMatch && typeMatch && ratingMatch;
    });
  }
}
