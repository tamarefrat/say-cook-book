import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { RecipeComponent } from '../recipe/recipe.component';
import { DataBaseService } from '../services/data-base.service';

@Component({
  selector: 'app-main-details',
  templateUrl: './main-details.component.html',
  styleUrls: ['./main-details.component.scss']
})
export class MainDetailsComponent implements OnInit {

  @Input() code: string;
  @Input() nameRecipe: string;
  @Input() getFrom: string;
  @Input() category1: string;
  @Input() category2: string;
  @Input() category3: string;
  @Input() urlImg: string;
  @Input() comment: string;
  @Input() statusDetails: number; /*options: 0=>created, 1=>i=on save, 2=>in adit, 4=>deleted*/
  @Input() index: number;
  path: any;

  constructor(private _recipeService: RecipeService, public dbs: DataBaseService) {
    this.code = this.dbs.recipeInWork.code;
    this.dbs.recipeInWork.mainDetails = this;

    this.comment = '';
    this.getFrom = '';
    this.category1 = '';
    this.category2 = '';
    this.category3 = '';
    this.statusDetails = 0;



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
   /* const rec = this._recipeService.getRecipe(this.code);
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
    console.log(this);*/
    const rec = this.dbs.getRecipeByID(this.code);
    if (rec) {
      // recipe axist in db- have to update
      this.dbs.updateRecipe(this.dbs.recipeInWork);
      this.statusDetails = 1;

    } else {
      // new recipe- have to add to list
      this.dbs.addRecipe(this.dbs.recipeInWork);
      this.statusDetails = 1;
      // this._recipeService.allMyRecipes.push(this._recipeService.newRecipe); // have to delete?
      // this._recipeService.addNewRecipeToDB(this._recipeService.newRecipe);
    }
  }



  ngOnInit() {
    /*const rec = this._recipeService.getRecipe(this.code);
    console.log('status' + this.statusDetails);
    if (rec) {

      this.nameRecipe = rec.mainDetails.nameRecipe;
      this.getFrom = rec.mainDetails.getFrom;
      this.category1 = rec.mainDetails.category1;
      this.category2 = rec.mainDetails.category2;
      this.category3 = rec.mainDetails.category3;
      this.urlImg = rec.mainDetails.urlImg;

      this.comment = rec.mainDetails.comment;
      this.statusDetails = rec.mainDetails.statusDetails;*/
      this.code = this.dbs.recipeInWork.code;

    if (this.code) {
      this.dbs.recipeInWork.mainDetails = this;
      const rec = this.dbs.getRecipeByID(this.code);
      if (rec) {
        this.nameRecipe = rec.nameRecipe;

        this.comment = rec.comment;
        this.urlImg = rec.urlImg;
        this.category1 = rec.category1;
        this.category2 = rec.category2;
        this.category3 = rec.category3;
        this.getFrom = rec.getFrom;
        this.statusDetails = 1;
      } else {
        // didnt found recipe
        console.log('error');

      }
    } else {
      // it is a new recipe!!!!!!!!!!!!!!!!!!!!!!!
      this.code = '' + this.dbs.counterRecipe;
      this.statusDetails = 0;
    }

    }
  }

/*end of class*/

/********************************************************* */

