import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedurerequestInfoComponent } from './procedurerequest-info.component';

describe('ProcedurerequestInfoComponent', () => {
  let component: ProcedurerequestInfoComponent;
  let fixture: ComponentFixture<ProcedurerequestInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedurerequestInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedurerequestInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
