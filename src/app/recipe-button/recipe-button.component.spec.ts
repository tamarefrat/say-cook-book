import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeButtonComponent } from './recipe-button.component';

describe('RecipeButtonComponent', () => {
  let component: RecipeButtonComponent;
  let fixture: ComponentFixture<RecipeButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
