import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryInfoShowComponent } from './laboratory-info-show.component';

describe('LaboratoryInfoShowComponent', () => {
  let component: LaboratoryInfoShowComponent;
  let fixture: ComponentFixture<LaboratoryInfoShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoryInfoShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryInfoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});