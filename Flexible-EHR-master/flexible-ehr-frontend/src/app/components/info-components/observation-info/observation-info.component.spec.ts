import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationInfoComponent } from './observation-info.component';

describe('ObservationInfoComponent', () => {
  let component: ObservationInfoComponent;
  let fixture: ComponentFixture<ObservationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
