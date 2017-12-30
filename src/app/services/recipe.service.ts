import { Injectable } from '@angular/core';
import { InstructionLineComponent } from '../instruction-line/instruction-line.component';
import { RecipeComponent } from '../recipe/recipe.component';


@Injectable()

export class RecipeService {
  /*observableAllRecipies:FirebaseListObservable<any[]>;
  observableOptionCategories: FirebaseListObservable<any[]>;
  observableFavorites: FirebaseListObservable<any[]>;
  */
  allMyRecipes: RecipeComponent[];
  optionCategories: string[];
  counter: number; // starts from 0 - and every recipe get the counter++ for his code
  favorites: any[];


  constructor() {/*(private af:angularFire ) {*/
    this.allMyRecipes = [];
    this.optionCategories = ['cakes', 'parve', 'easy', 'milk', 'coockies', 'similiar'];
    this.counter = 0;
    this.favorites = ['milk', 'easy', 'parve'];
  }

  getRecipe(code): RecipeComponent {
    return this.allMyRecipes[this.getIndexOfRecipeByCode(code)];
  }



  getIndexOfRecipeByCode(code: number) {
    if (this.allMyRecipes === null) { return null; }
    for (let i = 0; i < this.allMyRecipes.length; i++) {
      if (this.allMyRecipes[i].code === code) {
        return i;
      }
      return null;
    }
  }

  /****************************************************** */
/*data base functions
getAllRecipies() {
  this.observableAllRecipies = this.af.database.list
}*/
}
