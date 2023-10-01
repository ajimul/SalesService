import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmiControlComponent } from './view-emi-control.component';

describe('ViewEmiControlComponent', () => {
  let component: ViewEmiControlComponent;
  let fixture: ComponentFixture<ViewEmiControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmiControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmiControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
