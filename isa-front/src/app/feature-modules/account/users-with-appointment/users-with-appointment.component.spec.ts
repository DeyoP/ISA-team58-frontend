import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersWithAppointmentComponent } from './users-with-appointment.component';

describe('UsersWithAppointmentComponent', () => {
  let component: UsersWithAppointmentComponent;
  let fixture: ComponentFixture<UsersWithAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersWithAppointmentComponent]
    });
    fixture = TestBed.createComponent(UsersWithAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
