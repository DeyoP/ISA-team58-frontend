import { TestBed } from '@angular/core/testing';

import { EquipmentAppointmentService } from './equipment-appointment.service';

describe('EquipmentAppointmentService', () => {
  let service: EquipmentAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
