import { TestBed } from '@angular/core/testing';

import { AvailableTimeSlotsService } from './available-time-slots.service';

describe('AvailableTimeSlotsService', () => {
  let service: AvailableTimeSlotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailableTimeSlotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
