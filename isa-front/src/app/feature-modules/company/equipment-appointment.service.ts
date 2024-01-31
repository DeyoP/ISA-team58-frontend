import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  getAllTaken(): Observable<EquipmentAppointment[]> {
    return this.http.get<EquipmentAppointment[]>(`${this.apiUrl}/getAllTaken`);
  }

  getAllReservedByUserId(id: number): Observable<EquipmentAppointment[]> {
    return this.http.get<EquipmentAppointment[]>(`${this.apiUrl}/getAllReservedByUser/${id}`);
  }

  getAllTakenByUserId(id: number): Observable<EquipmentAppointment[]> {
    return this.http.get<EquipmentAppointment[]>(`${this.apiUrl}/getAllTakenByUser/${id}`);
  }

  getByCompanyId(companyId: number): Observable<EquipmentAppointment[]> {
    return this.http.get<EquipmentAppointment[]>(`${this.apiUrl}/getByCompany/${companyId}`);
  }

  cancelAppointment(id: number): Observable<EquipmentAppointment>{
    return this.http.put<EquipmentAppointment>(`${this.apiUrl}/cancelAppointment/${id}`, null);
  }

  userHasAppointmentInCompany(userId: number, companyId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/hasAppointmentInCompany/${userId}/${companyId}`);
  }

  getQRCode(id: number): Observable<Blob> {
    // Set the responseType to 'blob' to handle binary data
    return this.http.get(`${this.apiUrl}/getQRCode/${id}`, { responseType: 'blob' });
  }
}
