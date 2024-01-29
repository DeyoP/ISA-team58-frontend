import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAdminHomePageComponent } from './company-admin-home-page.component';

describe('CompanyAdminHomePageComponent', () => {
  let component: CompanyAdminHomePageComponent;
  let fixture: ComponentFixture<CompanyAdminHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyAdminHomePageComponent]
    });
    fixture = TestBed.createComponent(CompanyAdminHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
