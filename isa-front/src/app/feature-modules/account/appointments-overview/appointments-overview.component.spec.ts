import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsOverviewComponent } from './appointments-overview.component';

describe('AppointmentsOverviewComponent', () => {
  let component: AppointmentsOverviewComponent;
  let fixture: ComponentFixture<AppointmentsOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentsOverviewComponent]
    });
    fixture = TestBed.createComponent(AppointmentsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
