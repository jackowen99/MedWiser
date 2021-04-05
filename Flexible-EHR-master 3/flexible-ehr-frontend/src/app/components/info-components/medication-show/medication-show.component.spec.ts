import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationShowComponent } from './medication-show.component';

describe('MedicationShowComponent', () => {
  let component: MedicationShowComponent;
  let fixture: ComponentFixture<MedicationShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicationShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
