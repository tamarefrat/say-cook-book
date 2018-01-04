import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { RecipeComponent } from '../recipe/recipe.component';

@Component({
  selector: 'app-main-details',
  templateUrl: './main-details.component.html',
  styleUrls: ['./main-details.component.scss']
})
export class MainDetailsComponent implements OnInit {

  @Input() code: number;
  @Input() nameRecipe: string;
  @Input() getFrom: string;
  @Input() category1: string;
  @Input() category2: string;
  @Input() category3: string;
  @Input() urlImg = 'assets/Say CookBook logo.ico';
  @Input() comment: string;
  @Input() statusDetails: number; /*options: 0=>created, 1=>i=on save, 2=>in adit, 4=>deleted*/
  @Input() index: number;

  constructor(private _recipeService: RecipeService) {
/*this.getFrom = '';
this.nameRecipe = '';
this.comment = '';*/
  }
  /*functions*/
  /******************************************************************************************* */

  /************************************************************************************************* */


  /* getImage() {
     let filepath = document.getElementById('choosedImg').value;
     let a = filepath.split('\\');
 return a[a.length - 1];
 }*/
  /*details functions*/


  aditDetails() {
    this.statusDetails = 2;
  }

  /*deleteRecipe() {
    this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
    const ans = confirm('Are You Sure?\nAre you want delete this recipe from your application?');
   */ /*.title('Are You Sure?')
             .textContent('Are you want delete this recipe from your application?')
             .ariaLabel('delete recipe')
             .ok('Delete Recipe')
             .cancel('return without delete');*/
  /*if (!ans) {
    return;
  }
  this.statusDetails = 4;
  const index = this._recipeService.getIndexOfRecipeByCode(this.code);
  this._recipeService.allMyRecipes.splice(index, 1);
}*/

  saveRecipe() {
    const rec = this._recipeService.getRecipe(this.code);
    if (rec) {
      // a old recipe
      this.index = this._recipeService.getIndexOfRecipeByCode(this.code); // ?????????????????????????????????
      this._recipeService.allMyRecipes[this.index].mainDetails = this; // ????????????????????????????????????????
      rec.mainDetails = this;
      this._recipeService.updateMainDetails(this.code, rec);
    } else {
      // a new recipe
      this._recipeService.newRecipe.mainDetails = this;
    }
    this.statusDetails = 1;
    console.log(this);
  }



  ngOnInit() {
    const rec = this._recipeService.getRecipe(this.code);
    console.log('status' + this.statusDetails);
    if (rec) {

      this.nameRecipe = rec.mainDetails.nameRecipe;
      this.getFrom = rec.mainDetails.getFrom;
      this.category = rec.mainDetails.category;
      this.urlImg = rec.mainDetails.urlImg;

      this.comment = rec.mainDetails.comment;
      this.statusDetails = rec.mainDetails.statusDetails;

    }
  }


}/*end of class*/

/********************************************************* */

