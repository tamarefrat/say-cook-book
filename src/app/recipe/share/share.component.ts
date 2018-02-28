import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { DataBaseService, Recipe } from '../../services/data-base.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {

  mySelected: Recipe[];
  gotSharedRecipes: Recipe[];
// dbs;

  constructor(private _recipeService: RecipeService,
    public dbs: DataBaseService,
    private router: Router) {
// this.dbs = dbs;
    this.mySelected = [];
    this.gotSharedRecipes = [];

  }


  apears(friend) {
    return (this.dbs.userNameList.indexOf(friend) > 0);
  }

  shareRecipe(friendId, recipes) {
    this.mySelected = this.dbs.recipeList;

    this.dbs.userToShare = friendId;
    this.dbs.shareWithOtherUserMyRecipe(recipes, friendId, true);
   /* for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].selected) {
        // have to share this recipe
        this.dbs.shareWithOtherUserMyRecipe(this.mySelected[i].id, friendId);
        console.log(this.mySelected[i].nameRecipe);
      }
    }*/
     this.router.navigate(['/']);
    this.dbs.createAlert('success', 'Shared successfully with ' + friendId, '');
  }
  getSharedRecipes(recipes) {
    let count = 0;
    this.gotSharedRecipes = this.dbs.sharedRecipeList;

     for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].selected) {
        // have to get this recipe
        this.dbs.enableRecipeFromShare(this.gotSharedRecipes[i]);
        console.log(this.gotSharedRecipes[i].nameRecipe);
        count++;
      }
    }

this.dbs.createAlert('success', 'You added succesfully ' + count + ' recipes!', '');
   }

  deleteSharedRecipes(recipes) {
 let count = 0;
    this.gotSharedRecipes = this.dbs.sharedRecipeList;

     for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].selected) {
        // have to get this recipe
        this.dbs.deleteRecipe(this.gotSharedRecipes[i].id);
        console.log(this.gotSharedRecipes[i].nameRecipe);
        count++;
      }
    }

this.dbs.createAlert('success', 'You deleted succesfully ' + count + ' recipes!', '');
}

  ngOnInit() {
    /*this.allRecipes = this.dbs.recipeList;
    console.log(this.allRecipes);
    this.allSharedRecipes = this.dbs.sharedRecipeList;
    this.recipesIsWaiting = (this.allSharedRecipes.length > 0);*/
  }

}
