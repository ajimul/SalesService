import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAmcComponent } from './update-amc.component';

describe('UpdateAmcComponent', () => {
  let component: UpdateAmcComponent;
  let fixture: ComponentFixture<UpdateAmcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAmcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAmcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
