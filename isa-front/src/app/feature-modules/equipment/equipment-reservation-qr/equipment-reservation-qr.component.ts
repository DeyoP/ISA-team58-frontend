import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-equipment-reservation-qr',
  templateUrl: './equipment-reservation-qr.component.html',
  styleUrls: ['./equipment-reservation-qr.component.css']
})
export class EquipmentReservationQrComponent {

  imageUrl: any;
  currentFile: File | null = null;

  constructor(private http: HttpClient) {}

  onImageSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.currentFile = selectedFile;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  uploadImage() {
    const formData = new FormData();
    formData.append('qrCodeImage', this.currentFile!);
    this.http.post<any>('http://localhost:5555/equipmentAppointment/takeEquipment', formData).subscribe({
      next: (result) => {
        if (result === true) {
          alert('Equipment taken successfully!');
        } else {
          alert('Equipment not taken successfully!');
        }
      }
    });
  }
}