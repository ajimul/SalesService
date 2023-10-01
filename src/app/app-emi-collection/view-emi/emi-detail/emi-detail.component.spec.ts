import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmiDetailComponent } from './emi-detail.component';

describe('EmiDetailComponent', () => {
  let component: EmiDetailComponent;
  let fixture: ComponentFixture<EmiDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmiDetailComponent]
    });
    fixture = TestBed.createComponent(EmiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
