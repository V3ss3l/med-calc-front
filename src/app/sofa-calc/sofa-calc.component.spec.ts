import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SofaCalcComponent } from './sofa-calc.component';

describe('SofaCalcComponent', () => {
  let component: SofaCalcComponent;
  let fixture: ComponentFixture<SofaCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SofaCalcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SofaCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
