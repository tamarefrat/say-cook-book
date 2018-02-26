import { Component, OnInit, Input } from '@angular/core';
import { MainDetailsComponent } from '../main-details/main-details.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';
import { SpeechService } from '../services/speech.service';
import { DataBaseService, Recipe } from '../services/data-base.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-old-recipe',
  templateUrl: './old-recipe.component.html',
  styleUrls: ['./old-recipe.component.scss']
})
export class OldRecipeComponent implements OnInit {

  code: any;
  keyWords: string[] = [];
  statusDetails;
  nameRecipe = null;
  getFrom = '';
  comment = '';
  isFavorit = false;
  urlImg = '';
  category1 = '';
  category2 = '';
  category3 = '';
  enable = true;
  otherUser;


  constructor(private _recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private speechRecognitionService: SpeechService,
    private dbs: DataBaseService) {
    // get code from routing
    this.code = this.route.snapshot.params['id'];
    if (!this.code) {
      // a new recipe
      this.statusDetails = 0;
      this.nameRecipe = '';
      this.code = this.dbs.counterRecipe;
    } else if (this.code !== this.dbs.counterRecipe) {// make sure it is an old recipe
      this.getRecipeByID(this.code);
      this.statusDetails = 1;
    }

    this.dbs.recipeInWork = this;

  }

  /*functions*/
  /************************************************************************************************* */

  ngOnInit() {
    // maybe have move from constractor
  }

  /*****************get from firebase- hae to check if works */

  /**************************************************************************** */
  deleteRecipe() {

    if (this.statusDetails !== 0) { // this recipe exist already in db
      this.dbs.deleteRecipe(this.code);
    }

    this.router.navigate(['/']);
    this.dbs.createAlert('success', 'recipe deleted successfully', '');
  }

  shareRecipe(otherUser) {
    this.dbs.shareWithOtherUserMyRecipe(this.code, otherUser, false);
    this.dbs.createAlert('success', 'Shared successfully with ' + otherUser, '');
    this.otherUser = '';
  }
  saveRecipe() {
    if (this.statusDetails !== 0) { // this recipe exist already in db
      // recipe axist in db- have to update
      this.dbs.updateRecipe(this);

    } else {
      // new recipe- have to add to list
      this.dbs.addRecipe(this);

    }
    this.statusDetails = 1;

  }

  saveAndGoBack() {
    // this.saveRecipe();
    this.router.navigate(['/']);
  }
  sayIt() {
    this.router.navigate(['/read', this.code]);

  }

  /********************************************************* */
  /**********************     main details functions    *********** */

  aditDetails() {
    this.statusDetails = 2;
  }

   getRecipeByID(recID) {
    // get one recipe by id:
    const stringId = '' + recID;
    this.nameRecipe = null;
    this.dbs.recDoc = this.dbs.recipeTempsRef.doc<Recipe>('num' + recID);
    this.dbs.recipeTempObservable = this.dbs.recDoc.valueChanges();
    this.dbs.recipeTempObservable.subscribe(recipe => {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log(recipe);
      this.code = recipe.id;
      this.nameRecipe = recipe.nameRecipe;
      this.getFrom = recipe.getFrom;
      this.comment = recipe.comment;
      this.isFavorit = recipe.isFavorit;
      this.urlImg = recipe.urlImg;
      this.category1 = recipe.category1;
      this.category2 = recipe.category2;
      this.category3 = recipe.category3;
this.enable = recipe.enable;
console.log(this.urlImg);
      const spaceRef = firebase.storage().ref().child(this.urlImg).getDownloadURL().then((url) => {
        // set image url
        this.urlImg = url;
        console.log(this.urlImg);

      }).catch((error) => {
        this.urlImg = 'assets\\homeImg\\logo1.png';
        console.log(error);
      });
    //  this.urlImg = this.dbs.getPath(this.urlImg);
    });

  }

  apears(user) {
    return (this.dbs.userNameList.indexOf(user) > 0);
  }

}
