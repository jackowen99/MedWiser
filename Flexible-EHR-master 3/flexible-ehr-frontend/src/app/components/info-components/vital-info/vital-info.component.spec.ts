import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalInfoComponent } from './vital-info.component';

describe('VitalInfoComponent', () => {
  let component: VitalInfoComponent;
  let fixture: ComponentFixture<VitalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VitalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VitalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
