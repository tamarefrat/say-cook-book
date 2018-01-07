import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { DataBaseService, Ingerdient } from '../services/data-base.service';

@Component({
  selector: 'app-item-line',
  templateUrl: './item-line.component.html',
  styleUrls: ['./item-line.component.css']
})
export class ItemLineComponent implements OnInit {

  @Input() code: any;
  @Input() foodstuffs: Ingerdient[]; /*change class and prop*/

  @Input() zeroItems: boolean;
  @Input() index: number;
  newItemEnable: any;
  nAmount = '';
  nMeasurment = '';
  nProduct = '';
  inEditState = false;
  itemToEdit: Ingerdient;

  constructor(private _recipeService: RecipeService, private dbs: DataBaseService) {
    if (!this.code) {
      this.code = this.dbs.recipeInWork.code;
    }
    this.foodstuffs = this.dbs.getIngredientsByRecipeID(this.code);
    this.newItemEnable = (this.foodstuffs.length > 0);



  /*  this.foodstuffs = [];
    this.zeroItems = false;
    this.foodstuffs.push(new Foodstuff(0, 0, '', '', true) );*/

   // this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
  }

  ngOnInit() {
    this.code = this.dbs.recipeInWork.code;
    if (this.dbs.getRecipeByID(this.code) != null) {
     this.foodstuffs =  this.dbs.getIngredientsByRecipeID(this.code);
      if (this.foodstuffs.length <= 0) {
        this.newItemEnable = false;
      }
     //  this.index = this._recipeService.getIndexOfRecipeByCode(this.code);

     // this.foodstuffs = this._recipeService.allMyRecipes[this.index].itemLines.foodstuffs;
      /*this.keyWords = this._recipeService.allMyRecipes[this.index].itemLines.keyWords;*/
     // this.zeroItems = this._recipeService.allMyRecipes[this.index].itemLines.zeroItems;
    }

  }
  /*functions*/
  /******************************************************************************************* */
  /*item line functions*/


  /*can adit only 1 line in any time- have to change this*/
  editItemLine(item: Ingerdient) {
this.inEditState = true;
this.itemToEdit = item;
  }

  deleteItemLine(item: Ingerdient) {
   /* this.index = this._recipeService.getIndexOfRecipeByCode(this.code);*/
  const ans = confirm('Are You Sure?\nAre you want delete this line from your recipe?');
    if (!ans) {
      return;
    }

  /*  if (this.foodstuffs[i].lastLine) {/* this is the last line*/
      /*if (i > 0) {/*there is more then 1 line*/
     /*   this.foodstuffs[i - 1].lastLine = true;
      } else {/* there is 1 line
        this.zeroItems = true;
      }
}*/
    this.dbs.deleteIngredient(this.code, item);
  }

  saveItemLine() {
    this.dbs.addIngredient(this.nAmount, this.nMeasurment, this.nProduct, this.dbs.recipeInWork.code);
    this.newItemEnable = true;
    this.nProduct = '';
    this.nMeasurment = '';
    this.nAmount = '';
    /*this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
    if (this.foodstuffs[i].statusLine === 0) {
      this.foodstuffs[i].lastLine = true;
    }
    this.foodstuffs[i].statusLine = 1;*/
  }

  createItemLine() {
   /* this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
    if (i >= 0) {
      this.foodstuffs[i].lastLine = false;
    }
    this.foodstuffs.push(new Foodstuff(0, 0, '', '', true));
    this.zeroItems = false;
    console.log(this.index);
    console.log(this._recipeService);*/
    this.newItemEnable = false;
  }

  updateItemLine(item: Ingerdient) {
    this.dbs.updateIngredient(item);
    this.inEditState = false;
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
