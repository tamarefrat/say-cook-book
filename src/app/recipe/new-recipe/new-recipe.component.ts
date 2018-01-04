import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Foodstuff, ItemLineComponent } from '../../item-line/item-line.component';
import { Instruction, InstructionLineComponent } from '../../instruction-line/instruction-line.component';
import { MainDetailsComponent } from '../../main-details/main-details.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SpeechService } from '../../services/speech.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit {

  @Input() code: any;
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
    this.code = this.route.snapshot.params['id'];

    this.instructionLines = new InstructionLineComponent(this._recipeService);
    this.instructionLines.instructions.push(new Instruction(0, '', true));
    this.itemLines = new ItemLineComponent(this._recipeService);
    this.itemLines.foodstuffs.push(new Foodstuff(0, 0, '', '', true));
    this.mainDetails = new MainDetailsComponent(this._recipeService);
    this.mainDetails.statusDetails = 0;
    this.keyWords = [];
    if (this.code) {
      console.log('old code!!!!!!!!!!!!!!!' + this.code);
      const rec = this._recipeService.getRecipe(this.code);
      if (rec) {
        this.itemLines = rec.itemLines;
        this.instructionLines = rec.instructionLines;
        this.mainDetails = rec.mainDetails;
        this.keyWords = rec.keyWords;
      } else {
        console.log('error');
      }
    } else {
      this._recipeService.newRecipe = this;
      this.code = this._recipeService.counter++;
      console.log('new code= ' + this.code);
    }


  }

  /*functions*/
  /************************************************************************************************* */

  ngOnInit() {
    console.log('in init');
    console.log(this);
    // get code from url
    this.code = this.route.snapshot.params['id'];

    // In a real app: dispatch action to load the details here.
    const rec = this._recipeService.getRecipe(this.code);
    if (rec) {
      this.itemLines = rec[1];
      this.instructionLines = rec[0];
      this.mainDetails = rec[2];
      this.keyWords = rec.keyWords;
}
  }
  /*****************get from firebase- hae to check if works */

  /**************************************************************************** */
  deleteRecipe() {
    const ans = confirm('Are You Sure?\nAre you want delete this recipe from your application?');
    if (!ans) { return; }
    this.mainDetails.statusDetails = 4;
    const rec = this._recipeService.getRecipe(this.code);
    if (rec) { // exist in db
      this._recipeService.allMyRecipes.splice(this._recipeService.allMyRecipes.indexOf(rec), 1);
      this._recipeService.removeRecipeFromDB(rec);
    }
    this.router.navigate(['/']);
  }

  shareRecipe() { }
  saveRecipeInList() {
    const rec = this._recipeService.getRecipe(this.code);
      if (rec) {
        // recipe axist in db- have to update
        this._recipeService.updateMainDetails(this.code, this);

      } else {
      // new recipe- have to add to list
    this._recipeService.allMyRecipes.push(this._recipeService.newRecipe); // have to delete?
    this._recipeService.addNewRecipeToDB(this._recipeService.newRecipe);
      }

    this.router.navigate(['/']);
    console.log('in save');
    console.log(this);
  }
  sayIt() {
    this.speechRecognitionService.callDB();
  }




}
