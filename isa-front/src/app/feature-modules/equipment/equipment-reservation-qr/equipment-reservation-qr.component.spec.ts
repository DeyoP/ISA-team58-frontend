import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentReservationQrComponent } from './equipment-reservation-qr.component';

describe('EquipmentReservationQrComponent', () => {
  let component: EquipmentReservationQrComponent;
  let fixture: ComponentFixture<EquipmentReservationQrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipmentReservationQrComponent]
    });
    fixture = TestBed.createComponent(EquipmentReservationQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
