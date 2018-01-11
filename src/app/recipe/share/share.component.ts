import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { DataBaseService, Recipe } from '../../services/data-base.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  recipesIsWaiting: boolean;
  chooseFreind: boolean;
  mySelected: Recipe[]; // ?????????????????????????????????????????
  gotSharedRecipes: Recipe[];  // ?????????????????????????????????
  allRecipes: any[];
  allSharedRecipes: any[];
  constructor(private _recipeService: RecipeService, private dbs: DataBaseService) {
    this.allRecipes = this.dbs.recipeList;
    console.log(this.allRecipes);
    this.allSharedRecipes = this.dbs.sharedRecipeList;
    this.recipesIsWaiting = (this.allSharedRecipes.length > 0);
    this.mySelected = [];
    this.gotSharedRecipes = [];
    this.chooseFreind = false;
  }

  onMySelectedOptionsChange(values: any[]) {
    this.mySelected = values;
  }
  ongotRecipesChange(values: any[]) {
    this.gotSharedRecipes = values;
  }
  apears(friend) {
    return (this.dbs.userNameList.indexOf(friend) > 0);
  }

  shareRecipe(friendId) {
    this.dbs.userToShare = friendId;
this.mySelected.forEach(element => {
  this.dbs.shareWithOtherUserMyRecipe(element.id, friendId);
});
  }
  getSharedRecipes() {
    let count = 0;
    this.gotSharedRecipes.forEach(element => {
      this.dbs.enableRecipeFromShare(element);
      count++;
    });
    /* let count = 0;
     for (let i = 0; i < this._recipeService.sharedRecipes.length; i++) {
       // check if user want get recipe
       if (this.gotSharedRecipes.indexOf(this._recipeService.sharedRecipes[i].mainDetails.nameRecipe) > -1) {
         // have to add recipe and remove from shared
         this._recipeService.sharedRecipes[i].code = (this._recipeService.counter++);
         this._recipeService.allMyRecipes.push(this._recipeService.sharedRecipes[i]); // add
         this._recipeService.sharedRecipes.splice(i, 1); // remove
         count++;
       }
     }*/

    alert('You added succesfully ' + count + ' recipes!');
    // update arrays for this component
  /*  this.gotSharedRecipes = [];
    this.nameAllSharedRecipes = this._recipeService.getNameSharedRecipes();*/
  }
  deleteSharedRecipes() {
    const ans = confirm('Are You Sure want DeleteThe Recipes From List?');
    if (ans) {
      let count = 0;
   /* for (let i = 0; i < this._recipeService.sharedRecipes.length; i++) {
        // check if user want get recipe
        if (this.gotSharedRecipes.indexOf(this._recipeService.sharedRecipes[i].mainDetails.nameRecipe) > -1) {
          // have to  remove from shared
          this._recipeService.sharedRecipes.splice(i, 1); // remove
          count++;
        }*/
        this.gotSharedRecipes.forEach(element => {
          this.dbs.deleteRecipe(element.id);
          count++;
        });
        alert('You deleted succesfully ' + count + ' recipes!');
        // update arrays for this component
       /* this.gotSharedRecipes = [];
        this.nameAllSharedRecipes = this._recipeService.getNameSharedRecipes();*/
      }
    }

  ngOnInit() {
    this.allRecipes = this.dbs.recipeList;
    console.log(this.allRecipes);
    this.allSharedRecipes = this.dbs.sharedRecipeList;
    this.recipesIsWaiting = (this.allSharedRecipes.length > 0);
  }

}
