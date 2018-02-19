import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { DataBaseService, Ingerdient } from '../services/data-base.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-item-line',
  templateUrl: './item-line.component.html',
  styleUrls: ['./item-line.component.scss']
})
export class ItemLineComponent implements OnInit {

  @Input() code: any;
  ingredients: Ingerdient[];
  zeroItems: boolean;
  @Input() nameRecipe;
  @Input() statusDetails;
  newItemEnable: any;
  nAmount = '';
  nMeasurement = '';
  nProduct = '';
  inEditState = false;
  itemToEdit: Ingerdient;
  itemToDelete: Ingerdient;
  ingredientsRef: AngularFirestoreCollection<Ingerdient>;

  ingredientsObservable: Observable<Ingerdient[]>;


  constructor(private afs: AngularFirestore, private dbs: DataBaseService) {
    if (!this.code) {
      this.code = this.dbs.recipeInWork.code;
    }
    this.getIngredientsByRecipeID(this.code);
// have to check if have a name

  }

  ngOnInit() {
    // this.code = this.dbs.recipeInWork.code;
    this.getIngredientsByRecipeID(this.code);
    }


  /*functions*/
  /******************************************************************************************* */
  /*item line functions*/


  /*can adit only 1 line in any time- have to change this*/
  editItemLine(item: Ingerdient) {
this.inEditState = true;
this.itemToEdit = item;
  }

  deleteItemLine() {

    this.dbs.deleteIngredient(this.code, this.itemToDelete);
    this.itemToDelete = null;
  }

  canselFromDelete() {
    this.itemToDelete = null;
  }

  saveItemLine() {
    this.dbs.addIngredient(this.nAmount, this.nMeasurement, this.nProduct, this.dbs.recipeInWork.code, this.dbs.recipeInWork.nameRecipe );
    console.log(this.nProduct);
    this.newItemEnable = true;
    this.nProduct = '';
    this.nMeasurement = '';
    this.nAmount = '';

  }

  createItemLine() {

    this.newItemEnable = false;
  }

  updateItemLine(item: Ingerdient) {
    this.dbs.updateIngredient(item);
    this.inEditState = false;
  }



  // get ingredients by recipes id
  /*getIngredientsByRecipeID(id) {
    this.ingredientsRef = this.afs.collection(`users/${this.dbs.user}/ingredients`, ref => {
      return ref.where('recipeId', '==', id);
    });
    this.ingredientsObservable = this.ingredientsRef.valueChanges();
    this.ingredientsObservable.subscribe(ingredients => {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log(ingredients);
      this.ingredients = ingredients;
      this.newItemEnable = (this.ingredients.length > 0);

    });
  }*/

  getIngredientsByRecipeID(id) {
    this.ingredientsRef = this.afs.collection(`users/${this.dbs.user}/ingredients`, ref => {
      return ref.where('recipeId', '==', id);
    });
    this.ingredientsObservable = this.ingredientsRef.valueChanges();
    this.ingredientsObservable.subscribe(ingredients => {
      this.ingredients = ingredients;
     console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log(ingredients);
    });
  }




  /************************************************************************************************* */
}

