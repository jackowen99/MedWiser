import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergyInToleranceInfoComponent } from './allergyInTolerance-info.component';

describe('AllergyInToleranceInfoComponent', () => {
  let component: AllergyInToleranceInfoComponent;
  let fixture: ComponentFixture<AllergyInToleranceInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllergyInToleranceInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergyInToleranceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
