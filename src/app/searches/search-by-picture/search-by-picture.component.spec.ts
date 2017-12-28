import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByPictureComponent } from './search-by-picture.component';

describe('SearchByPictureComponent', () => {
  let component: SearchByPictureComponent;
  let fixture: ComponentFixture<SearchByPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
