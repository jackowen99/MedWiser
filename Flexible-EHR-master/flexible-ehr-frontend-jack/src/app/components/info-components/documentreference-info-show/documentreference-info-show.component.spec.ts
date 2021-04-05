import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentreferenceInfoShowComponent } from './documentreference-info-show.component';

describe('DocumentreferenceInfoShowComponent', () => {
  let component: DocumentreferenceInfoShowComponent;
  let fixture: ComponentFixture<DocumentreferenceInfoShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentreferenceInfoShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentreferenceInfoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
