import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmiComponent } from './view-emi.component';

describe('EmiCollectionComponent', () => {
  let component: ViewEmiComponent;
  let fixture: ComponentFixture<ViewEmiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
