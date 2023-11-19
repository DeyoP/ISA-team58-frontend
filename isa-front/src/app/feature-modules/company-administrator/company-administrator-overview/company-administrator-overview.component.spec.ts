import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAdministratorOverviewComponent } from './company-administrator-overview.component';

describe('CompanyAdministratorOverviewComponent', () => {
  let component: CompanyAdministratorOverviewComponent;
  let fixture: ComponentFixture<CompanyAdministratorOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyAdministratorOverviewComponent]
    });
    fixture = TestBed.createComponent(CompanyAdministratorOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
