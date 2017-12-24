import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsForRecipeComponent } from './options-for-recipe.component';

describe('OptionsForRecipeComponent', () => {
  let component: OptionsForRecipeComponent;
  let fixture: ComponentFixture<OptionsForRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsForRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsForRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
