import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableTimeSlotsOverviewComponent } from './available-time-slots-overview.component';

describe('AvailableTimeSlotsOverviewComponent', () => {
  let component: AvailableTimeSlotsOverviewComponent;
  let fixture: ComponentFixture<AvailableTimeSlotsOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableTimeSlotsOverviewComponent]
    });
    fixture = TestBed.createComponent(AvailableTimeSlotsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
