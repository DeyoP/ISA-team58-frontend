import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from 'src/app/shared/model/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private apiUrl = 'http://localhost:5555/equipments';

  constructor(private http: HttpClient) { }

  getAllEquipments(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.apiUrl);
  }

  addEquipment(equipment: Equipment, companyId: number): Observable<Equipment> {
    const url = `${this.apiUrl}/add/${companyId}`;
    return this.http.post<Equipment>(url, equipment);  
  }

  updateEquipment(id: number, equipment: Equipment): Observable<Equipment> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Equipment>(url, equipment);
  }

  deleteEquipment(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getEquipmentById(id: number): Observable<Equipment> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Equipment>(url);
  }

}