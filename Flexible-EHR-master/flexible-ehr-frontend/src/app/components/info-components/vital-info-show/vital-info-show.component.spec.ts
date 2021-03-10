import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalInfoShowComponent } from './vital-info-show.component';

describe('VitalInfoShowComponent', () => {
  let component: VitalInfoShowComponent;
  let fixture: ComponentFixture<VitalInfoShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VitalInfoShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VitalInfoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});