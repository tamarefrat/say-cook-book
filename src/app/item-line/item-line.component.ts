import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-item-line',
  templateUrl: './item-line.component.html',
  styleUrls: ['./item-line.component.css']
})
export class ItemLineComponent implements OnInit {
  @Input() code: number;
  @Input() foodstuffs: Foodstuff[]; /*change class and prop*/
  @Input() keyWords: string[];
  @Input() zeroItems: boolean;
  @Input() index: number;

  constructor(private _recipeService: RecipeService) {
    this.foodstuffs = [];
    this.keyWords = [];
    this.zeroItems = true;
    this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
  }

  ngOnInit() {
    if (this._recipeService.getRecipe(this.code) != null) {
      this.index = this._recipeService.getIndexOfRecipeByCode(this.code);

      this.foodstuffs = this._recipeService.allMyRecipes[this.index].foodstuffs;
      this.keyWords = this._recipeService.allMyRecipes[this.index].keyWords;
      this.zeroItems = this._recipeService.allMyRecipes[this.index].zeroItems;

    }
  }
  /*functions*/
  /******************************************************************************************* */
  /*item line functions*/
  firstSaveItemLine(amount, measurement, item, i) {
    /*pops without save the last empty item in the list, create a new item and pushss to list, change status of lastLine*/
    if (this._recipeService.allMyRecipes[this.index].foodstuffs != null) {
    this._recipeService.allMyRecipes[this.index].foodstuffs[i] = new Foodstuff(1, amount, measurement, item, true);
    }
  }
  /*can adit only 1 line in any time- have to change this*/
  aditItemLine(i) {
    this.foodstuffs[i].statusLine = 2;
    if (this._recipeService.allMyRecipes[this.index].foodstuffs != null) {
    this._recipeService.allMyRecipes[this.index].foodstuffs[i].statusLine = 2;
  }
}

  deleteItemLine(i) {
    let ans = confirm('Are You Sure?\nAre you want delete this line from your recipe?');
    if (!ans) {
      return;
    }

    if (this.foodstuffs[i].lastLine) {/* this is the last line*/
      if (i > 0) {/*there is more then 1 line*/
        this.foodstuffs[i - 1].lastLine = true;
        this._recipeService.allMyRecipes[this.index].foodstuffs[i - 1].lastLine = true;
      }
      else {/* there is 1 line*/
        this.zeroItems = true;
        this._recipeService.allMyRecipes[this.index].zeroItems = true;
      }
    }
    this.foodstuffs.splice(i, 1);
    this._recipeService.allMyRecipes[this.index].foodstuffs.splice(i, 1);

  }

  saveItemLine(i) {
    this.foodstuffs[i].statusLine = 1;
    this._recipeService.allMyRecipes[this.index].foodstuffs[i] = new Foodstuff(1,
                                                                                this.foodstuffs[i].amount,
                                                                                this.foodstuffs[i].measurement,
                                                                                this.foodstuffs[i].item,
                                                                                this.foodstuffs[i].lastLine);
  }

  createItemLine(i) {
    if (i >= 0) {
      this.foodstuffs[i].lastLine = false;
      this._recipeService.allMyRecipes[this.index].foodstuffs[i].lastLine = false;
    }
    this.foodstuffs.push(new Foodstuff(0, 0, '', '', true));
    this.zeroItems = false;
    if (this._recipeService.allMyRecipes[this.index].foodstuffs != null) {
this._recipeService.allMyRecipes[this.index].foodstuffs.push(new Foodstuff(0, 0, '', '', true));
this._recipeService.allMyRecipes[this.index].zeroItems = false;
}

  }

  /************************************************************************************************* */
}

export class Foodstuff {

  constructor(public statusLine: number,
    public amount: number,
    public measurement: string,
    public item: string,
    public lastLine: boolean) {
    /*statusLine:
    0=>created (before first save)
    1=> on save
    2=>in adit*/
  }
}
