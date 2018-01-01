import { Component, OnInit, Input,OnDestroy } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Foodstuff, ItemLineComponent } from '../item-line/item-line.component';
import { Instruction, InstructionLineComponent } from '../instruction-line/instruction-line.component';
import { MainDetailsComponent } from '../main-details/main-details.component';
import { ActivatedRoute } from '@angular/router';
import { SpeechService } from '../services/speech.service';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})

export class RecipeComponent implements OnInit, OnDestroy {

  private sub: any;
  @Input() code: number;
  @Input() itemLines: ItemLineComponent;
  @Input() instructionLines: InstructionLineComponent;
  @Input() mainDetails: MainDetailsComponent;
  @Input() optionCategories: string[];
  @Input() keyWords: string[];
  @Input() partToShow: number; /*options:0=>main details, 1=>items, 2=>instructions*/
  @Input() index: number;

  constructor(private _recipeService: RecipeService, private route: ActivatedRoute, private speechRecognitionService: SpeechService) {

   this._recipeService.allMyRecipes.push(this); // have to delete
    this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
    this.code = this._recipeService.counter++;
    this.instructionLines = new InstructionLineComponent(this._recipeService);
    this.instructionLines.instructions.push(new Instruction(0, '', true));
    this.itemLines = new ItemLineComponent(this._recipeService);
    this.itemLines.foodstuffs.push(new Foodstuff(0, 0, '', '', true));
    this.mainDetails = new MainDetailsComponent(this._recipeService);
    this.partToShow = 0;

    this.keyWords = [];
    /* this.comment = 'delitios';*/
    this.optionCategories = ['cakes', 'parve', 'easy', 'milk', 'coockies', 'similiar'];

  }
  /*functions*/
  /************************************************************************************************* */


  ngOnDestroy() {
    this.sub.unsubscribe();
  }



  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
      this.code = +params['id']; 
      console.log(this.code);
    });
      // In a real app: dispatch action to load the details here.
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
  deleteRecipe() {
    this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
    let ans = confirm('Are You Sure?\nAre you want delete this recipe from your application?');
    if (!ans) {
      return;
    }
    this.mainDetails. statusDetails = 4;
    const index = this._recipeService.getIndexOfRecipeByCode(this.code);
    this._recipeService.allMyRecipes.splice(index, 1);
  }
  shareRecipe() {}

  sayIt() {
    this.speechRecognitionService.callDB();
  }

saveRecipeInList() {
  this._recipeService.allMyRecipes.push(this);
}

}/*end of class*/

/********************************************************* */
