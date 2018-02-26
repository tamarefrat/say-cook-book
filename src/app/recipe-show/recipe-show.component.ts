import { Component, OnInit , Input} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataBaseService, Recipe } from '../services/data-base.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-recipe-show',
  templateUrl: './recipe-show.component.html',
  styleUrls: ['./recipe-show.component.scss']
})
export class RecipeShowComponent implements OnInit {
  @Input() code: any;
  keyWords: string[] = [];
  statusDetails;
  nameRecipe = null;
  getFrom = '';
  comment = '';
  urlImg = 'none';
  category1 = '';
  category2 = '';
  category3 = '';
  otherUser;
  ingredients;
  instructions;
  enable = false;


  constructor(private router: Router,
    private route: ActivatedRoute,
    private dbs: DataBaseService) {
    this.code = this.route.snapshot.params['id'];
    if (this.code != this.dbs.counterRecipe) {// make sure it is an old recipe
      this.getRecipeByID(this.code);
      this.statusDetails = 1;
    }
    dbs.getIngredientsByRecipeID(this.code);
    dbs.getInstructionsByRecipeID(this.code);


     }

  ngOnInit() {

  }


  getRecipeByID(recID) {
    // get one recipe by id:
    const stringId = '' + recID;
    this.nameRecipe = null;
    this.dbs.recDoc = this.dbs.recipeTempsRef.doc<Recipe>('num' + recID);
    this.dbs.recipeTempObservable = this.dbs.recDoc.valueChanges();
    this.dbs.recipeTempObservable.subscribe(recipe => {

      this.code = recipe.id;
      this.nameRecipe = recipe.nameRecipe;
      this.getFrom = recipe.getFrom;
      this.comment = recipe.comment;
      this.urlImg = recipe.urlImg;
      this.category1 = recipe.category1;
      this.category2 = recipe.category2;
      this.category3 = recipe.category3;
      this.enable = recipe.enable;


      const spaceRef = firebase.storage().ref().child(this.urlImg).getDownloadURL().then((url) => {
        // set image url
        this.urlImg = url;

      }).catch((error) => {
        console.log(error);
      });

    });

  }
    get_amount(amount){
     if (amount == 0)
          return "";
     else
         return amount;
    }
      sayIt() {
        this.router.navigate(['/reader', this.code]);
      }
      edit() {
        this.router.navigate(['/recipe', this.code]);
      }
}




