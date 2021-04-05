import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureInfoShowComponent } from './procedure-info-show.component';

describe('ProcedureInfoShowComponent', () => {
  let component: ProcedureInfoShowComponent;
  let fixture: ComponentFixture<ProcedureInfoShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureInfoShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureInfoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
