import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvailableTimeSlots } from 'src/app/shared/model/available-time-slots.model';

@Injectable({
  providedIn: 'root'
})
export class AvailableTimeSlotsService {

  private apiUrl = 'http://localhost:5555/availableTimeSlots';

  constructor(private http: HttpClient) { }

  getAllAvailableTimeSlots(): Observable<AvailableTimeSlots[]> {
    const url = `${this.apiUrl}/getAll`;
    return this.http.get<AvailableTimeSlots[]>(url);
  }

  addAvailabeTimeSlot(availableTimeSlot: AvailableTimeSlots, companyId: number, administratorId: number, equipmentId: number): Observable<AvailableTimeSlots> {
    console.log(availableTimeSlot)
    console.log(administratorId)
    console.log(companyId)
    console.log(equipmentId)
    const url = `${this.apiUrl}/add?companyId=${companyId}&administratorId=${administratorId}&equipmentId=${equipmentId}`;
    return this.http.post<AvailableTimeSlots>(url, availableTimeSlot);  
  }
  
  getAvailableTimeSlotById(id: number): Observable<AvailableTimeSlots> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<AvailableTimeSlots>(url);
  }
}
