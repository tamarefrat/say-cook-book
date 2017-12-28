import { Injectable } from '@angular/core';
import { InstructionLineComponent } from '../instruction-line/instruction-line.component';
import { RecipeComponent } from '../recipe/recipe.component';


@Injectable()

export class RecipeService {
  allMyRecipes: RecipeComponent[];
  optionCategories: string[];
  counter: number; // starts from 0 - and every recipe get the counter++ for his code
  favorites: any[];


  constructor() {
    this.allMyRecipes = [];
    this.optionCategories = ['cakes', 'parve', 'easy', 'milk', 'coockies', 'similiar'];
    this.counter = 0;
    this.favorites = ['milk', 'fishes', 'parve'];
  }

  getRecipe(code): RecipeComponent {
    return this.allMyRecipes[this.getIndexOfRecipeByCode(code)];
  }
  /*
    getInstructions() {
      return this.instructions;
    }
  */


  getIndexOfRecipeByCode(code: number) {
    if (this.allMyRecipes === null) { return null; }
    for (let i = 0; i < this.allMyRecipes.length; i++) {
      if (this.allMyRecipes[i].code === code) {
        return i;
      }
      return null;
    }
  }

}
