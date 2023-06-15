import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartCalcComponent } from './heart-calc.component';

describe('HeartCalcComponent', () => {
  let component: HeartCalcComponent;
  let fixture: ComponentFixture<HeartCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeartCalcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeartCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
