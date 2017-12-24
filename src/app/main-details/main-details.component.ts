import { Component, OnInit , Input} from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { RecipeComponent } from '../recipe/recipe.component';

@Component({
  selector: 'app-main-details',
  templateUrl: './main-details.component.html',
  styleUrls: ['./main-details.component.css']
})
export class MainDetailsComponent implements OnInit {

  @Input() code: number;
  @Input() nameRecipe: string;
  @Input() getFrom: string;
  @Input() category: string[]; /* change to final number///?*/
  @Input() urlImg: string;
  @Input() keyWords: string[];
  @Input() comment: string;
  @Input() statusDetails: number; /*options: 0=>created, 1=>i=on save, 2=>in adit, 4=>deleted*/
  @Input() partToShow: number; /*options:0=>main details, 1=>items, 2=>instructions*/


  constructor(private _recipeService: RecipeService) {
    this._recipeService.allMyRecipes.push(new RecipeComponent(this._recipeService)); //have to delete
    this.code = 1111;
    /*this.nameRecipe = 'choclate cake';
    this.getFrom = 'tami';*/
    this.statusDetails = 0;
    this.category = ['', '', ''];
    this.urlImg = 'assets/saveBtn.png';

    this.keyWords = ['chocalate'];
    /* this.comment = 'delitios';*/


  }
  /*functions*/
  /******************************************************************************************* */

  /************************************************************************************************* */

  /*details functions*/
  firstSaveDetails() {
    this.statusDetails = 1;
    this.saveRepice();
  }

  aditDetails() {
    const index = this._recipeService.getIndexOfRecipeByCode(this.code);
    this.statusDetails = 2;
    this._recipeService.allMyRecipes[index].statusDetails = 2;
  }

  deleteRecipe() {
    let ans = confirm('Are You Sure?\nAre you want delete this recipe from your application?');
    /*.title('Are You Sure?')
              .textContent('Are you want delete this recipe from your application?')
              .ariaLabel('delete recipe')
              .ok('Delete Recipe')
              .cancel('return without delete');*/
    if (!ans) {
      return;
    }
    this.statusDetails = 4;
    const index = this._recipeService.getIndexOfRecipeByCode(this.code);
    this._recipeService.allMyRecipes.splice(index, 1);
  }

  saveRepice() {
    this.statusDetails = 1;
    const index = this._recipeService.getIndexOfRecipeByCode(this.code);
    this._recipeService.allMyRecipes[index].statusDetails = 1;
    this._recipeService.allMyRecipes[index].category = this.category;
    this._recipeService.allMyRecipes[index].comment = this.comment;
    this._recipeService.allMyRecipes[index].getFrom = this.getFrom;
    this._recipeService.allMyRecipes[index].nameRecipe = this.nameRecipe;
    this._recipeService.allMyRecipes[index].keyWords = this.keyWords;
    this._recipeService.allMyRecipes[index].urlImg = this.urlImg;

  }



  ngOnInit() {
    if (this._recipeService.getRecipe(this.code) != null) {
      const index = this._recipeService.getIndexOfRecipeByCode(this.code);

      this.nameRecipe = this._recipeService.allMyRecipes[index].nameRecipe;
      this.getFrom = this._recipeService.allMyRecipes[index].getFrom;
      this.category = this._recipeService.allMyRecipes[index].category;
      this.urlImg = this._recipeService.allMyRecipes[index].urlImg;
      this.keyWords = this._recipeService.allMyRecipes[index].keyWords;
      this.comment = this._recipeService.allMyRecipes[index].comment;
      this.statusDetails = this._recipeService.allMyRecipes[index].statusDetails;
      this.partToShow = this._recipeService.allMyRecipes[index].partToShow;
    }
  }

}/*end of class*/

/********************************************************* */

