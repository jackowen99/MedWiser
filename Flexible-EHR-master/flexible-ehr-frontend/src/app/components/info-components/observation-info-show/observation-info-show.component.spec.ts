import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationInfoShowComponent } from './observation-info-show.component';

describe('ObservationInfoShowComponent', () => {
  let component: ObservationInfoShowComponent;
  let fixture: ComponentFixture<ObservationInfoShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationInfoShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationInfoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
