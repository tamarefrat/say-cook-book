import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByKeywordsComponent } from './search-by-keywords.component';

describe('SearchByKeywordsComponent', () => {
  let component: SearchByKeywordsComponent;
  let fixture: ComponentFixture<SearchByKeywordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByKeywordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByKeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
