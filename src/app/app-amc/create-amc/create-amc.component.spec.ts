import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAmcComponent } from './create-amc.component';

describe('CreateAmcComponent', () => {
  let component: CreateAmcComponent;
  let fixture: ComponentFixture<CreateAmcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAmcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAmcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
