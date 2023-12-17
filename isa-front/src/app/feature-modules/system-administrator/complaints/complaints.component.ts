import { Component, OnInit } from '@angular/core';
import { SystemAdministratorService } from '../system-administrator.service';
import { Complaint } from 'src/app/shared/model/complaint.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  complaints: Complaint[] = [];
  responseForm: FormGroup = this.formBuilder.group({
    response: ['', Validators.required]
  });

  constructor(private service: SystemAdministratorService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints() {
    this.service.getComplaints().subscribe(data => {
      this.complaints = data;
    });
  }

  updateResponse(complaint: Complaint) {
    let updatedComplaint = complaint;
    updatedComplaint.response = this.responseForm.value.response;
    this.service.updateComplaint(updatedComplaint).subscribe(() => {
      this.loadComplaints();
      this.responseForm.reset();
    }, error => {
      console.error('Error updating response:', error);
    });
  }
}
