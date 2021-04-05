import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergyInToleranceInfoShowComponent } from './allergyInTolerance-info-show.component';

describe('AllergyInToleranceInfoShowComponent', () => {
  let component: AllergyInToleranceInfoShowComponent;
  let fixture: ComponentFixture<AllergyInToleranceInfoShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllergyInToleranceInfoShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergyInToleranceInfoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
