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

  constructor(private service: SearchService) {}

  ngOnInit(): void {
    this.service.getAllEquipment().subscribe({
      next: (result) => {
        this.equipment = result;
        this.filteredEquipment = [...this.equipment];
      }
      });
  }

  onSearch(searchTerm: string): void {
    this.filteredEquipment = this.equipment.filter((equipment) => {
      const nameMatch = equipment.name.toLowerCase().includes(searchTerm.toLowerCase());
      return nameMatch;
    });
  }
}
