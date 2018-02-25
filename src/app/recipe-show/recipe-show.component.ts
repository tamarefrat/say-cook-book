import { Component, OnInit , Input} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataBaseService, Ingerdient, Instruction, Recipe } from '../services/data-base.service';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Rx';
import { SpeechService } from '../services/speech.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as _ from "lodash";
import { trigger, style, animate, transition } from '@angular/animations';


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
  ingredients2;
  instructions2;


  id:number;
  recordId:string;
  operation:string = "";
  operationType:string = "";
  recordString:Observable<string>;

  public ingredientsRef: AngularFirestoreCollection<Ingerdient>;
  instructionsRef: AngularFirestoreCollection<Instruction>;
  ingredientsObservable: Observable<Ingerdient[]>;
  instructionsObservable: Observable<Instruction[]>;


  constructor(private router: Router,
    private route: ActivatedRoute,
    private dbs: DataBaseService, private afs: AngularFirestore) {
    this.code = this.route.snapshot.params['id'];
    if (this.code != this.dbs.counterRecipe) {// make sure it is an old recipe
      this.getRecipeByID(this.code);
      this.statusDetails = 1;
    }
    this.getIngredientsByRecipeID(this.code);
    this.getInstructionsByRecipeID(this.code);
  

     }

  ngOnInit() {

  }
  
  getIngredientsByRecipeID(id) {
    console.log("test idddddddd: " + id);
    this.ingredientsRef = this.afs.collection(`users/${this.dbs.user}/ingredients`, ref => {
      return ref.where('recipeId', '==', +id);
    });
    this.ingredientsObservable = this.ingredientsRef.valueChanges();
    this.ingredientsObservable.subscribe(ingredients => {
      this.ingredients2 = ingredients;
      this.ingredients2.forEach(ingredient => {
        console.log('product: ' + ingredient.product + ', amount: ' +
          ingredient.amount + ', unit: amount: ' + ingredient.unit);
       });
    });
  }


  getInstructionsByRecipeID(id) {
    console.log("getInstructionsByRecipeID: " + id);
    this.instructionsRef = this.afs.collection(`users/${this.dbs.user}/instructions`, ref => {
      return ref.where('recipeId', '==', +id);
    });
    this.instructionsObservable = this.instructionsRef.valueChanges();
    this.instructionsObservable.subscribe(instructions => {
      this.instructions2 = instructions;
      this.instructions2.forEach(instruction => {
        console.log('description: ' + instruction.description);
      });
    });
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




