import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewServiceControlComponent } from './view-service-control.component';

describe('ViewServiceControlComponent', () => {
  let component: ViewServiceControlComponent;
  let fixture: ComponentFixture<ViewServiceControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewServiceControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewServiceControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
