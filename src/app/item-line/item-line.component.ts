import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { DataBaseService, Ingerdient } from '../services/data-base.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-item-line',
  templateUrl: './item-line.component.html',
  styleUrls: ['./item-line.component.scss']
})
export class ItemLineComponent implements OnInit {

  @Input() code: any;
  foodstuffs: Ingerdient[]; /*change class and prop*/
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

  constructor(private afs: AngularFirestore, private dbs: DataBaseService) {
    if (!this.code) {
      this.code = this.dbs.recipeInWork.code;
    }
    dbs.getIngredientsByRecipeID(dbs.recipeInWork.code);
// have to check if have a name

  }

  ngOnInit() {
    // this.code = this.dbs.recipeInWork.code;
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
  getIngredientsByRecipeID(id) {
    this.dbs.ingredientsRef = this.afs.collection(`users/${this.dbs.user}/ingredients`, ref => {
      return ref.where('recipeId', '==', id);
    });
    this.dbs.ingredientsObservable = this.dbs.ingredientsRef.valueChanges();
    this.dbs.ingredientsObservable.subscribe(ingredients => {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log(ingredients);
      this.foodstuffs = ingredients;
      this.newItemEnable = (this.foodstuffs.length > 0);

    });
  }

  /************************************************************************************************* */
}

export class Foodstuff {

  constructor(/*public statusLine: number,*/
    public amount: any,
    public measurement: string,
    public item: string,
    /*public lastLine: boolean*/) {
    /*statusLine:
    0=>created (before first save)
    1=> on save
    2=>in adit*/
  }
}
