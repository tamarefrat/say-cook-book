import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Foodstuff, ItemLineComponent } from '../item-line/item-line.component';
import { Instruction, InstructionLineComponent } from '../instruction-line/instruction-line.component';
import { MainDetailsComponent } from '../main-details/main-details.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  @Input() index: number;

  constructor(private _recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private speechRecognitionService: SpeechService) {
      console.log('in contracror');
    console.log(this);
 // get code from url
    this.code = this.route.snapshot.params['id'];
      // recipe is in DB
    const rec = this._recipeService.getRecipe(this.code);
    if (rec) {
      this.itemLines = rec.itemLines;
      this.instructionLines = rec.instructionLines;
      this.mainDetails = rec.mainDetails;
      this.keyWords = rec.keyWords;
    }
      console.log('in db-code= ' + this.code);
    }
  /*functions*/
  /************************************************************************************************* */


  ngOnDestroy() {
  //  this.sub.unsubscribe();
  }



  ngOnInit() {
    console.log('in init');
    console.log(this);
    // get code from url
    this.code = this.route.snapshot.params['id'];
    /*this.sub = this.route.params.subscribe(params => {
      this.code = +params['id'];
      console.log(this.code);
    });*/
    // In a real app: dispatch action to load the details here.
    const rec = this._recipeService.getRecipe(this.code);
    if (rec) {
      this.itemLines = rec.itemLines;
      this.instructionLines = rec.instructionLines;
      this.mainDetails = rec.mainDetails;
      this.keyWords = rec.keyWords;
}
  }
  /*****************get from firebase- hae to check if works */
 /* getRecipeToView(code) {
    if (!this._recipeService.getRecipe(code)) {
      console.log(this._recipeService.allMyRecipes);
      console.log('error in get to view' + code);
      console.log(this._recipeService.allMyRecipes);
      return;
    }
    console.log('in get to view');
    const temp: RecipeComponent = this._recipeService.getRecipe(code);
    this.mainDetails = temp.mainDetails;
    this.itemLines = temp.itemLines;
    this.instructionLines = temp.instructionLines;
    this.keyWords = temp.keyWords;
  }*/
  /**************************************************************************** */
  deleteRecipe() {
    this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
    const ans = confirm('Are You Sure?\nAre you want delete this recipe from your application?');
    if (!ans) {
      return;
    }
    this.mainDetails.statusDetails = 4;
    const index = this._recipeService.getIndexOfRecipeByCode(this.code);
    this._recipeService.allMyRecipes.splice(index, 1);
  }
  shareRecipe() { }

  saveRecipeInList() {
    this.mainDetails.saveRecipe();
    if (this.mainDetails.statusDetails === 0) {
      // new recipe- have to add to list
      this._recipeService.allMyRecipes.push(this);
    }
    this._recipeService.allMyRecipes.push(this);
    this.router.navigate(['/']);
    console.log('in save' );
    console.log( this);
  }
  sayIt() {
    this.speechRecognitionService.callDB();
  }



}/*end of class*/

/********************************************************* */
