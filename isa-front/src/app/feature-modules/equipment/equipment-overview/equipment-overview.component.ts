import { Component, OnInit } from '@angular/core';
import { Equipment } from 'src/app/shared/model/equipment.model';
import { EquipmentService } from '../equipment.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../company/company.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-equipment-overview',
  templateUrl: './equipment-overview.component.html',
  styleUrls: ['./equipment-overview.component.css']
})

export class EquipmentOverviewComponent implements OnInit{
  equipment: Equipment = {} as Equipment;
  equipments: Equipment[] = [];
  companyId: number | null = null; 

  addForm: FormGroup;
  shouldRenderAddForm = false;
  shouldAdd = false;
  
  updateForm: FormGroup;
  shouldRenderUpdateForm = false;
  shouldEdit = false;
  
  filteredEquipment: Equipment[] = [];
  nameSearch: string = '';
  typeSearch: string = '';
  
  constructor(private equipmentService: EquipmentService, private route: ActivatedRoute, private formBuilder: FormBuilder, private companyService: CompanyService) {
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      rating: ['', Validators.required]
    });

    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      rating: ['', Validators.required],
      company: [this.companyId, Validators.required]
    });

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.companyId = id ? parseInt(id, 10) : null;
  
      if (this.companyId !== null) {
        this.getCompanyEquipments(this.companyId);
        this.addForm.patchValue({ company: this.companyId });
      }
    });
  }
  
  getCompanyEquipments(companyId: number): void {
    this.companyService.getCompanyEquipments(companyId).subscribe({
      next: (equipmentList: Equipment[]) => {
        this.equipments = equipmentList;
        this.filteredEquipment = [...this.equipments];
      },
      error: (error: any) => {
        console.error('Error loading company equipments:', error);
      },
    });
  }

  onAddClicked(): void {
    this.shouldRenderAddForm = true;
    this.shouldAdd = true;
  }

  addEquipment(): void {
    if (this.addForm.valid) {
      const newEquipment: Equipment = this.addForm.value;
  
      this.equipmentService.addEquipment(newEquipment, this.companyId!).subscribe(
        () => {
          this.shouldRenderAddForm = false;
          this.shouldAdd = false;
          this.getCompanyEquipments(this.companyId!);
          console.log('Equipment added successfully');
        },
        error => {
          console.error('Error adding equipment:', error);
        }
      );
    }
  }

  cancelAdd() {
    this.shouldAdd = false;
    this.shouldRenderAddForm = false;
  }

  onEditClicked(equipment: Equipment) {
    this.shouldEdit = true;
    this.shouldRenderUpdateForm = true;
    this.equipment = equipment;

    this.updateForm.patchValue({
      name: this.equipment.name,
      description: this.equipment.description,
      type: this.equipment.type,
      rating: this.equipment.rating
    });
  }
  
  updateEquipment() {
    if (this.updateForm.valid) {
      const updatedEquipment: Equipment = this.updateForm.value;

      this.equipmentService.updateEquipment(this.equipment.id, updatedEquipment).subscribe(
          () => {
              this.equipment = updatedEquipment;
              this.shouldRenderUpdateForm = false;
              this.shouldEdit = false;
              this.getCompanyEquipments(this.companyId!);
              console.log('Equipment updated successfully');
           },
          error => {
              console.error('Error updating equipment:', error);
          }
      );
    }
  }
  
  cancelUpdate() {
    this.shouldEdit = false;
    this.shouldRenderUpdateForm = false;
  }

  onDeleteClick(equipment: Equipment): void {
    this.equipment = equipment;
    this.equipmentService.deleteEquipment(equipment.id).subscribe(() => {
      this.getCompanyEquipments(this.companyId!);
      console.log("Equipment successfully deleted");
    });
  }

  onSearch(): void {
    this.filteredEquipment = this.equipments.filter((equipment) => {
      const nameMatch = equipment.name.toLowerCase().includes(this.nameSearch.toLowerCase());
      const typeMatch = equipment.type.toLowerCase().includes(this.typeSearch.toLowerCase());
      return nameMatch && typeMatch;
    });
  }

}
