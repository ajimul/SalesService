import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateItemsLocationComponent } from './create-items-location.component';

describe('CreateItemsLocationComponent', () => {
  let component: CreateItemsLocationComponent;
  let fixture: ComponentFixture<CreateItemsLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateItemsLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateItemsLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
