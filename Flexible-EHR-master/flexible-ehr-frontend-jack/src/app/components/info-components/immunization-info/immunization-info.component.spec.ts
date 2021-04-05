import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmunizationInfoComponent } from './immunization-info.component';

describe('ImmunizationInfoComponent', () => {
  let component: ImmunizationInfoComponent;
  let fixture: ComponentFixture<ImmunizationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmunizationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmunizationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
