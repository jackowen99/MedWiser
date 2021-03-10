import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationInfoShowComponent } from './medication-info-show.component';

describe('MedicationInfoShowComponent', () => {
  let component: MedicationInfoShowComponent;
  let fixture: ComponentFixture<MedicationInfoShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicationInfoShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationInfoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
