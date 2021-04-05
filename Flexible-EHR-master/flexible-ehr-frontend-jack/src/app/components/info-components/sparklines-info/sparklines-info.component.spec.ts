import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparklinesInfoComponent } from './sparklines-info.component';

describe('SparklinesInfoComponent', () => {
  let component: SparklinesInfoComponent;
  let fixture: ComponentFixture<SparklinesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparklinesInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparklinesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
