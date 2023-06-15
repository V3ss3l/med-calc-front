import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildPhewCalcComponent } from './child-phew-calc.component';

describe('ChildPhewCalcComponent', () => {
  let component: ChildPhewCalcComponent;
  let fixture: ComponentFixture<ChildPhewCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildPhewCalcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildPhewCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
