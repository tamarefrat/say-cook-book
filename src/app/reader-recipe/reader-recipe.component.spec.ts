import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderRecipeComponent } from './reader-recipe.component';

describe('ReaderRecipeComponent', () => {
  let component: ReaderRecipeComponent;
  let fixture: ComponentFixture<ReaderRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReaderRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
