import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryInfoComponent } from './laboratory-info.component';

describe('LaboratoryInfoComponent', () => {
  let component: LaboratoryInfoComponent;
  let fixture: ComponentFixture<LaboratoryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoryInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
