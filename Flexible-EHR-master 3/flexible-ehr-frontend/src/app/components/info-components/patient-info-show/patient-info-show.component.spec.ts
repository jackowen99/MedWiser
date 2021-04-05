import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInfoShowComponent } from './patient-info-show.component';

describe('PatientInfoShowComponent', () => {
  let component: PatientInfoShowComponent;
  let fixture: ComponentFixture<PatientInfoShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientInfoShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientInfoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
