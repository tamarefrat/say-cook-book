import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldRecipeComponent } from './old-recipe.component';

describe('OldRecipeComponent', () => {
  let component: OldRecipeComponent;
  let fixture: ComponentFixture<OldRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
