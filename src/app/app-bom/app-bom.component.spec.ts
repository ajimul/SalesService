import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBomComponent } from './app-bom.component';

describe('AppBomComponent', () => {
  let component: AppBomComponent;
  let fixture: ComponentFixture<AppBomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppBomComponent]
    });
    fixture = TestBed.createComponent(AppBomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
