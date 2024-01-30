import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { EquipmentAppointment } from 'src/app/shared/model/equipmentAppointment.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentAppointmentService {

  private apiUrl = 'http://localhost:5555/equipmentAppointment';

  constructor(private http: HttpClient) { }

  getByEquipmentIds(equipmentIds: number[]): Observable<EquipmentAppointment[]> {
    const params = { equipmentIds: equipmentIds.join(',') };
    return this.http.get<EquipmentAppointment[]>(`${this.apiUrl}/getByEquipment`, { params });
  }

  create(appointment: EquipmentAppointment): Observable<EquipmentAppointment> {console.log(appointment.extraordinary);
    return this.http.post<EquipmentAppointment>(`${this.apiUrl}`, appointment);
  }

  createExtraordinary(appointment: EquipmentAppointment): Observable<EquipmentAppointment> {console.log(appointment.extraordinary);
    return this.http.post<EquipmentAppointment>(`${this.apiUrl}/extraordinary`, appointment);
  }
  
  getAll(): Observable<EquipmentAppointment[]> {
    return this.http.get<EquipmentAppointment[]>(`${this.apiUrl}/getAll`);
  }

  getAllReserved(): Observable<EquipmentAppointment[]> {
    return this.http.get<EquipmentAppointment[]>(`${this.apiUrl}/getAllReserved`);
  }

  getAllReservedByUserId(id: number): Observable<EquipmentAppointment[]> {
    return this.http.get<EquipmentAppointment[]>(`${this.apiUrl}/getAllByUser/${id}`);
  }

  getByCompanyId(companyId: number): Observable<EquipmentAppointment[]> {
    return this.http.get<EquipmentAppointment[]>(`${this.apiUrl}/getByCompany/${companyId}`);
  }

  cancelAppointment(id: number): Observable<EquipmentAppointment>{
    return this.http.put<EquipmentAppointment>(`${this.apiUrl}/cancelAppointment/${id}`, null);
  }

  markAppointmentAsTaken(id: number, adminId: number): Observable<EquipmentAppointment> {
    const url = `${this.apiUrl}/${id}/markAsTaken?administratorId=${adminId}`;
    return this.http.post(url, {}).pipe(
      map(response => response as EquipmentAppointment),
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 200) {
          return of(error.error as EquipmentAppointment);
        } else {
          throw error;
        }
      })
    );
  }
  
}
