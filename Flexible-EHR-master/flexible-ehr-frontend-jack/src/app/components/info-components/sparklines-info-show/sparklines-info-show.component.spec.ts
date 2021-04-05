import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparklinesInfoShowComponent } from './sparklines-info-show.component';

describe('SparklinesInfoShowComponent', () => {
  let component: SparklinesInfoShowComponent;
  let fixture: ComponentFixture<SparklinesInfoShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparklinesInfoShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparklinesInfoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
