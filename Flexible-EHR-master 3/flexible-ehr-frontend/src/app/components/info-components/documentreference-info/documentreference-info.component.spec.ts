import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentreferenceInfoComponent } from './documentreference-info.component';

describe('DocumentreferenceInfoComponent', () => {
  let component: DocumentreferenceInfoComponent;
  let fixture: ComponentFixture<DocumentreferenceInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentreferenceInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentreferenceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
