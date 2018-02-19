import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import {  ItemLineComponent } from '../../item-line/item-line.component';

import { MainDetailsComponent } from '../../main-details/main-details.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SpeechService } from '../../services/speech.service';
import { DataBaseService } from '../../services/data-base.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit {

  @Input() code: any;
 // @Input() itemLines: ItemLineComponent;
 // @Input() instructionLines: InstructionLineComponent;
  @Input() mainDetails: MainDetailsComponent;
  @Input() keyWords: string[];
  @Input() index: number;

  constructor(private _recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private speechRecognitionService: SpeechService,
  private dbs: DataBaseService) {
    console.log('in contracror');
    this.code = this.route.snapshot.params['id'];
    if (!this.code) {
      // it is a new recipe
      this.code = this.dbs.counterRecipe;
      console.log("new " + this.code);
    }
    this.dbs.recipeInWork = this;

    // this.instructionLines = new InstructionLineComponent(this._recipeService);
   //  this.instructionLines.instructions.push(new Instruction(0, '', true));
   //  this.itemLines = new ItemLineComponent(this._recipeService);
   //  this.itemLines.foodstuffs.push(new Foodstuff(0, 0, '', '', true));
    this.mainDetails = new MainDetailsComponent(this._recipeService, this.dbs);
    this.mainDetails.statusDetails = 0;
    this.keyWords = [];
    if (this.code) {
      console.log('old code!!!!!!!!!!!!!!!' + this.code);
    const rec = this.dbs.getRecipeByID(this.code);
      if (rec) {
        // this.itemLines = rec.itemLines;
        // this.instructionLines = rec.instructionLines;
        this.mainDetails.nameRecipe = rec.nameRecipe;
        this.keyWords = rec.keyWords;
        this.mainDetails.comment = rec.comment;
        this.mainDetails.urlImg = rec.urlImg;
        this.mainDetails.category1 = rec.category1;
        this.mainDetails.category2 = rec.category2;
        this.mainDetails.category3 = rec.category3;
        this.mainDetails.getFrom = rec.getFrom;
      } else {
        // didnt found recipe
        console.log('error');

      }
    } else {
      // it is a new recipe!!!!!!!!!!!!!!!!!!!!!!!
      this.code = this.dbs.counterRecipe;
      // this.code = this._recipeService.counter++;
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
    if (!this.code) {
      // it is a new recipe
      this.code = this.dbs.counterRecipe;
      console.log("new " + this.code);
    }
    this.dbs.recipeInWork = this;
    // In a real app: dispatch action to load the details here.
    if (this.code) {
      const rec = this.dbs.getRecipeByID(this.code);
      if (rec) {
        this.mainDetails.nameRecipe = rec.nameRecipe;
        this.keyWords = rec.keyWords;
        this.mainDetails.comment = rec.comment;
        this.mainDetails.urlImg = rec.urlImg;
        this.mainDetails.category1 = rec.category1;
        this.mainDetails.category2 = rec.category2;
        this.mainDetails.category3 = rec.category3;
        this.mainDetails.getFrom = rec.getFrom;
      } else {
        // didnt found recipe
        console.log('error');

      }
    } else {
      // it is a new recipe!!!!!!!!!!!!!!!!!!!!!!!
      this.code = this.dbs.counterRecipe;
    }
}

  /*****************get from firebase- hae to check if works */

  /**************************************************************************** */
  deleteRecipe() {
    this.mainDetails.statusDetails = 4;
    const rec = this._recipeService.getRecipe(this.code);
    if (rec) { // exist in db
     // this._recipeService.allMyRecipes.splice(this._recipeService.allMyRecipes.indexOf(rec), 1);
    // this._recipeService.removeRecipeFromDB(rec);
  this.dbs.deleteRecipe(this.code);
  }
    this.router.navigate(['/']);
  }

  shareRecipe() {
   // this.dbs.shareOneRecipe(this.code);
  }
  saveRecipeInList() {
    const rec = this.dbs.getRecipeByID(this.code);
      if (rec) {
        // recipe axist in db- have to update
        this.dbs.updateRecipe(this);

      } else {
      // new recipe- have to add to list
      this.dbs.addRecipe(this);
   // this._recipeService.allMyRecipes.push(this._recipeService.newRecipe); // have to delete?
    // this._recipeService.addNewRecipeToDB(this._recipeService.newRecipe);
      }

    this.router.navigate(['/']);
    console.log('in save');
    console.log(this);
  }
  sayIt() {

    this.router.navigate(['/read', this.code]);

  }




}
