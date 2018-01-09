import { Component, OnInit , Input} from '@angular/core';
import { MainDetailsComponent } from '../main-details/main-details.component';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SpeechService } from '../services/speech.service';
import { DataBaseService } from '../services/data-base.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-old-recipe',
  templateUrl: './old-recipe.component.html',
  styleUrls: ['./old-recipe.component.scss']
})
export class OldRecipeComponent implements OnInit {

  @Input() code: any;

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

      console.log('error');
    }
    this.dbs.recipeInWork = this;


    this.mainDetails = new MainDetailsComponent(this._recipeService, this.dbs);
    this.mainDetails.statusDetails = 1;
    this.keyWords = [];

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
  }

  /*functions*/
  /************************************************************************************************* */

  ngOnInit() {
    console.log('in init');
    console.log(this);
    // get code from url
    this.code = this.route.snapshot.params['id'];
    if (!this.code) {
      console.log('error');
    }
    this.dbs.recipeInWork = this;
    // In a real app: dispatch action to load the details here.

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
  }

  /*****************get from firebase- hae to check if works */

  /**************************************************************************** */
  deleteRecipe() {
    const ans = confirm('Are You Sure?\nAre you want delete this recipe from your application?');
    if (!ans) { return; }
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
    this.dbs.shareOneRecipe(this.code);
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
    this.speechRecognitionService.callDB();
  }




}
