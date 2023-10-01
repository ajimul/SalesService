import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExpencesComponent } from './create-expences.component';

describe('CreateExpencesComponent', () => {
  let component: CreateExpencesComponent;
  let fixture: ComponentFixture<CreateExpencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateExpencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExpencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
