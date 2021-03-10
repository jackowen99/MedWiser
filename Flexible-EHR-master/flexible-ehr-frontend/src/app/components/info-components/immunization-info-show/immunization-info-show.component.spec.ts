import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmunizationInfoShowComponent } from './immunization-info-show.component';

describe('ImmunizationInfoShowComponent', () => {
  let component: ImmunizationInfoShowComponent;
  let fixture: ComponentFixture<ImmunizationInfoShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmunizationInfoShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmunizationInfoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
