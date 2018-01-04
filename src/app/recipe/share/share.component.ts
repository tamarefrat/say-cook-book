import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {
  recipesIsWaiting: boolean;
  mySelected: string[];
  gotSharedRecipes: string[];
  nameAllRecipes: string[];
  nameAllSharedRecipes: string[];
  constructor(private _recipeService: RecipeService) {
    this.nameAllRecipes = this._recipeService.getNameAllRecipes();
    console.log(this.nameAllRecipes);
    this.nameAllSharedRecipes = this._recipeService.getNameSharedRecipes();
    this.recipesIsWaiting = (this.nameAllSharedRecipes.length > 0);
    this.mySelected = [];
    this.gotSharedRecipes = [];
  }

  onMySelectedOptionsChange(values: string[]) {
    this.mySelected = values;
  }
  ongotRecipesChange(values: string[]) {
    this.gotSharedRecipes = values;
  }

  shareRecipe() {

  }
  getSharedRecipes() {
    let count = 0;
    for (let i = 0; i < this._recipeService.sharedRecipes.length; i++) {
      // check if user want get recipe
      if (this.gotSharedRecipes.indexOf(this._recipeService.sharedRecipes[i].mainDetails.nameRecipe) > -1) {
        // have to add recipe and remove from shared
        this._recipeService.sharedRecipes[i].code = (this._recipeService.counter++);
        this._recipeService.allMyRecipes.push(this._recipeService.sharedRecipes[i]); // add
        this._recipeService.sharedRecipes.splice(i, 1); // remove
        count++;
      }
    }

    alert('You added succesfully ' + count + ' recipes!');
    // update arrays for this component
    this.gotSharedRecipes = [];
    this.nameAllSharedRecipes = this._recipeService.getNameSharedRecipes();
  }
  deleteSharedRecipes() {
    const ans = confirm('Are You Sure want DeleteThe Recipes From List?');
    if (ans) {
      let count = 0;
      for (let i = 0; i < this._recipeService.sharedRecipes.length; i++) {
        // check if user want get recipe
        if (this.gotSharedRecipes.indexOf(this._recipeService.sharedRecipes[i].mainDetails.nameRecipe) > -1) {
          // have to  remove from shared
          this._recipeService.sharedRecipes.splice(i, 1); // remove
          count++;
        }
        alert('You deleted succesfully ' + count + ' recipes!');
        // update arrays for this component
        this.gotSharedRecipes = [];
        this.nameAllSharedRecipes = this._recipeService.getNameSharedRecipes();
      }
    }
  }
  ngOnInit() {
    this.recipesIsWaiting = (this._recipeService.sharedRecipes.length > 0);
  }

}
