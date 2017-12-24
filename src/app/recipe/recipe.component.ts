import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import {Foodstuff} from '../item-line/item-line.component';
import { Instruction } from '../instruction-line/instruction-line.component';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})

export class RecipeComponent implements OnInit {

  @Input() code: number;
  @Input() nameRecipe: string;
  @Input() getFrom: string;
  @Input() foodstuffs: Foodstuff[]; /*change class and prop*/
  @Input() instructions: Instruction[];
  @Input() category: string[]; /* change to final number///?*/
  @Input() urlImg: string;
  @Input() keyWords: string[];
  @Input() comment: string;
  @Input() zeroItems: boolean;
  @Input() zeroInstructions: boolean;
  @Input() statusDetails: number; /*options: 0=>created, 1=>i=on save, 2=>in adit, 4=>deleted*/
  @Input() optionCategories: string[];
  @Input() partToShow: number; /*options:0=>main details, 1=>items, 2=>instructions*/


  constructor(private _recipeService: RecipeService) {
    this.code = 1111;
    /*this.nameRecipe = 'choclate cake';
    this.getFrom = 'tami';*/
    this.statusDetails = 0;
    this.category = ['', '', ''];
    this.zeroInstructions = true;
    this.zeroItems = true;
    this.urlImg = 'assets/saveBtn.png';
    this.foodstuffs = [];
      /*new Foodstuff(1, 30, 'kg', 'sugar', false),
      new Foodstuff(1, 30, 'gr', 'water', false),
      new Foodstuff(1, 30, 'kg', 'oil', false),
      new Foodstuff(1, 30, 'gr', 'cofee', false),
      new Foodstuff(1, 30, 'kg', 'sugar', false),
      new Foodstuff(1, 20, 'gr', 'chocolate', true),*/
   /* ];*/

    this.instructions = [];

    this.keyWords = ['chocalate'];
    /* this.comment = 'delitios';*/
    this.optionCategories = ['cakes', 'parve', 'easy', 'milk', 'coockies', 'similiar'];

  }
  /*functions*/
  /******************************************************************************************* */

  /************************************************************************************************* */



  ngOnInit() {
    if (this._recipeService.getRecipe(this.code) != null) {
      const index = this._recipeService.getIndexOfRecipeByCode(this.code);

      this.nameRecipe = this._recipeService.allMyRecipes[index].nameRecipe;
      this.getFrom = this._recipeService.allMyRecipes[index].getFrom;
      this.foodstuffs = this._recipeService.allMyRecipes[index].foodstuffs;
      this.instructions = this._recipeService.allMyRecipes[index].instructions;
      this.category = this._recipeService.allMyRecipes[index].category;
      this.urlImg = this._recipeService.allMyRecipes[index].urlImg;
      this.keyWords = this._recipeService.allMyRecipes[index].keyWords;
      this.comment = this._recipeService.allMyRecipes[index].comment;
      this.zeroItems = this._recipeService.allMyRecipes[index].zeroItems;
      this.zeroInstructions = this._recipeService.allMyRecipes[index].zeroInstructions;
      this.statusDetails = this._recipeService.allMyRecipes[index].statusDetails;
      this.optionCategories = this._recipeService.allMyRecipes[index].optionCategories;
      this.partToShow = this._recipeService.allMyRecipes[index].partToShow;
    }
}

}/*end of class*/

/********************************************************* */
