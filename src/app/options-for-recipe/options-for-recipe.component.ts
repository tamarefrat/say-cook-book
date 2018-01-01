import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { RecipeComponent } from '../recipe/recipe.component';

@Component({
  selector: 'app-options-for-recipe',
  templateUrl: './options-for-recipe.component.html',
  styleUrls: ['./options-for-recipe.component.css']
})
export class OptionsForRecipeComponent implements OnInit {

  constructor(private _recipeService: RecipeService) {

  }

  ngOnInit() {
  }
/*  createRecipe() {
    this._recipeService.allMyRecipes.push(new RecipeComponent(this._recipeService,appRoutes));
    alert('recipe created' + this._recipeService.counter);
  }*/

}
