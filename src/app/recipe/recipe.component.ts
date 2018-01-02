import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Foodstuff, ItemLineComponent } from '../item-line/item-line.component';
import { Instruction, InstructionLineComponent } from '../instruction-line/instruction-line.component';
import { MainDetailsComponent } from '../main-details/main-details.component';
import { Router, ActivatedRoute, Params} from '@angular/router';
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
  @Input() keyWords: string[];
  /*@Input() optionCategories: string[];

  @Input() partToShow: number; /*options:0=>main details, 1=>items, 2=>instructions*/
  @Input() index: number;

  constructor(private _recipeService: RecipeService,
              private router: Router,
             private route: ActivatedRoute,
             private speechRecognitionService: SpeechService) {

    this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
    this.code = this._recipeService.counter++;
    this.instructionLines = new InstructionLineComponent(this._recipeService);
    this.instructionLines.instructions.push(new Instruction(0, '', true));
    this.itemLines = new ItemLineComponent(this._recipeService);
    this.itemLines.foodstuffs.push(new Foodstuff(0, 0, '', '', true));
    this.mainDetails = new MainDetailsComponent(this._recipeService);

    this.keyWords = [];



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

    }
  }
  /*****************get from firebase- hae to check if works */
  getRecipeToView(code) {
    this.mainDetails = this._recipeService.getRecipe(code).mainDetails;
    this.itemLines = this._recipeService.getRecipe(code).itemLines;
    this.instructionLines = this._recipeService.getRecipe(code).instructionLines;
    this.keyWords = this._recipeService.getRecipe(code).keyWords;
  }
  /**************************************************************************** */
  deleteRecipe() {
    this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
    let ans = confirm('Are You Sure?\nAre you want delete this recipe from your application?');
    if (!ans) {
      return;
    }
    this.mainDetails.statusDetails = 4;
    const index = this._recipeService.getIndexOfRecipeByCode(this.code);
    this._recipeService.allMyRecipes.splice(index, 1);
  }
  shareRecipe() { }

  saveRecipeInList() {
    this._recipeService.allMyRecipes.push(this);
    this.router.navigate(['/']);
  }
  sayIt() {
    this.speechRecognitionService.callDB();
  }



}/*end of class*/

/********************************************************* */
