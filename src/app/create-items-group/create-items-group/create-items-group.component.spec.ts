import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateItemsGroupComponent } from './create-items-group.component';

describe('CreateItemsGroupComponent', () => {
  let component: CreateItemsGroupComponent;
  let fixture: ComponentFixture<CreateItemsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateItemsGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateItemsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
