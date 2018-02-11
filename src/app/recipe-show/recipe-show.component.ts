import { Component, OnInit , Input} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataBaseService } from '../services/data-base.service';

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
  urlImg = '';
  category1 = '';
  category2 = '';
  category3 = '';
  otherUser;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dbs: DataBaseService) {
    this.code = this.route.snapshot.params['id'];
    if (this.code != this.dbs.counterRecipe) {// make sure it is an old recipe
      this.getRecipeByID(this.code);
      this.statusDetails = 1;
    }

    this.dbs.recipeInWork = this;
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
      console.log(recipe);
      this.code = recipe.id;
      this.nameRecipe = recipe.nameRecipe;
      this.getFrom = recipe.getFrom;
      this.comment = recipe.comment;
      this.urlImg = recipe.urlImg;
      this.category1 = recipe.category1;
      this.category2 = recipe.category2;
      this.category3 = recipe.category3;

      const spaceRef = firebase.storage().ref().child(this.urlImg).getDownloadURL().then((url) => {
        // set image url
        this.urlImg = url;

      }).catch((error) => {
        console.log(error);
      });
    });

  }

  sayIt() {
    
        this.router.navigate(['/read', this.code]);
    
      }
}




