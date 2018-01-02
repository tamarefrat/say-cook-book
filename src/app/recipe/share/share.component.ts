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
    this.gotSharedRecipes.forEach(element => {
      let index = this._recipeService.getIndexOfSharedRecipeByName(element);
      this._recipeService.allMyRecipes.push(this._recipeService.sharedRecipes.splice(index, 1));
      this.nameAllSharedRecipes.splice(this.nameAllSharedRecipes.indexOf(name));
      count++;
    });
    alert('You added succesfully ' + count + ' recipes!');
  }
  deleteSharedRecipes() {
    let ans = confirm('Are You Sure want DeleteThe Recipes From List?');
    if (ans) {
      let count = 0;
      this.gotSharedRecipes.forEach(element => {
        let index = this._recipeService.getIndexOfSharedRecipeByName(element);
        this._recipeService.sharedRecipes.splice(index, 1);
        this.nameAllSharedRecipes.splice(this.nameAllSharedRecipes.indexOf(name));
        count++;
      });
      alert('You deleted succesfully ' + count + ' recipes!');
    }
  }
  ngOnInit() {
    this.recipesIsWaiting = (this._recipeService.sharedRecipes.length > 0);
  }

}
