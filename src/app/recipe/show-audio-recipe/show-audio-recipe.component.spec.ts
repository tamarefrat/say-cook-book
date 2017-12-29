import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAudioRecipeComponent } from './show-audio-recipe.component';

describe('ShowAudioRecipeComponent', () => {
  let component: ShowAudioRecipeComponent;
  let fixture: ComponentFixture<ShowAudioRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAudioRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAudioRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
