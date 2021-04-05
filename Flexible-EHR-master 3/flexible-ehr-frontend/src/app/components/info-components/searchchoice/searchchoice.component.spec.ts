import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchchoiceComponent } from './searchchoice.component';

describe('SearchchoiceComponent', () => {
  let component: SearchchoiceComponent;
  let fixture: ComponentFixture<SearchchoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchchoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchchoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
