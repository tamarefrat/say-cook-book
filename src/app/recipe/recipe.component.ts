import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Foodstuff, ItemLineComponent } from '../item-line/item-line.component';
import { Instruction, InstructionLineComponent } from '../instruction-line/instruction-line.component';
import { MainDetailsComponent } from '../main-details/main-details.component';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})

export class RecipeComponent implements OnInit {

  @Input() code: number;
  @Input() itemLines: ItemLineComponent;
  @Input() instructionLines: InstructionLineComponent;
  @Input() mainDetails: MainDetailsComponent;
  @Input() optionCategories: string[];
  @Input() keyWords: string[];
  @Input() partToShow: number; /*options:0=>main details, 1=>items, 2=>instructions*/
  @Input() index: number;

  constructor(private _recipeService: RecipeService) {
   this._recipeService.allMyRecipes.push(this); // have to delete
    this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
    this.code = this._recipeService.counter++;
    this.instructionLines = new InstructionLineComponent(this._recipeService);
    this.itemLines = new ItemLineComponent(this._recipeService);
    this.mainDetails = new MainDetailsComponent(this._recipeService);

    this.keyWords = [];
    /* this.comment = 'delitios';*/
    this.optionCategories = ['cakes', 'parve', 'easy', 'milk', 'coockies', 'similiar'];

  }
  /*functions*/
  /************************************************************************************************* */



  ngOnInit() {
    if (this._recipeService.getRecipe(this.code) != null) {
      const index = this._recipeService.getIndexOfRecipeByCode(this.code);
      this.itemLines.ngOnInit();
      this.instructionLines.ngOnInit();
      this.mainDetails.ngOnInit();
      this.keyWords = this._recipeService.allMyRecipes[index].keyWords;
      this.optionCategories = this._recipeService.allMyRecipes[index].optionCategories;
      this.partToShow = this._recipeService.allMyRecipes[index].partToShow;
      /* this.nameRecipe = this._recipeService.allMyRecipes[index].nameRecipe;
       this.getFrom = this._recipeService.allMyRecipes[index].getFrom;
       this.foodstuffs = this._recipeService.allMyRecipes[index].foodstuffs;
       this.instructions = this._recipeService.allMyRecipes[index].instructions;
       this.category = this._recipeService.allMyRecipes[index].category;
       this.urlImg = this._recipeService.allMyRecipes[index].urlImg;

       this.comment = this._recipeService.allMyRecipes[index].comment;
       this.zeroItems = this._recipeService.allMyRecipes[index].zeroItems;
       this.zeroInstructions = this._recipeService.allMyRecipes[index].zeroInstructions;
       this.statusDetails = this._recipeService.allMyRecipes[index].statusDetails;*/

    }
  }

}/*end of class*/

/********************************************************* */
