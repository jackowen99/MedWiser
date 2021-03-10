import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabtestsShowComponent } from './labtests-show.component';

describe('LabtestsShowComponent', () => {
  let component: LabtestsShowComponent;
  let fixture: ComponentFixture<LabtestsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabtestsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabtestsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
